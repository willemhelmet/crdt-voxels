import React from "react";
import Player from "./Player";

interface PlayersProps {
  positions: { [id: string]: { x: number; y: number; z: number } };
  myId: string | null;
}

const Players: React.FC<PlayersProps> = ({ positions, myId }) => {
  return (
    <>
      {Object.entries(positions).map(([id, { x, y, z }]) => {
        if (id === myId) return null; // Don't render my own player
        return <Player key={id} position={[x, y, z]} />;
      })}
    </>
  );
};

export default Players;
