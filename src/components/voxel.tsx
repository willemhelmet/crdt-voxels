import { Box } from "@react-three/drei";
import { type AutomergeUrl, useDocument } from "@automerge/react";
import { useState, useRef } from "react";
import { useStore } from "../store.ts";
import { Group } from "three";
import { StaticCollider } from "bvhecctrl";

interface VoxelProps {
  position: { x: number; y: number; z: number };
  color: string;
  name: string;
  docUrl: AutomergeUrl;
}

export const Voxel = ({ position, color, name, docUrl }: VoxelProps) => {
  const [newVoxelPos, setNewVoxelPos] = useState({ x: 0, y: 0, z: 0 });
  const [ghostOffset, setGhostOffset] = useState([0, 0, 0]);
  const [showGhost, setShowGhost] = useState(false);
  const myColor = useStore((state) => state.myColor);
  const setMyColor = useStore((state) => state.setMyColor);
  const mySelected = useStore((state) => state.mySelected);
  const setMySelected = useStore((state) => state.setMySelected);
  const setMySelectedIndex = useStore((state) => state.setMySelectedIndex);
  const ref = useRef<Group>(null!);
  const [doc, changeDoc] = useDocument(docUrl, {
    // This hooks the `useDocument` into reacts suspense infrastructure so the whole component
    // only renderes once the document is loaded
    suspense: true,
  });
  const myMode = useStore((state) => state.myMode);

  function onClick(e: any) {
    e.stopPropagation();
    if (myMode === "add") {
      changeDoc((d: any) =>
        d.voxels.push({
          position: newVoxelPos,
          color: myColor,
        }),
      );
    } else if (myMode === "erase") {
      changeDoc((d: any) => {
        const indexToRemove = d.voxels.findIndex(
          (v: any) =>
            v.position.x === position.x &&
            v.position.y === position.y &&
            v.position.z === position.z,
        );
        if (indexToRemove !== -1) {
          d.voxels.splice(indexToRemove, 1);
          if (mySelected) {
            setMySelected(null);
          }
        }
      });
    } else if (myMode === "paint") {
      changeDoc((d: any) => {
        const indexToEdit = d.voxels.findIndex(
          (v: any) =>
            v.position.x === position.x &&
            v.position.y === position.y &&
            v.position.z === position.z,
        );
        if (indexToEdit !== -1) {
          d.voxels[indexToEdit].color = myColor;
        }
      });
    } else if (myMode === "dropper") {
      const hexColor = "#" + e.object.material.color.getHexString();
      setMyColor(hexColor);
    } else if (myMode === "select") {
      setMySelected(ref.current);
      const index = (doc as any).voxels.findIndex(
        (v: any) =>
          v.position.x === position.x &&
          v.position.y === position.y &&
          v.position.z === position.z,
      );
      setMySelectedIndex(index);
    } else if (myMode === "move") {
      // TODO: Implement move mode logic
    }
  }

  function onHover(e: any) {
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

    if (myMode === "paint") {
      e.object.material.color.set(myColor);
    }
  }

  function onPointerOut(e: any) {
    e.stopPropagation();
    setShowGhost(false);
    if (myMode === "paint") {
      e.object.material.color.set(myColor);
    }
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
      {showGhost && myMode == "add" && (
        <mesh position={ghostOffset as [number, number, number]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color="white" transparent opacity={0.3} />
        </mesh>
      )}
    </group>
  );
};
