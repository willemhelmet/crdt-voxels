import { Pencil } from "./pencil.tsx";
import { Eraser } from "./eraser.tsx";
import { Brush } from "./brush.tsx";
import { Dropper } from "./dropper.tsx";
import { Hand } from "./Hand.tsx";
import { Pointer } from "./Pointer.tsx";
import { useStore } from "../store.ts";

export function UI() {
  const color = useStore((state) => state.color);
  const setColor = useStore((state) => state.setColor);
  return (
    <>
      <div className={"ui"}>
        <div className={"button-bar"}>
          <Hand />
          <Pointer />
          <Pencil />
          <Eraser />
          <Brush />
          <Dropper />
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            style={{ width: "2em", height: "2em", borderRadius: "1em" }}
          />
        </div>
      </div>
    </>
  );
}
