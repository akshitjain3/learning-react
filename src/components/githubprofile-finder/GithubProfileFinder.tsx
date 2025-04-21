import { useEffect, useRef, useState } from "react";
import "./gpf.css";
import ProfileCard from "./ProfileCard";
import CompleteGitHubProfile from "./CompleteGHProfile";
import CustomPaginator from "../page-navigation/CustomPaginator";

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

export default function GithubProfileFinder() {
  const [query, setQuery] = useState("");
  const per_page = 20;
  const page_limit = 10;
  const [page, setPage] = useState(1);
  const [searchResults, setSearchResults] = useState<GHProfiles[]>([]);
  const [displayResults, setDisplayResults] = useState<GHProfiles[]>([]);
  const [completeProfile, setCompleteProfile] =
    useState<CompleteGHProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  async function fetchData(url: string): Promise<boolean> {
    try {
      const response = await fetch(url);
      const data: MainAPIResult = await response.json();

      if (!response.ok || !data.items.length) {
        setError("No profiles match the query.");
        setSearchResults([]);
        return false;
      }

      setSearchResults((prev) => [
        ...prev,
        ...data.items.map((entry) => ({
          login: entry.login,
          avatar_url: entry.avatar_url,
          name: entry.login,
        })),
      ]);
      return true;
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
      setSearchResults([]);
      return false;
    }
  }

  async function fetchProfiles(): Promise<boolean> {
    setLoading(true);
    setError("");

    const resultsNeeded = page_limit * per_page;

    if (resultsNeeded <= 100) {
      const url = `https://api.github.com/search/users?q=${query}&per_page=100`;
      const ok = await fetchData(url);
      setLoading(false);
      return ok;
    } else {
      for (let index = 1; index <= Math.ceil(resultsNeeded / 100); index++) {
        let records = 100;
        if (index === Math.ceil(resultsNeeded / 100)) {
          records = resultsNeeded - (index - 1) * 100;
        }

        const url = `https://api.github.com/search/users?q=${query}&per_page=${records}&page=${
          index + 1
        }`;
        const ok = await fetchData(url);

        if (!ok) {
          break;
        }
      }
      setLoading(false);
      return true;
    }
  }

  function displayProfiles() {
    setDisplayResults(
      searchResults.slice((page - 1) * per_page, page * per_page)
    );
  }
  function handlePageChange(page: number) {
    setPage(page);
  }

  async function handleOnSearchClick() {
    if (query.trim()) {
      setSearchResults([]);
      setDisplayResults([]);
      setError("");
    }

    await fetchProfiles();
  }

  async function handleOpenProfile(login: string) {
    const url = `https://api.github.com/users/${login}`;
    setLoading(true);
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch GitHub profile");
      }

      const data: CompleteGHProfile = await response.json();

      if (data) {
        setCompleteProfile({
          login: data.login,
          name: data.name,
          avatar_url: data.avatar_url,
          location: data.location,
          followers: data.followers,
          following: data.following,
          created_at: data.created_at,
          html_url: data.html_url,
          public_repos: data.public_repos,
          blog: data.blog,
          bio: data.bio,
          company: data.company,
        });
      }
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
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
  }, [searchResults, completeProfile]);

  useEffect(() => {
    if (query.trim()) {
      displayProfiles();
    }

    if (contentDiv.current) {
      contentDiv.current.scrollTop = 0;
    }
  }, [page]);

  useEffect(() => {
    if (searchResults.length > 0) {
      setPage(1);
      displayProfiles();
    }
  }, [searchResults]);

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
          className={loading ? "loadingButton" : ""}
        >
          Search
        </button>
      </div>
      {loading || error ? (
        <div className="gh-search-status">
          {error ? error : "Please wait, loading results.."}
        </div>
      ) : completeProfile ? (
        <CompleteGitHubProfile
          profile={completeProfile}
          onBack={handleOnBack}
        />
      ) : displayResults.length > 0 ? (
        <div ref={contentDiv} className="gh-profiles-cont">
          {displayResults.map((profile) => (
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
            totalPages={Math.ceil(searchResults.length / per_page)}
            handleOnClick={handlePageChange}
          />
        </div>
      ) : null}
    </div>
  );
}
