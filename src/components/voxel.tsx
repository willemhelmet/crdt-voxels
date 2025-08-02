import { Box } from "@react-three/drei";
import { useDocument } from "@automerge/react";
import { useState, useRef } from "react";
import { useStore } from "../store.ts";
import { Group } from "three";
import { StaticCollider } from "bvhecctrl";

export const Voxel = ({ position, color, name, docUrl }) => {
  const [newVoxelPos, setNewVoxelPos] = useState({ x: 0, y: 0, z: 0 });
  const [ghostOffset, setGhostOffset] = useState([0, 0, 0]);
  const [showGhost, setShowGhost] = useState(false);
  const storeColor = useStore((state) => state.color);
  const setColor = useStore((state) => state.setColor);
  const selected = useStore((state) => state.selected);
  const setSelecterd = useStore((state) => state.setSelected);
  const setSelected = useStore((state) => state.setSelected);
  const setSelectedIndex = useStore((state) => state.setSelectedIndex);
  const ref = useRef<Group>(null!);

  const [doc, changeDoc] = useDocument(docUrl, {
    // This hooks the `useDocument` into reacts suspense infrastructure so the whole component
    // only renderes once the document is loaded
    suspense: true,
  });
  const mode = useStore((state) => state.mode);

  function onClick(e) {
    e.stopPropagation();
    if (mode === "add") {
      changeDoc((d) =>
        d.voxels.push({
          position: newVoxelPos,
          color: storeColor,
        }),
      );
    } else if (mode === "erase") {
      changeDoc((d) => {
        const indexToRemove = d.voxels.findIndex(
          (v) =>
            v.position.x === position.x &&
            v.position.y === position.y &&
            v.position.z === position.z,
        );
        if (indexToRemove !== -1) {
          d.voxels.splice(indexToRemove, 1);
          if (selected) {
            setSelected(null);
          }
        }
      });
    } else if (mode === "paint") {
      changeDoc((d) => {
        const indexToEdit = d.voxels.findIndex(
          (v) =>
            v.position.x === position.x &&
            v.position.y === position.y &&
            v.position.z === position.z,
        );
        if (indexToEdit !== -1) {
          d.voxels[indexToEdit].color = storeColor;
        }
      });
    } else if (mode === "dropper") {
      const hexColor = "#" + e.object.material.color.getHexString();
      setColor(hexColor);
    } else if (mode === "select") {
      setSelected(ref.current);
      const index = doc.voxels.findIndex(
        (v) =>
          v.position.x === position.x &&
          v.position.y === position.y &&
          v.position.z === position.z,
      );
      setSelectedIndex(index);
    } else if (mode === "move") {
      // TODO: Implement move mode logic
    }
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
      x: norm.x + position.x,
      y: norm.y + position.y,
      z: norm.z + position.z,
    };
    setNewVoxelPos(newPos);
  }

  function onPointerOut(e) {
    e.stopPropagation();
    setShowGhost(false);
  }

  return (
    <group ref={ref} position={[position.x, position.y, position.z]}>
      <StaticCollider>
        <Box
          args={[1, 1, 1]}
          onPointerDown={onClick}
          onPointerMove={onHover}
          onPointerOut={onPointerOut}
          name={name}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial metalness={0} roughness={1} color={color} />
        </Box>
      </StaticCollider>
      {showGhost && mode == "add" && (
        <mesh position={ghostOffset}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color="white" transparent opacity={0.3} />
        </mesh>
      )}
    </group>
  );
};
