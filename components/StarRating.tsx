"use client";

import { FiStar } from "react-icons/fi";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
  size?: "sm" | "md" | "lg";
}

export default function StarRating({
  rating,
  maxRating = 5,
  interactive = false,
  onChange,
  size = "md",
}: StarRatingProps) {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl",
  };

  return (
    <div className={`flex gap-1 ${interactive ? "cursor-pointer" : ""}`}>
      {Array.from({ length: maxRating }).map((_, i) => (
        <button
          key={i}
          type="button"
          disabled={!interactive}
          aria-label={`Rate ${i + 1} star${i > 0 ? "s" : ""}`}
          onClick={() => interactive && onChange?.(i + 1)}
          className={`${sizeClasses[size]} ${
            interactive ? "hover:scale-110 transition-transform" : ""
          } ${
            i < rating
              ? "text-amber-400"
              : "text-default-300"
          }`}
        >
          <FiStar fill={i < rating ? "currentColor" : "none"} />
        </button>
      ))}
    </div>
  );
}
