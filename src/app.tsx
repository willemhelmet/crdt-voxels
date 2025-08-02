import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Grid, Stats } from "@react-three/drei";
import { AutomergeUrl } from "@automerge/react";

import { Lighting } from "./components/lighting.tsx";
import { UI } from "./components/ui.tsx";
import { Voxels } from "./components/voxels.tsx";
import { TransformControlsWrapper } from "./components/TransformControlsWrapper.tsx";
import { Multiplayer } from "./components/Multiplayer.tsx";
import { useState, useEffect } from "react";
import { Player } from "./components/Player.tsx";
import { SocketManager } from "./components/SocketManager.tsx";
import { Joystick, VirtualButton } from "bvhecctrl";
import { useStore } from "./store.ts";

function App({ docUrl }: { docUrl: AutomergeUrl }) {
  const [positions, setPositions] = useState({});
  const [myId, setMyId] = useState<string | null>(null);
  const view = useStore((state) => state.view);
  const [isTouchScreen, setIsTouchScreen] = useState(false);

  useEffect(() => {
    // Check if using a touch control device, show/hide joystick
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      setIsTouchScreen(true);
    } else {
      setIsTouchScreen(false);
    }
  }, []);

  return (
    <div className="App">
      <Stats />
      <UI />
      {isTouchScreen && view === "first-person" && (
        <>
          <Joystick />

          <VirtualButton
            id="run"
            label="RUN"
            buttonWrapperStyle={{ right: "100px", bottom: "40px" }}
          />

          <VirtualButton
            id="jump"
            label="JUMP"
            buttonWrapperStyle={{ right: "40px", bottom: "100px" }}
          />
        </>
      )}
      <Canvas shadows className="webgl" camera={{ position: [5, 5, 5] }}>
        <Lighting />

        <SocketManager
          docUrl={docUrl}
          setPositions={setPositions}
          setMyId={setMyId}
        />

        <Grid
          args={[10, 10]}
          position={[0.5, -0.495, 0.5]}
          cellColor={"#808080"}
          sectionColor={"#808080"}
        />

        <Voxels docUrl={docUrl} />

        <Multiplayer positions={positions} myId={myId} />

        <TransformControlsWrapper docUrl={docUrl} />

        <Player />
      </Canvas>
    </div>
  );
}

export default App;
