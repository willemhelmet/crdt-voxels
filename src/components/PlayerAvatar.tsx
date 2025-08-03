import { Box } from "@react-three/drei";

export function PlayerAvatar({
  position,
  color,
}: {
  position: [number, number, number];
  color: string;
}) {
  return (
    <Box position={position}>
      <meshStandardMaterial color={color} />
    </Box>
  );
}

