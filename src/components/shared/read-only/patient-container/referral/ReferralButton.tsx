"use client"

interface Props {
  patient: QueuedPatient
  patientInfo: PatientInfo;
  retrievedReferral: Referral | null
}

import { PatientInfo, QueuedPatient } from "@/lib/types/patient";
import ReferralPopUp from "./ReferralPopUp";
import { RefObject, useRef, useState } from "react";
import { Referral } from "@/lib/types/consultation";

export default function ReferralButton({ patient, patientInfo, retrievedReferral }: Props) {
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
    <>
      <button 
        className="bg-green-default rounded-md p-2 hover:cursor-pointer"
        onClick={e => setShowPopUp(true)}>
        Create/Edit Referral
      </button>

      {showPopUp && 
        <ReferralPopUp
          patient={patient} 
          patientInfo={patientInfo}
          retrievedReferral={retrievedReferral}
          setShowPopUp={setShowPopUp}
          popupRef={popupRef as RefObject<HTMLDivElement>}
          pos={pos}
          onMouseDown={onMouseDown}
        />
      }
    </>
  )
}