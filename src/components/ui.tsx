import { Pencil } from "./pencil.tsx";
import { Eraser } from "./eraser.tsx";
import { useStore } from "../store.ts";

export function UI() {
  const setColor = useStore((state) => state.setColor);
  return (
    <>
      <div className={"ui"}>
        <div className={"button-bar"}>
          <Pencil />
          <Eraser />
          <input
            type="color"
            onChange={(e) => setColor(e.target.value)}
            style={{ width: "2em", height: "2em", borderRadius: "1em" }}
          />
        </div>
      </div>
    </>
  );
}
