import { MaterialSymbolsFormatPaint } from "./icons/MaterialSymbolsFormatPaint.tsx";
import { MaterialSymbolsFormatPaintOutline } from "./icons/MaterialSymbolsFormatPaintOutline.tsx";
import { useStore } from "../store.ts";

export function Brush() {
  const myMode = useStore((state) => state.myMode);
  const setMyMode = useStore((state) => state.setMyMode);
  return (
    <div onClick={() => setMyMode("paint")}>
      <div className={`icon-wrapper ${myMode === "paint" ? "active-icon" : ""}`}>
        {myMode === "paint" ? (
          <MaterialSymbolsFormatPaint />
        ) : (
          <MaterialSymbolsFormatPaintOutline />
        )}
      </div>
    </div>
  );
}
