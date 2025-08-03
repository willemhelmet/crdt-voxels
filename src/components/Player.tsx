import { CameraControls, KeyboardControls } from "@react-three/drei";
import BVHEcctrl, { type BVHEcctrlApi } from "bvhecctrl";
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
  const myView = useStore((state) => state.myView);
  const setMyCameraPosition = useStore((state) => state.setMyCameraPosition);
  const setMyRotation = useStore((state) => state.setMyRotation);
  const cameraControlRef = useRef<CameraControls>(null);
  const ecctrlRef = useRef<BVHEcctrlApi>(null);

  useEffect(() => {
    const cameraControls = cameraControlRef.current;
    if (!cameraControls) return;

    if (myView === "first-person") {
      cameraControls.lockPointer();
      setMyCameraPosition(camera.position.clone());
      cameraControls.dolly(cameraControls.distance - 0.02, true);
    } else if (myView === "editor") {
      const { myCameraPosition } = useStore.getState();
      if (myCameraPosition) {
        cameraControls.setPosition(
          myCameraPosition.x,
          myCameraPosition.y,
          myCameraPosition.z,
          true,
        );
        cameraControls.setTarget(0, 0, 0, true);
        setMyCameraPosition(null);
      }
    }
  }, [myView, camera, setMyCameraPosition]);

  useFrame(() => {
    if (myView === "first-person") {
      setMyCameraPosition(camera.position.clone());
      const yRotation = camera.rotation.y;
      setMyRotation(yRotation);
    }

    if (cameraControlRef.current && ecctrlRef.current) {
      // For camera control to follow character
      if (myView === "first-person" && ecctrlRef.current.group)
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
      ecctrlRef.current?.group?.position &&
      ecctrlRef.current.group.position.y < -20
    ) {
      ecctrlRef.current.group.position.set(0, 1.2, 0);
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
