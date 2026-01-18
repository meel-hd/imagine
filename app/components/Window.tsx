import { useState, type DragEvent } from "react";
import { ResizableBox } from "react-resizable";
import WindowHeader from "./WindowHeader";

interface WindowProps {
  order?: number;
  startX?: number;
  startY?: number;
  setActive: () => void;
  close: () => void;
  minimize: () => void;
  minimized?: boolean;
  id: number;
  initialWidth?: number;
}

function Window({
  order,
  startX,
  startY,
  setActive,
  close,
  minimize,
  minimized,
  id,
  initialWidth
}: WindowProps) {
  const [width, setWidth] = useState(initialWidth ?? 900);
  const [height, setHeight] = useState(600);
  const [x, setX] = useState(startX ?? 56);
  const [y, setY] = useState(startY ?? 40);

  return (
    <ResizableBox
      className="fixed! w-full border border-gray-300 rounded-lg shadow-lg bg-white overflow-clip"
      style={{
        left: x + "px",
        top: y + "px",
        zIndex: order ? (order + 1) * 10 : 10,
        display: minimized ? "none" : "block",
        transition: "display 12s ease-in-out",
      }}
      width={width}
      height={height}
      onResizeStop={(e, data) => {
        setWidth(data.size.width);
        setHeight(data.size.height);
      }}
      resizeHandles={["s", "e", "se"]}
    >
      <div onMouseDown={setActive} className="w-full h-full">
        <WindowHeader
          setX={setX}
          setY={setY}
          width={width}
          close={close}
          minimize={minimize}
        />
        <main className="w-full h-full flex items-center justify-center">
          <h1 className="text-2xl font-semibold text-gray-700">
            Application {id} Window 
          </h1>
        </main>
      </div>
    </ResizableBox>
  );
}

export default Window;