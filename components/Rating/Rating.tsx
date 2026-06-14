import React from "react";

type Props = {
  value: number; // например 3.5
  max?: number;
};

const Rating: React.FC<Props> = ({ value, max = 5 }) => {
  return (
    <div style={{ display: "flex", gap: "4px" }}>
      {Array.from({ length: max }, (_, i) => {
        const filled = i < Math.round(value);

        return (
          <span key={i}>
            {filled ? "⭐" : "☆"}
          </span>
        );
      })}
    </div>
  );
};

export default Rating;