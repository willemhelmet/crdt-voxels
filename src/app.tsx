import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Grid, OrbitControls, Sky } from "@react-three/drei";
import { Voxels } from "./components/voxels.tsx";
import { AutomergeUrl } from "@automerge/react";
import { Lighting } from "./components/lighting.tsx";
import { UI } from "./components/ui.tsx";

function App({ docUrl }: { docUrl: AutomergeUrl }) {
  return (
    <div className="App">
      <UI />
      <Canvas shadows className="webgl" camera={{ position: [5, 5, 5] }}>
        <OrbitControls /> <Lighting />
        <group position={[0.5, -0.5, 0.5]}>
          <Grid
            args={[10, 10]}
            position={[0, 0.01, 0]}
            cellColor={"#808080"}
            sectionColor={"#808080"}
          />
        </group>
        <Sky />
        <Voxels docUrl={docUrl} />
      </Canvas>
    </div>
  );
}

export default App;
