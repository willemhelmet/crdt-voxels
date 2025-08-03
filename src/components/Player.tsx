import { CameraControls, KeyboardControls } from "@react-three/drei";
import BVHEcctrl from "bvhecctrl";
import { useEffect, useRef } from "react";
import { useStore } from "../store.ts";
import { useFrame, useThree } from "@react-three/fiber";

const keyboardMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
  { name: "rightward", keys: ["ArrowRight", "KeyD"] },
  { name: "jump", keys: ["Space"] },
  { name: "run", keys: ["Shift"] },
];

export function Player() {
  const { camera } = useThree();
  const view = useStore((state) => state.view);
  const setCameraPosition = useStore((state) => state.setCameraPosition);
  const cameraControlRef = useRef();
  const ecctrlRef = useRef();

  useEffect(() => {
    const cameraControls = cameraControlRef.current;
    if (!cameraControls) return;

    if (view === "first-person") {
      cameraControlRef.current?.lockPointer();
      setCameraPosition(camera.position.clone());
      cameraControls.dolly(cameraControls.distance - 0.02, true);
    } else if (view === "editor") {
      const { cameraPosition } = useStore.getState();
      if (cameraPosition) {
        cameraControls.setPosition(
          cameraPosition.x,
          cameraPosition.y,
          cameraPosition.z,
          true,
        );
        cameraControls.setTarget(0, 0, 0, true);
        setCameraPosition(null);
      }
    }
  }, [view, camera, setCameraPosition]);

  useFrame(() => {
    if (view === "first-person") {
      setCameraPosition(camera.position.clone());
    }

    if (cameraControlRef.current && ecctrlRef.current) {
      // For camera control to follow character
      if (view === "first-person" && ecctrlRef.current.group)
        cameraControlRef.current.moveTo(
          ecctrlRef.current.group.position.x,
          ecctrlRef.current.group.position.y + 0.3,
          ecctrlRef.current.group.position.z,
          true,
        );
      // Hide character model if camera is too close
      if (ecctrlRef.current.model)
        ecctrlRef.current.model.visible =
          cameraControlRef.current.distance > 0.7;
    }
    // Save player when they fall off the edge
    if (
      ecctrlRef.current?.group.position &&
      ecctrlRef.current.group.position.y < -50
    ) {
      ecctrlRef.current.paused = true;
      ecctrlRef.current.group.position.set(0, 1.2, 0);
      ecctrlRef.current.paused = false;
    }
  });
  return (
    <>
      <CameraControls makeDefault ref={cameraControlRef} />
      <KeyboardControls map={keyboardMap}>
        <BVHEcctrl ref={ecctrlRef} position={[0, 1.2, 0]} />
      </KeyboardControls>
    </>
  );
}
