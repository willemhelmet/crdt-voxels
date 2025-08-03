import { TransformControls } from "@react-three/drei";
import { useStore } from "../store";
import { useRef } from "react";
import { Vector3 } from "three";
import { useDocument } from "@automerge/react";

export function TransformControlsWrapper({ docUrl }) {
  const myMode = useStore((state) => state.myMode);
  const mySelected = useStore((state) => state.mySelected);
  const mySelectedIndex = useStore((state) => state.mySelectedIndex);

  const originalPos = useRef<Vector3>();
  const [, changeDoc] = useDocument(docUrl, {
    // This hooks the `useDocument` into reacts suspense infrastructure so the whole component
    // only renderes once the document is loaded
    suspense: true,
  });

  function mouseDown() {
    // console.log("down");
    originalPos.current = mySelected.position;
  }

  function mouseUp() {
    // console.log("up");
    if (originalPos.current) {
      changeDoc((d) => {
        d.voxels[mySelectedIndex].position = mySelected.position;
      });
    }
  }

  if (!mySelected || myMode !== "select") {
    return null;
  }

  return (
    <TransformControls
      object={mySelected}
      translationSnap={1}
      onMouseDown={mouseDown}
      onMouseUp={mouseUp}
    />
  );
}
