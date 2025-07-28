import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface PlayerProps {
  position: [number, number, number];
}

const Player: React.FC<PlayerProps> = ({ position }) => {
  const ref = useRef<THREE.Mesh>(null!);

  // Lerp the position for smooth movement
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.position.lerp(new THREE.Vector3(...position), delta * 10);
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.1, 12, 12]} />
      <meshStandardMaterial color="royalblue" />
    </mesh>
  );
};

export default Player;
