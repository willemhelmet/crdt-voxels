import { MaterialSymbolsEditSharp } from "./icons/MaterialSymbolsEditSharp.tsx";
import { MaterialSymbolsEditOutlineSharp } from "./icons/MaterialSymbolsEditOutlineSharp.tsx";
import { useStore } from "../store.ts";

export function Pencil() {
  const mode = useStore((state) => state.mode);
  const setMode = useStore((state) => state.setMode);

  return (
    <div onClick={() => setMode("add")}>
      <div className={`icon-wrapper ${mode === "add" ? "active-icon" : ""}`}>
        {mode === "add" ? (
          <MaterialSymbolsEditSharp />
        ) : (
          <MaterialSymbolsEditOutlineSharp />
        )}
      </div>
    </div>
  );
}
