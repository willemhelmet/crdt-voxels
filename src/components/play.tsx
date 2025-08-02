import { MaterialSymbolsPlayCircleRounded } from "./icons/MaterialSymbolsPlayCircleRounded.tsx";
import { MaterialSymbolsPlayCircleOutlineRounded } from "./icons/MaterialSymbolsPlayCircleOutlineRounded.tsx";
import { useStore } from "../store.ts";

export function Play() {
  const view = useStore((state) => state.view);
  const setView = useStore((state) => state.setView);

  const toggleView = () => {
    setView(view === "editor" ? "first-person" : "editor");
  };

  return (
    <div onClick={toggleView}>
      <div
        className={`icon-wrapper ${
          view === "first-person" ? "active-icon" : ""
        }`}>
        {view === "first-person" ? (
          <MaterialSymbolsPlayCircleRounded />
        ) : (
          <MaterialSymbolsPlayCircleOutlineRounded />
        )}
      </div>
    </div>
  );
}