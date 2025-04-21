import React from "react";
import { CompleteGHProfile } from "./GithubProfileFinder";
import {
  FaGithub,
  FaLink,
  FaUserFriends,
  FaUsers,
  FaCode,
  FaArrowLeft,
} from "react-icons/fa";
import "./GitHubProfileCard.css";

interface GitHubProfileCardProps {
  profile: CompleteGHProfile;
  onBack: () => void;
}

const GitHubProfileCard: React.FC<GitHubProfileCardProps> = ({
  profile,
  onBack,
}) => {
  const safeBlogLink = profile.blog?.startsWith("http")
    ? profile.blog
    : `https://${profile.blog}`;
  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        <div className="avatar-section">
          <button className="back-button" onClick={onBack}>
            <FaArrowLeft size={16} />
          </button>
          <img
            src={profile.avatar_url}
            alt={profile.login}
            className="avatar"
          />
        </div>

        <div className="info-section">
          <h2>{profile.name || profile.login}</h2>
          <p className="username">@{profile.login}</p>
          {profile.bio && <p className="bio">"{profile.bio}"</p>}

          <div className="details">
            {profile.location && (
              <div>
                <strong>Location:</strong> {profile.location}
              </div>
            )}
            {profile.company && (
              <div>
                <strong>Company:</strong> {profile.company}
              </div>
            )}
            {profile.blog && (
              <div className="link-line">
                <FaLink />
                <a
                  href={safeBlogLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Website / Blog
                </a>
              </div>
            )}
            <div>
              <strong>Joined On:</strong>{" "}
              {new Date(profile.created_at).toLocaleDateString()}
            </div>
          </div>

          <div className="stats">
            <a
              href={`${profile.html_url}?tab=followers`}
              target="_blank"
              rel="noreferrer"
            >
              <FaUsers size={20} /> Followers: {profile.followers}
            </a>
            <a
              href={`${profile.html_url}?tab=following`}
              target="_blank"
              rel="noreferrer"
            >
              <FaUserFriends size={20} /> Following: {profile.following}
            </a>
            <a
              href={`${profile.html_url}?tab=repositories`}
              target="_blank"
              rel="noreferrer"
            >
              <FaCode size={20} /> Repositories: {profile.public_repos}
            </a>
            <a href={profile.html_url} target="_blank" rel="noreferrer">
              <FaGithub size={20} /> GitHub Link
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitHubProfileCard;
