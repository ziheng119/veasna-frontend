import React, { Dispatch, SetStateAction, RefObject, MouseEvent } from "react";
import HorizontalLabelInputPair from "../../../HorizontalLabelInputPair"

interface Props {
  setShowPopUp: Dispatch<SetStateAction<boolean>>;
  popupRef: RefObject<HTMLDivElement> | null;
  pos: { x: number; y: number };
  onMouseDown: (e: MouseEvent<HTMLDivElement>) => void;
}

export default function HistoryPopUp({ setShowPopUp, popupRef, pos, onMouseDown }: Props) {
  return (
    <div
      className="fixed inset-0 bg-auto bg-opacity-50 flex items-center justify-center z-50"
      onClick={() => setShowPopUp(false)}
    >
      <div
        ref={popupRef}
        className="p-6 rounded-lg shadow-lg relative cursor-move bg-green-default w-[80vw] h-[80vh]"
        style={{
          position: "absolute",
          left: pos.x,
          top: pos.y,
          maxWidth: "80vw",
          maxHeight: "80vh",
          overflow: "auto",
        }}
        onMouseDown={onMouseDown}
        onClick={(e) => e.stopPropagation()}
      >   
      <div className="flex flex-col gap-2 h-[70vh]">
        <HorizontalLabelInputPair 
          label="Past History"
          readOnly={true}
          value="XXX"
        />
        <HorizontalLabelInputPair 
          label="Drug and Treatment History"
          readOnly={true}
          value="XXX"
        />
        <HorizontalLabelInputPair 
          label="Family History"
          readOnly={true}
          value="XXX"
        />
        <HorizontalLabelInputPair 
          label="Social History"
          readOnly={true}
          value="XXX"
        />
      </div>
      </div>
    </div>
  )
}