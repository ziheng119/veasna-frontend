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
    <div className="max-w-[600px] w-full">
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
        className="relative inline cursor-crosshair w-full"
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
            className="absolute w-2.5 h-2.5 bg-red-500 rounded-full -translate-x-1/2 -translate-y-1/2 cursor-pointer border-2 border-white box-border"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
            }}

            title="Click to remove this dot"
          />
        ))}
      </div>
    </div>
  );
}
