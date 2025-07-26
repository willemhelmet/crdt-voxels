import { MaterialSymbolsInkEraser } from "./icons/MaterialSymbolsInkEraser.tsx";
import { MaterialSymbolsInkEraserOutline } from "./icons/MaterialSymbolsInkEraserOutline.tsx";
import { useStore } from "../store.ts";

export function Eraser() {
  const mode = useStore((state) => state.mode);
  const setMode = useStore((state) => state.setMode);

  return (
    <div onClick={() => setMode("erase")}>
      <div className={`icon-wrapper ${mode === "erase" ? "active-icon" : ""}`}>
        {mode === "erase" ? (
          <MaterialSymbolsInkEraser />
        ) : (
          <MaterialSymbolsInkEraserOutline />
        )}
      </div>
    </div>
  );
}
