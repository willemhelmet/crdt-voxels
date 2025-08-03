import { MaterialSymbolsEditSharp } from "./icons/MaterialSymbolsEditSharp.tsx";
import { MaterialSymbolsEditOutlineSharp } from "./icons/MaterialSymbolsEditOutlineSharp.tsx";
import { useStore } from "../store.ts";

export function Pencil() {
  const myMode = useStore((state) => state.myMode);
  const setMyMode = useStore((state) => state.setMyMode);

  return (
    <div onClick={() => setMyMode("add")}>
      <div className={`icon-wrapper ${myMode === "add" ? "active-icon" : ""}`}>
        {myMode === "add" ? (
          <MaterialSymbolsEditSharp />
        ) : (
          <MaterialSymbolsEditOutlineSharp />
        )}
      </div>
    </div>
  );
}
