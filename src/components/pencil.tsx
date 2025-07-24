import { MaterialSymbolsEditSharp } from "./icons/MaterialSymbolsEditSharp.tsx";
import { MaterialSymbolsEditOutlineSharp } from "./icons/MaterialSymbolsEditOutlineSharp.tsx";
import { useStore } from "../store.ts";

export function Pencil() {
  const mode = useStore((state) => state.mode);
  const setMode = useStore((state) => state.setMode);

  function hi() {
    setMode(mode === "add" ? "erase" : "add");
  }
  return (
    <>
      <div onClick={hi} onMouseEnter={() => console.log("hovering")}>
        {mode === "add" ? (
          <div className="active-icon">
            <MaterialSymbolsEditSharp />
          </div>
        ) : (
          <MaterialSymbolsEditOutlineSharp />
        )}
      </div>
    </>
  );
}
