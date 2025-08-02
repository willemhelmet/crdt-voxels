import { TransformControls } from "@react-three/drei";
import { useStore } from "../store";
import { useRef } from "react";
import { Vector3 } from "three";
import { useDocument } from "@automerge/react";

export function TransformControlsWrapper({ docUrl }) {
  const mode = useStore((state) => state.mode);
  const selected = useStore((state) => state.selected);
  const selectedIndex = useStore((state) => state.selectedIndex);

  const originalPos = useRef<Vector3>();
  const [, changeDoc] = useDocument(docUrl, {
    // This hooks the `useDocument` into reacts suspense infrastructure so the whole component
    // only renderes once the document is loaded
    suspense: true,
  });

  function mouseDown() {
    // console.log("down");
    originalPos.current = selected.position;
  }

  function mouseUp() {
    // console.log("up");
    if (originalPos.current) {
      changeDoc((d) => {
        d.voxels[selectedIndex].position = selected.position;
      });
    }
  }

  if (!selected || mode !== "select") {
    return null;
  }

  return (
    <TransformControls
      object={selected}
      translationSnap={1}
      onMouseDown={mouseDown}
      onMouseUp={mouseUp}
    />
  );
}
