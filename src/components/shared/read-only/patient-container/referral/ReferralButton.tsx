"use client"

import ReferralPopUp from "./ReferralPopUp";
import { RefObject, useRef, useState } from "react";

export default function ReferralButton() {
  const [showPopUp, setShowPopUp] = useState(false);

  // Position state
  const [pos, setPos] = useState({ x: 0, y: 0 });

  // Dragging state
  const dragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const popupRef = useRef<HTMLDivElement>(null);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    dragging.current = true;
    dragStart.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!dragging.current) return;
    setPos({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    });
  };

  const onMouseUp = () => {
    dragging.current = false;
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  };
  
  return (
    <div className="flex justify-between" onClick={e => setShowPopUp(true)}>
      <button className="bg-green-default rounded-md p-2 hover:cursor-pointer">
        Create/Edit Referral
      </button>

      {showPopUp && 
        <ReferralPopUp 
          setShowPopUp={setShowPopUp}
          popupRef={popupRef as RefObject<HTMLDivElement>}
          pos={pos}
          onMouseDown={onMouseDown}
        />
      }
    </div>
  )
}