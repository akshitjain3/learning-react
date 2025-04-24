import { useState } from "react";
import "./randomcolor.css";
import BubblesBackground from "../starry-background/BubblesBackground";

export default function RandomColor() {
  const [colorCategory, setColorCategory] = useState("HEX");
  const [color, setColor] = useState("");

  function generateColor() {
    const hexrange = [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
    ];
    const rgb = Array.from({ length: 256 }, (_, i) => i);
    setColor(
      colorCategory === "HEX"
        ? "#" +
            Array.from(
              { length: 6 },
              () => hexrange[Math.round(Math.random() * 16)]
            ).join("")
        : `rgb(${Array.from(
            { length: 3 },
            () => rgb[Math.round(Math.random() * 256)]
          ).join(", ")})`
    );
  }

  return (
    <div
      className="randomColorWrapper"
      style={color ? { backgroundColor: color } : undefined}
    >
      <BubblesBackground noOfStars={50} />
      <h1>Random Color Generator</h1>
      <fieldset className="colorSelection">
        <legend>Color Type</legend>
        <label>
          <input
            onChange={(e) => setColorCategory(e.target.value)}
            type="radio"
            name="colorCategory"
            checked={colorCategory === "HEX"}
            value="HEX"
          />
          Hex
        </label>
        <br />
        <label>
          <input
            onChange={(e) => setColorCategory(e.target.value)}
            type="radio"
            name="colorCategory"
            value="RGB"
            checked={colorCategory === "RGB"}
          />
          RGB
        </label>
      </fieldset>
      <button className="colorChangeButton" onClick={generateColor}>
        Generate Random Color
      </button>
      <div className="colorInfo">
        <h3>Color Type: {colorCategory}</h3>
        <h3>{color}</h3>
      </div>
    </div>
  );
}
