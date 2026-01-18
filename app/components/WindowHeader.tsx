import { SquareIcon, XIcon } from "lucide-react";
import { type DragEvent } from "react";

interface Props {
  setX: (value: number) => void;
  setY: (value: number) => void;
  width: number;
  close: () => void;
  minimize: () => void;
}

function WindowHeader({ setX, setY, width, close, minimize }: Props) {
  function RePositionWindow(e: DragEvent) {
    if (e.clientX === 0 && e.clientY === 0) return;
    setX(e.clientX - width / 2);
    setY(e.clientY % window.innerHeight);
  };

  function hideDragPreview(e: DragEvent<HTMLDivElement>) {
    // Required for Firefox
    e.dataTransfer.setData("text/plain", "");

    // Transparent drag image
    const img = new Image();
    img.src =
      "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
    e.dataTransfer.setDragImage(img, 0, 0);
  };
  const isMac = true// navigator.platform.toUpperCase().indexOf('MAC') >= 0;

  return (<header className="relative group mx-auto w-40 h-6">
    <div className="w-32 h-6 bg-gray-200 shadow-sm hover:cursor-grab mx-auto rounded-b-2xl -translate-y-5 group-hover:translate-y-0 ease-in-out duration-200">
      {/* Drag handler */}
      <div
        className="absolute left-0 top-0 w-full h-full z-10"
        draggable={true}
        onDragStart={hideDragPreview}
        onDrag={RePositionWindow}
        onDragEnd={RePositionWindow}
      />
      <div className="relative h-full flex justify-center items-center gap-2">
        {isMac ?
          <MacOSControls close={close} minimize={minimize} /> : 
          <WindowControls close={close} minimize={minimize} />
        }
      </div>
    </div>
  </header>
  );
}

export default WindowHeader;

function MacOSControls({ close, minimize }: { close: () => void; minimize: () => void }) {
  return (
    <>
      <button
        aria-label="Close"
        title="Close"
        onClick={(e) => { e.stopPropagation(); close(); }}
        className="w-3.5 h-3.5 z-20 rounded-full bg-red-500 hover:brightness-90 shadow-sm border border-red-600 cursor-pointer"
      />
      <button
        aria-label="Minimize"
        title="Minimize"
        onClick={(e) => { e.stopPropagation(); minimize(); }}
        className="w-3.5 h-3.5 z-20 rounded-full bg-yellow-400 hover:brightness-90 shadow-sm border border-yellow-500 cursor-pointer"
      />
      <button
        aria-label="Zoom"
        disabled
        title="Zoom"
        onClick={(e) => e.stopPropagation()}
        className="w-3.5 h-3.5 z-20 rounded-full disabled:cursor-not-allowed bg-green-500 hover:brightness-90 shadow-sm border border-green-600 cursor-pointer"
      />
    </>
  );
}

function WindowControls({ close, minimize }: { close: () => void; minimize: () => void }) {
  return (
    <>
      <button
        aria-label="Minimize"
        title="Minimize"
        onClick={(e) => { e.stopPropagation(); minimize(); }}
        className="w-4 h-4 z-20 rounded-sm cursor-pointer"
      >
        <div className="w-3 h-0.5 bg-black dark:bg-white rounded-full" />
      </button>
      <button
        aria-label="Zoom"
        title="Zoom"
        disabled
        onClick={(e) => e.stopPropagation()}
        className="w-4 h-4 z-20 rounded-sm disabled:cursor-not-allowed cursor-pointer"
      >
        <SquareIcon strokeWidth={2} className="w-3 h-3 mx-auto" />
      </button>
      <button
        aria-label="Close"
        title="Close"
        onClick={(e) => { e.stopPropagation(); close(); }}
        className="w-4 h-4 z-20 rounded-sm hover:bg-red-500 hover:text-white cursor-pointer"
      >
        <XIcon strokeWidth={2} className="w-4 h-4 mx-auto" />
      </button>
    </>
  );
}
