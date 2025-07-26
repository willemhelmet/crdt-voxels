import { MaterialSymbolsBackHand } from "./icons/MaterialSymbolsBackHand.tsx";
import { MaterialSymbolsBackHandOutline } from "./icons/MaterialSymbolsBackHandOutline.tsx";
import { useStore } from "../store.ts";

export function Hand() {
  const mode = useStore((state) => state.mode);
  const setMode = useStore((state) => state.setMode);

  return (
    <div onClick={() => setMode("move")}>
      <div className={`icon-wrapper ${mode === "move" ? "active-icon" : ""}`}>
        {mode === "move" ? (
          <MaterialSymbolsBackHand />
        ) : (
          <MaterialSymbolsBackHandOutline />
        )}
      </div>
    </div>
  );
}
