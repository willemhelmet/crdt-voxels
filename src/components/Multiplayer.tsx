import Cursor from "./Cursor";

interface MultiplayerProps {
  positions: { [id: string]: { x: number; y: number; z: number } };
  myId: string | null;
}

export function Multiplayer({ positions, myId }: MultiplayerProps) {
  return (
    <>
      {Object.entries(positions).map(([id, { x, y, z }]) => {
        if (id === myId) return null; // Don't render my own player
        return <Cursor key={id} position={[x, y, z]} />;
      })}
    </>
  );
}
