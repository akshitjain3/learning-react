import { useEffect, useRef, useState } from "react";
import "./gpf.css";
import ProfileCard from "./ProfileCard";
import CompleteGitHubProfile from "./CompleteGHProfile";
import CustomPaginator from "../page-navigation/CustomPaginator";
import { useQuery } from "@tanstack/react-query";

interface GHProfiles {
  login: string;
  avatar_url: string;
  name: string;
}

interface MainAPIResult {
  total_count: number;
  incomplete_results: boolean;
  items: GHProfiles[];
}

export interface CompleteGHProfile {
  login: string;
  name: string;
  avatar_url: string;
  location: string;
  followers: number;
  following: number;
  created_at: string;
  html_url: string;
  public_repos: number;
  blog: string;
  bio: string;
  company: string;
}

async function fetchProfiles(
  query: string,
  limit: number,
  page: number
): Promise<{ items: GHProfiles[]; totalCount: number }> {
  const response = await fetch(
    `https://api.github.com/search/users?q=${query}&per_page=${limit}&page=${page}`
  );
  if (!response.ok) throw new Error("Error fetching profiles");
  const data: MainAPIResult = await response.json();
  if (!data.items || !data.items.length)
    throw new Error("No profiles match the query.");
  return {
    items: data.items.map((entry) => ({
      login: entry.login,
      avatar_url: entry.avatar_url,
      name: entry.login,
    })),
    totalCount: data.total_count,
  };
}

export default function GithubProfileFinder() {
  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const per_page = 20;
  const page_limit = 10;
  const [page, setPage] = useState(1);
  const [completeProfile, setCompleteProfile] =
    useState<CompleteGHProfile | null>(null);

  async function handleOpenProfile(login: string) {
    const response = await fetch(`https://api.github.com/users/${login}`);
    if (!response.ok) throw new Error("Error fetching profile");
    const data: CompleteGHProfile = await response.json();
    setCompleteProfile(data);
  }

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["profiles", searchTerm, page],
    queryFn: () => fetchProfiles(searchTerm, per_page, page),
    enabled: !!searchTerm,
    staleTime: 1000 * 60 * 5,
    placeholderData: (previousData) => previousData,
  });

  function handlePageChange(page: number) {
    setPage(page);
  }

  async function handleOnSearchClick() {
    if (query.trim()) {
      setSearchTerm(query.trim());
      setCompleteProfile(null);
      setPage(1);
    }
  }

  function handleOnBack() {
    setCompleteProfile(null);
    if (scrollDiv.current) scrollDiv.current.style.width = "0";
  }

  const scrollDiv = useRef<HTMLDivElement | null>(null);
  const contentDiv = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scroll_el = scrollDiv.current;
    const content_el = contentDiv.current;

    function handleScroll() {
      if (content_el && scroll_el) {
        if (content_el.scrollHeight === 0) return;
        const scrollHeight = content_el.scrollHeight - content_el.clientHeight;
        const scrollPercent = (content_el.scrollTop / scrollHeight) * 100;
        scroll_el.style.width = scrollPercent + "%";
      }
    }
    content_el?.addEventListener("scroll", handleScroll);
    return () => content_el?.removeEventListener("scroll", handleScroll);
  }, [data, completeProfile]);

  useEffect(() => {
    if (contentDiv.current) {
      contentDiv.current.scrollTop = 0;
    }
  }, [page, searchTerm]);

  return (
    <div className="gh-profile-finder-cont">
      <div className="gh-header">
        <h1>Search Github Profiles</h1>
        <div className="scrollWrapper">
          <div ref={scrollDiv} className="scrollIndicator"></div>
        </div>
      </div>
      <div className="gh-search-cont">
        <input
          type="text"
          name="query"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button
          onClick={handleOnSearchClick}
          className={isLoading ? "loadingButton" : ""}
        >
          Search
        </button>
      </div>
      {isLoading || isError ? (
        <div className="gh-search-status">
          {isError && error instanceof Error
            ? error.message
            : "Please wait, loading results.."}
        </div>
      ) : completeProfile ? (
        <CompleteGitHubProfile
          profile={completeProfile}
          onBack={handleOnBack}
        />
      ) : data && data.items.length > 0 ? (
        <div ref={contentDiv} className="gh-profiles-cont">
          {data.items.map((profile) => (
            <ProfileCard
              key={profile.login}
              onClick={handleOpenProfile}
              login={profile.login}
              name={profile.name}
              bgImage={profile.avatar_url}
            />
          ))}
          <CustomPaginator
            currentPage={page}
            totalPages={Math.min(
              Math.ceil(data.totalCount / per_page),
              page_limit
            )}
            handleOnClick={handlePageChange}
          />
        </div>
      ) : null}
    </div>
  );
}
