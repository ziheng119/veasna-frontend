import React, { Dispatch, SetStateAction, RefObject, MouseEvent } from "react";
import ReferralForm from "@/components/doctors-consultation/Referral";
import { PatientInfo, QueuedPatient } from "@/lib/types/patient";
import { Referral } from "@/lib/types/consultation";

interface Props {
  patient: QueuedPatient;
  patientInfo: PatientInfo;
  retrievedReferral: Referral | null
  setShowPopUp: Dispatch<SetStateAction<boolean>>;
  popupRef: RefObject<HTMLDivElement> | null;
  pos: { x: number; y: number };
  onMouseDown: (e: MouseEvent<HTMLDivElement>) => void;
}

export default function ReferralPopUp({ patient, patientInfo, retrievedReferral, setShowPopUp, popupRef, pos, onMouseDown }: Props) {
  return (
    <div
      className="fixed inset-0 bg-auto bg-opacity-50 flex items-center justify-center z-50"
      onClick={() => setShowPopUp(false)}
    >
      <div
        ref={popupRef}
        className="p-6 rounded-lg shadow-lg relative cursor-move bg-green-default "
        style={{
          position: "absolute",
          left: pos.x,
          top: pos.y,
          maxHeight: "90vh",
          overflow: "auto",
        }}
        onMouseDown={onMouseDown}
        onClick={(e) => e.stopPropagation()}
      >   
        <ReferralForm
          patient={patient}
          patientInfo={patientInfo}
          retrievedReferral={retrievedReferral}
          onClose={() => setShowPopUp(false)}
        />
      </div>
    </div>
  )
}