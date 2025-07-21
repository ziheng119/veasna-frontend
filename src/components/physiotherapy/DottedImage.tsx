import React, { useState, useEffect } from "react";

type ClickPosition = {
  x: number; // percentage
  y: number; // percentage
};

type Props = {
  imageUrl: string;
  initialPositions?: ClickPosition[] | undefined; // if you load saved data from DB
};

export default function DottedImage({imageUrl, initialPositions}: Props) {
  const [clickPositions, setClickPositions] = useState<ClickPosition[]>([]);

  useEffect(() => {
    setClickPositions(initialPositions || []);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setClickPositions((prev) => [...prev, { x, y }]);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        position: "relative",
        display: "inline-block",
        cursor: "crosshair",
        width: "100%",
        maxWidth: 600, // optional fixed size for layout
      }}
    >
      <img
        src={imageUrl}
        alt="Clickable"
        style={{ display: "block", width: "100%", height: "auto" }}
      />

      {clickPositions.map((pos, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            left: `${pos.x}%`,
            top: `${pos.y}%`,
            width: 10,
            height: 10,
            backgroundColor: "red",
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  );
};
