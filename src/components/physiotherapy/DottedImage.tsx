import React, { useState, useEffect } from "react";

type ClickPosition = {
  x: number; // percentage
  y: number; // percentage
};

type Props = {
  imageUrl: string;
  initialPositions?: ClickPosition[] | undefined; // if you load saved data from DB
};

export default function DottedImage({ imageUrl, initialPositions }: Props) {
  const [clickPositions, setClickPositions] = useState<ClickPosition[]>([]);

  useEffect(() => {
    setClickPositions(initialPositions || []);
  }, [initialPositions]);

  // Add dot on image click
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Prevent adding dot if clicking on a dot itself (to avoid conflict with remove)
    if ((e.target as HTMLElement).dataset.dot) {
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setClickPositions((prev) => [...prev, { x, y }]);
  };

  // Remove a single dot by index
  const handleRemoveDot = (indexToRemove: number) => {
    setClickPositions((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  // Clear all dots
  const handleClearAll = () => {
    setClickPositions([]);
  };

  return (
    <div style={{ maxWidth: 600, width: "100%" }}>
      <div className="flex items-end justify-end">
        <button
          onClick={handleClearAll}
          className="rounded-md p-2 hover:cursor-pointer text-sm"
        >
          Clear All
        </button>
      </div>
      <div
        onClick={handleClick}
        style={{
          position: "relative",
          display: "inline-block",
          cursor: "crosshair",
          width: "100%",
        }}
      >
        <img
          src={imageUrl}
          alt="Clickable"
          className="block w-full h-auto items-center"
        />

        {clickPositions.map((pos, index) => (
          <div
            key={index}
            data-dot="true" // flag to detect clicks on dots
            onClick={(e) => {
              e.stopPropagation(); // prevent triggering image click
              handleRemoveDot(index);
            }}
            style={{
              position: "absolute",
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              width: 10,
              height: 10,
              backgroundColor: "red",
              borderRadius: "50%",
              transform: "translate(-50%, -50%)",
              cursor: "pointer",
              border: "2px solid white",
              boxSizing: "border-box",
            }}
            title="Click to remove this dot"
          />
        ))}
      </div>
    </div>
  );
}
