import { MaterialSymbolsDropperEye } from "./icons/MaterialSymbolsDropperEye.tsx";
import { MaterialSymbolsDropperEyeOutline } from "./icons/MaterialSymbolsDropperEyeOutline.tsx";
import { useStore } from "../store.ts";

export function Dropper() {
  const mode = useStore((state) => state.mode);
  const setMode = useStore((state) => state.setMode);

  return (
    <div onClick={() => setMode("dropper")}>
      <div
        className={`icon-wrapper ${mode === "dropper" ? "active-icon" : ""}`}
      >
        {mode === "dropper" ? (
          <MaterialSymbolsDropperEye />
        ) : (
          <MaterialSymbolsDropperEyeOutline />
        )}
      </div>
    </div>
  );
}
