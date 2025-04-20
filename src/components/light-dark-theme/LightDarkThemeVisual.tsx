import "./light-dark.css";
import SunSVG from "/assets/sun.svg";
import MoonSVG from "/assets/moon.svg";

interface LightDarkThemeElementProps {
  toggleThemeChange: (value: string) => void;
  theme: string;
}

export default function LightDarkThemeElement({
  toggleThemeChange,
  theme,
}: LightDarkThemeElementProps) {
  return (
    <div className="lightdarkCont">
      <div
        className={
          theme === "light"
            ? "lightdark-left selected"
            : "lightdark-left cursor-pointer unselected"
        }
        onClick={() => toggleThemeChange("light")}
      >
        <img src={SunSVG} alt="lighticon" />
        <p>Light</p>
      </div>
      <div
        className={
          theme === "dark"
            ? "lightdark-right selected"
            : "lightdark-right cursor-pointer unselected"
        }
        onClick={() => toggleThemeChange("dark")}
      >
        <p>Dark</p>
        <img src={MoonSVG} alt="darkicon" />
      </div>
      <div
        id="toggle-knob"
        className="toggle-knob"
        style={{ left: theme === "light" ? "12px" : "138px" }}
      ></div>
    </div>
  );
}
