import { MaterialSymbolsInkEraser } from "./icons/MaterialSymbolsInkEraser.tsx";
import { MaterialSymbolsInkEraserOutline } from "./icons/MaterialSymbolsInkEraserOutline.tsx";
import { useStore } from "../store.ts";

export function Eraser() {
  const myMode = useStore((state) => state.myMode);
  const setMyMode = useStore((state) => state.setMyMode);

  return (
    <div onClick={() => setMyMode("erase")}>
      <div className={`icon-wrapper ${myMode === "erase" ? "active-icon" : ""}`}>
        {myMode === "erase" ? (
          <MaterialSymbolsInkEraser />
        ) : (
          <MaterialSymbolsInkEraserOutline />
        )}
      </div>
    </div>
  );
}
