import { MdiCursorDefaultClick } from "./icons/MdiCursorDefaultClick.tsx";
import { MdiCursorDefaultClickOutline } from "./icons/MdiCursorDefaultClickOutline.tsx";
import { useStore } from "../store.ts";

export function Pointer() {
  const myMode = useStore((state) => state.myMode);
  const setMyMode = useStore((state) => state.setMyMode);

  return (
    <div onClick={() => setMyMode("select")}>
      <div
        className={`icon-wrapper ${myMode === "select" ? "active-icon" : ""}`}
      >
        {myMode === "select" ? (
          <MdiCursorDefaultClick />
        ) : (
          <MdiCursorDefaultClickOutline />
        )}
      </div>
    </div>
  );
}
