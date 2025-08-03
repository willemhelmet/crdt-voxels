import { TransformControls } from "@react-three/drei";
import { useStore } from "../store";
import { useRef } from "react";
import { Vector3 } from "three";
import { type AutomergeUrl, useDocument } from "@automerge/react";
import { type VoxelGrid } from "./voxels.tsx";

interface TransformControlsWrapperProps {
  docUrl: AutomergeUrl;
}

export function TransformControlsWrapper({
  docUrl,
}: TransformControlsWrapperProps) {
  const myMode = useStore((state) => state.myMode);
  const mySelected = useStore((state) => state.mySelected);
  const mySelectedIndex = useStore((state) => state.mySelectedIndex);

  const originalPos = useRef<Vector3>(new Vector3());
  const [, changeDoc] = useDocument<VoxelGrid>(docUrl, {
    // This hooks the `useDocument` into reacts suspense infrastructure so the whole component
    // only renderes once the document is loaded
    suspense: true,
  });

  function mouseDown() {
    if (mySelected) {
      originalPos.current = mySelected.position.clone();
    }
  }

  function mouseUp() {
    if (originalPos.current && mySelected && mySelectedIndex !== null) {
      changeDoc((d) => {
        d.voxels[mySelectedIndex].position = {
          x: mySelected.position.x,
          y: mySelected.position.y,
          z: mySelected.position.z,
        };
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
