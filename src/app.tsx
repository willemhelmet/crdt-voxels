// css
import "./App.css";

// lib
import { Canvas } from "@react-three/fiber";
import { Grid, OrbitControls } from "@react-three/drei";

// components
import { Voxels } from "./components/voxels.tsx";
import { AutomergeUrl } from "@automerge/react";
import { Lighting } from "./components/lighting.tsx";
import { UI } from "./components/ui.tsx";
import { Transform } from "./components/Transform.tsx";

function App({ docUrl }: { docUrl: AutomergeUrl }) {
  return (
    <div className="App">
      <UI />
      <Canvas shadows className="webgl" camera={{ position: [5, 5, 5] }}>
        <Lighting />
        <Grid
          args={[10, 10]}
          position={[0.5, -0.495, 0.5]}
          cellColor={"#808080"}
          sectionColor={"#808080"}
        />
        <Voxels docUrl={docUrl} />
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
