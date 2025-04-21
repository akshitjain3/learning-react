import "./profile-card.css";

interface ProfileCardProps {
  login: string;
  name: string;
  bgImage: string;
  onClick: (id: string) => void;
}

export default function ProfileCard({
  login,
  name,
  bgImage,
  onClick,
}: ProfileCardProps) {
  return (
    <div
      className="gh-profile-card"
      style={{ backgroundImage: `url(${bgImage})`, height: "380px" }}
    >
      <div className="radiant-background"></div>
      <div className="gh-profile-name">{name}</div>
      <div className="gh-profile-icon-div" onClick={() => onClick(login)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="gh-profile-icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
          ></path>
        </svg>
      </div>
    </div>
  );
}
