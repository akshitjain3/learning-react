import { memo } from "react";
import { motion } from "framer-motion";

interface StarsProps {
  size?: number;
  noOfStars?: number;
}

const Stars = ({ size = 4, noOfStars = 100 }: StarsProps) => {
  const randomOpacity = () => Math.random();
  const random = () => Math.random();

  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(noOfStars)].map((_, i) => (
        <motion.span
          key={`star-${i}`}
          animate={{
            top: `${random() * 100}%`,
            left: `${random() * 100}%`,
            opacity: randomOpacity(),
            scale: [1, 1.2, 0],
          }}
          transition={{
            duration: random() * 10 + 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            top: `${random() * 100}%`,
            left: `${random() * 100}%`,
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: "white",
            borderRadius: "50%",
            zIndex: 1,
          }}
        ></motion.span>
      ))}
    </div>
  );
};

const BubblesBackground = memo(Stars);

export default BubblesBackground;
