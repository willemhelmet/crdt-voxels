import { Pencil } from "./pencil.tsx";
import { Eraser } from "./eraser.tsx";
import { Brush } from "./brush.tsx";
import { Dropper } from "./dropper.tsx";
import { Hand } from "./Hand.tsx";
import { Pointer } from "./Pointer.tsx";
import { Play } from "./play.tsx";
import { useStore } from "../store.ts";

export function UI() {
  const myColor = useStore((state) => state.myColor);
  const setMyColor = useStore((state) => state.setMyColor);
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
          <Play />
          <input
            type="color"
            value={myColor}
            onChange={(e) => setMyColor(e.target.value)}
            style={{ width: "2em", height: "2em", borderRadius: "1em" }}
          />
        </div>
      </div>
    </>
  );
}
