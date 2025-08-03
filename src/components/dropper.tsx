import { MaterialSymbolsDropperEye } from "./icons/MaterialSymbolsDropperEye.tsx";
import { MaterialSymbolsDropperEyeOutline } from "./icons/MaterialSymbolsDropperEyeOutline.tsx";
import { useStore } from "../store.ts";

export function Dropper() {
  const myMode = useStore((state) => state.myMode);
  const setMyMode = useStore((state) => state.setMyMode);

  return (
    <div onClick={() => setMyMode("dropper")}>
      <div
        className={`icon-wrapper ${myMode === "dropper" ? "active-icon" : ""}`}
      >
        {myMode === "dropper" ? (
          <MaterialSymbolsDropperEye />
        ) : (
          <MaterialSymbolsDropperEyeOutline />
        )}
      </div>
    </div>
  );
}
