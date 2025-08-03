import { Box } from "@react-three/drei";

export function PlayerAvatar({
  position,
  color,
  rotation,
}: {
  position: [number, number, number];
  color: string;
  rotation: number;
}) {
  return (
    <Box position={position} rotation={[0, rotation, 0]}>
      <meshStandardMaterial color={color} />
    </Box>
  );
}

