import { MaterialSymbolsBackHand } from "./icons/MaterialSymbolsBackHand.tsx";
import { MaterialSymbolsBackHandOutline } from "./icons/MaterialSymbolsBackHandOutline.tsx";
import { useStore } from "../store.ts";

export function Hand() {
  const myMode = useStore((state) => state.myMode);
  const setMyMode = useStore((state) => state.setMyMode);

  return (
    <div onClick={() => setMyMode("move")}>
      <div className={`icon-wrapper ${myMode === "move" ? "active-icon" : ""}`}>
        {myMode === "move" ? (
          <MaterialSymbolsBackHand />
        ) : (
          <MaterialSymbolsBackHandOutline />
        )}
      </div>
    </div>
  );
}
