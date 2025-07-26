import { MaterialSymbolsFormatPaint } from "./icons/MaterialSymbolsFormatPaint.tsx";
import { MaterialSymbolsFormatPaintOutline } from "./icons/MaterialSymbolsFormatPaintOutline.tsx";
import { useStore } from "../store.ts";

export function Brush() {
  const mode = useStore((state) => state.mode);
  const setMode = useStore((state) => state.setMode);
  return (
    <div onClick={() => setMode("paint")}>
      <div className={`icon-wrapper ${mode === "paint" ? "active-icon" : ""}`}>
        {mode === "paint" ? (
          <MaterialSymbolsFormatPaint />
        ) : (
          <MaterialSymbolsFormatPaintOutline />
        )}
      </div>
    </div>
  );
}
