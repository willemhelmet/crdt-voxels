import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Grid, OrbitControls, Plane, Sky } from "@react-three/drei";
import { Voxels } from "./components/voxels.tsx";
import { AutomergeUrl } from "@automerge/react";

function App({ docUrl }: { docUrl: AutomergeUrl }) {
  return (
    <>
      <Canvas className="webgl" camera={{ position: [3, 3, 3] }}>
        <OrbitControls />
        <group position={[0.5, -0.5, 0.5]}>
          <Grid
            position={[0, 0.01, 0]}
            infiniteGrid={true}
            cellColor={"#808080"}
            sectionColor={"#808080"}
          />
          <Plane scale={[100, 100, 1]} rotation={[-Math.PI * 0.5, 0, 0]}>
            <meshBasicMaterial color={"#404040"} />
          </Plane>
        </group>

        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <Sky />

        <Voxels docUrl={docUrl} />
      </Canvas>
    </>
  );
}

export default App;
