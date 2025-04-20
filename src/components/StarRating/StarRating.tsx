import { useState } from "react";
import { FaStar } from "react-icons/fa";
import "./starrating.css";

export default function ({ noOfStars = 5 }: { noOfStars: number }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  function handleClick(id: number) {
    setRating(id);
  }

  function handleMouseEnter(id: number) {
    setHover(id);
  }

  function handleMouseLeave() {
    setHover(rating);
  }
  return (
    <div className="starRatingWrapper">
      <h1>Star Rating</h1>
      <div className="starsCont">
        {[...Array(noOfStars)].map((_, i) => {
          i += 1;
          return (
            <FaStar
              className={i <= hover ? "starred" : "not-starred"}
              key={i}
              onClick={() => handleClick(i)}
              onMouseMove={() => handleMouseEnter(i)}
              onMouseLeave={() => handleMouseLeave()}
              size={40}
            />
          );
        })}
      </div>
    </div>
  );
}
