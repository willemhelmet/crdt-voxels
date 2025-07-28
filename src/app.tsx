import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Grid, OrbitControls } from "@react-three/drei";
import { AutomergeUrl } from "@automerge/react";
import { Lighting } from "./components/lighting.tsx";
import { UI } from "./components/ui.tsx";
import { Voxels } from "./components/voxels.tsx";
import { Transform } from "./components/Transform.tsx";
import SocketManager from "./components/SocketManager.tsx";
import Players from "./components/Players.tsx";
import { useState } from "react";

function App({ docUrl }: { docUrl: AutomergeUrl }) {
  const [positions, setPositions] = useState({});
  const [myId, setMyId] = useState<string | null>(null);

  return (
    <div className="App">
      <UI />
      <Canvas shadows className="webgl" camera={{ position: [5, 5, 5] }}>
        <SocketManager
          docUrl={docUrl}
          setPositions={setPositions}
          setMyId={setMyId}
        />
        <Lighting />
        <Grid
          args={[10, 10]}
          position={[0.5, -0.495, 0.5]}
          cellColor={"#808080"}
          sectionColor={"#808080"}
        />
        <Voxels docUrl={docUrl} />
        <Players positions={positions} myId={myId} />
        <OrbitControls
          makeDefault
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 1.75}
        />
        <Transform docUrl={docUrl} />
      </Canvas>
    </div>
  );
}

export default App;
