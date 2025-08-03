import { MaterialSymbolsPlayCircleRounded } from "./icons/MaterialSymbolsPlayCircleRounded.tsx";
import { MaterialSymbolsPlayCircleOutlineRounded } from "./icons/MaterialSymbolsPlayCircleOutlineRounded.tsx";
import { useStore } from "../store.ts";

export function Play() {
  const myView = useStore((state) => state.myView);
  const setMyView = useStore((state) => state.setMyView);

  const toggleView = () => {
    setMyView(myView === "editor" ? "first-person" : "editor");
  };

  return (
    <div onClick={toggleView}>
      <div
        className={`icon-wrapper ${
          myView === "first-person" ? "active-icon" : ""
        }`}>
        {myView === "first-person" ? (
          <MaterialSymbolsPlayCircleRounded />
        ) : (
          <MaterialSymbolsPlayCircleOutlineRounded />
        )}
      </div>
    </div>
  );
}