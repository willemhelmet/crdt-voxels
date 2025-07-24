import { Box } from "@react-three/drei";
import { useDocument } from "@automerge/react";
import { useState } from "react";
import { useStore } from "../store.ts";

export const Voxel = ({ position, color, name, docUrl }) => {
  const [newVoxelPos, setNewVoxelPos] = useState([0, 0, 0]);
  const [ghostOffset, setGhostOffset] = useState([0, 0, 0]);
  const [showGhost, setShowGhost] = useState(false);
  const storeColor = useStore((state) => state.color);
  const [doc, changeDoc] = useDocument(docUrl, {
    // This hooks the `useDocument` into reacts suspense infrastructure so the whole component
    // only renderes once the document is loaded
    suspense: true,
  });

  function onClick(e) {
    e.stopPropagation();
    changeDoc((d) =>
      d.voxels.push({
        position: newVoxelPos,
        color: storeColor,
      }),
    );
  }

  function onHover(e) {
    e.stopPropagation();
    const norm = e.face.normal;

    // For the ghost preview
    setGhostOffset([norm.x, norm.y, norm.z]);
    setShowGhost(true);

    // For creating the new voxel on click
    // `position` is the position of the group, which is the world position of this voxel.
    const newPos = {
      x: norm.x + position[0],
      y: norm.y + position[1],
      z: norm.z + position[2],
    };
    setNewVoxelPos([newPos.x, newPos.y, newPos.z]);
  }

  function onPointerOut(e) {
    e.stopPropagation();
    setShowGhost(false);
  }

  return (
    <group position={position}>
      <Box
        args={[1, 1, 1]}
        onPointerDown={onClick}
        onPointerMove={onHover}
        onPointerOut={onPointerOut}
        name={name}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={color} />
      </Box>
      {showGhost && (
        <Box position={ghostOffset} args={[1, 1, 1]}>
          <meshStandardMaterial color="white" transparent opacity={0.3} />
        </Box>
      )}
    </group>
  );
};
