import { MaterialSymbolsInkEraser } from "./icons/MaterialSymbolsInkEraser.tsx";
import { MaterialSymbolsInkEraserOutline } from "./icons/MaterialSymbolsInkEraserOutline.tsx";
import { useStore } from "../store.ts";

export function Eraser() {
  const mode = useStore((state) => state.mode);
  const setMode = useStore((state) => state.setMode);

  function toggleMode() {
    setMode(mode === "add" ? "erase" : "add");
  }

  return (
    <div onClick={toggleMode}>
      {mode === "erase" ? (
        <div className="active-icon">
          <MaterialSymbolsInkEraser />
        </div>
      ) : (
        <MaterialSymbolsInkEraserOutline />
      )}
    </div>
  );
}
