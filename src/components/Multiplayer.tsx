import Cursor from "./Cursor";
import { useStore } from "../store";
import { PlayerAvatar } from "./PlayerAvatar";

export function Multiplayer() {
  const positions = useStore((state) => state.positions);
  const myId = useStore((state) => state.myId);

  return (
    <>
      {Object.entries(positions).map(([id, { position, view, color }]) => {
        if (id === myId || !position) return null; // Don't render my own player or if position is missing

        if (view === "first-person") {
          return (
            <PlayerAvatar
              key={id}
              position={[position.x, position.y, position.z]}
              color={color}
            />
          );
        }

        return (
          <Cursor
            key={id}
            position={[position.x, position.y, position.z]}
            color={color}
          />
        );
      })}
    </>
  );
}
