import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CursorProps {
  position: [number, number, number];
  color: string;
}

const Cursor: React.FC<CursorProps> = ({ position, color }) => {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    if (ref.current) {
      ref.current.position.set(position[0], position[1], position[2]);
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default Cursor;
