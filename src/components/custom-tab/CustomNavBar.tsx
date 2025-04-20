import { useEffect, useState } from "react";
import "./custom-navbar.css";

interface CustomNavBarProps {
  tabsList: string[];
  handleContentChange: (selTab: number) => void;
  defaultTab?: number;
  defaultSelection?: boolean;
  resetNavBar?: number;
}

export default function CustomNavBar({
  tabsList,
  handleContentChange,
  defaultTab = 0,
  defaultSelection = true,
  resetNavBar = 0,
}: CustomNavBarProps) {
  const selIndexDefault = defaultSelection
    ? defaultTab < tabsList.length
      ? defaultTab
      : 0
    : null;
  const [selIndex, setSelIndex] = useState<number | null>(selIndexDefault);

  useEffect(() => {
    selIndex !== null ? handleContentChange(selIndex) : null;
  }, []);

  useEffect(() => {
    setSelIndex(null);
  }, [resetNavBar]);

  return (
    <nav className="navbar">
      {tabsList.map((tab, index) => (
        <div
          key={index}
          onClick={() => {
            setSelIndex(index);
            handleContentChange(index);
          }}
          className="navbar-tab"
        >
          <p
            className={
              selIndex === index
                ? "underline-hover tabSelected"
                : "underline-hover"
            }
          >
            {tab}
          </p>
        </div>
      ))}
    </nav>
  );
}
