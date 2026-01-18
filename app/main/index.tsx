import Window from "~/components/Window";
import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";
import { useState, useId } from "react";
import { PlusIcon } from "lucide-react";

export function MainScreen() {
  const [windows, setWindows] = useState([
    { id: 1, order: 1, startX: 100, startY: 100, minimized: false, width: 300 },
    { id: 2, order: 2, startX: 150, startY: 170, minimized: false, width:500},
    { id: 3, order: 3, startX: 200, startY: 240, minimized: false },
  ]);

  return (
    <main
      className="w-screen h-screen overflow-hidden"
      style={{
        backgroundImage: "url('https://picsum.photos/2560/1440?random=1')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {windows.map((win) => (
        <Window
          key={win.id}
          order={win.order}
          startX={win.startX}
          startY={win.startY}
          minimized={win.minimized}
          initialWidth={win.width}
          id={win.id}
          setActive={() => {
            setWindows((prevWindows) => {
              const maxOrder = Math.max(...prevWindows.map((w) => w.order));
              return prevWindows.map((w) =>
                w.order === win.order ? { ...w, order: maxOrder + 1 } : w
              );
            });
          }}
          close={() => {
            setWindows((prevWindows) =>
              prevWindows.filter((w) => w.id !== win.id)
            );
          }}
          minimize={() => {
            setWindows((prevWindows) =>
              prevWindows.map((w) =>
                w.id === win.id ? { ...w, minimized: true } : w
              )
            );
          }}
        />
      ))}
      {/* Info */}
      <Info />
      {/* Dock */}
      <div
        className="left-1/2 transform -translate-x-1/2 z-1000000000 absolute bottom-10 flex justify-center items-center gap-4 rounded-2xl p-2 bg-white/20 shadow-lg"
      >
        {windows.map((win) => (
          <button
            key={win.id}
            onClick={() => {
              const maxOrder = Math.max(...windows.map((w) => w.order));
              setWindows((prevWindows) =>
                prevWindows.map((w) =>
                  w.id === win.id ? { ...w, minimized: false, order: maxOrder + 1 } : w
                )
              );
            }}
            className="w-12 h-12 rounded-2xl shadow-md cursor-pointer relative"
            style={{
              background: `linear-gradient(135deg,hsl(${win.id * 120}, 70%, 90%), hsl(${win.id * 120 + 20}, 70%, 40%))`,
            }}
          >
            <span className="font-bold text-lg">{win.id}</span>
            {windows.find((w) => w.id == win.id)?.minimized && (
              <span className="w-2 h-2 bg-blue-400 rounded-full -top-1 -right-1" />
            )}
          </button>
        ))}
        <button onClick={() => {
          const maxOrder = Math.max(...windows.map((w) => w.order));
          setWindows((prevWindows) => [
            ...prevWindows,
            { id: prevWindows.length + 1, order: maxOrder + 1, startX: 100, startY: 100, minimized: false }
          ]);
        }}
          className="w-12 h-12 rounded-2xl shadow-md bg-gray-100 flex justify-center items-center cursor-pointer">

          <PlusIcon />
        </button>
      </div>
    </main>
  );
}


const Info = () => {
  const [isFs, setIsFs] = useState<boolean>(
    typeof document !== "undefined" &&
    !!(
      document.fullscreenElement ||
      (document as any).webkitFullscreenElement
    )
  );
  const [hideHint, setHideHint] = useState(false);

  const goFullscreen = async () => {
    try {
      const el = typeof document !== "undefined" ? document.documentElement : null;
      if (!el) return;
      if ((el as any).requestFullscreen) {
        await (el as any).requestFullscreen();
      } else if ((el as any).webkitRequestFullscreen) {
        await (el as any).webkitRequestFullscreen();
      } else if ((el as any).msRequestFullscreen) {
        await (el as any).msRequestFullscreen();
      }
      setIsFs(true);
    } catch {
      // ignore
    }
  };

  // Show hint when not fullscreen and user didn't dismiss it
  if (typeof document === "undefined" || isFs || hideHint) return null;

  return (
    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex items-center gap-3 bg-yellow-50/95 text-yellow-900 border border-yellow-200 rounded-md px-4 py-2 shadow">
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M3 3h8v2H5v6H3V3zM21 21h-8v-2h6v-6h2v8zM3 21h8v-2H5v-6H3v8zM21 3h-8v2h6v6h2V3z" fill="currentColor" />
        </svg>
        <div className="text-sm">
          For the best desktop-like experience, please enter fullscreen.
        </div>
        <div className="flex gap-2 ml-3">
          <button
            onClick={goFullscreen}
            className="bg-yellow-600 cursor-pointer text-white text-sm px-3 py-1 rounded-md shadow-sm"
          >
            Go fullscreen
          </button>
          <button
            onClick={() => setHideHint(true)}
            className="text-xs text-gray-600 px-2 py-1"
            aria-label="Dismiss fullscreen hint"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
