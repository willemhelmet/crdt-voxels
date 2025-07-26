import { Environment, Sky } from "@react-three/drei";

export function Lighting() {
  return (
    <>
      <Environment preset={"warehouse"} />
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.5}
        penumbra={1}
        decay={0}
        castShadow
        intensity={Math.PI}
      />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <Sky />
    </>
  );
}
