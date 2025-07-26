import { MdiCursorDefaultClick } from "./icons/MdiCursorDefaultClick.tsx";
import { MdiCursorDefaultClickOutline } from "./icons/MdiCursorDefaultClickOutline.tsx";
import { useStore } from "../store.ts";

export function Pointer() {
  const mode = useStore((state) => state.mode);
  const setMode = useStore((state) => state.setMode);

  return (
    <div onClick={() => setMode("select")}>
      <div className={`icon-wrapper ${mode === "select" ? "active-icon" : ""}`}>
        {mode === "select" ? (
          <MdiCursorDefaultClick />
        ) : (
          <MdiCursorDefaultClickOutline />
        )}
      </div>
    </div>
  );
}
