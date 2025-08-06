import { type AutomergeUrl, useDocument } from "@automerge/react";
import { Instance, Instances } from "@react-three/drei";
import { useState } from "react";
import { useStore } from "../store.ts";
import { ThreeEvent } from "@react-three/fiber";
import { Mesh, MeshStandardMaterial } from "three";

export interface VoxelData {
  position: { x: number; y: number; z: number };
  color: string;
}

export interface VoxelGrid {
  voxels: VoxelData[];
}

export const Voxels: React.FC<{ docUrl: AutomergeUrl }> = ({ docUrl }) => {
  const [doc, changeDoc] = useDocument<VoxelGrid>(docUrl, { suspense: true });
  const myColor = useStore((state) => state.myColor);
  const setMyColor = useStore((state) => state.setMyColor);
  const myMode = useStore((state) => state.myMode);
  const setMySelected = useStore((state) => state.setMySelected);
  const setMySelectedIndex = useStore((state) => state.setMySelectedIndex);

  const [ghost, setGhost] = useState<{
    position: [number, number, number];
    visible: boolean;
  }>({ position: [0, 0, 0], visible: false });

  const handlePointerDown = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (!e.instanceId || !doc) return;

    const index = e.instanceId;
    const voxel = doc.voxels[index];
    if (!voxel) return;

    const { position } = voxel;

    if (myMode === "add") {
      if (!e.face) return;
      const newPos = {
        x: e.face.normal.x + position.x,
        y: e.face.normal.y + position.y,
        z: e.face.normal.z + position.z,
      };
      changeDoc((d) => d.voxels.push({ position: newPos, color: myColor }));
    } else if (myMode === "erase") {
      changeDoc((d) => {
        d.voxels.splice(index, 1);
        setMySelected(null);
      });
    } else if (myMode === "paint") {
      changeDoc((d) => {
        d.voxels[index].color = myColor;
      });
    } else if (myMode === "dropper") {
      const mesh = e.object as Mesh;
      const material = mesh.material as MeshStandardMaterial;
      const hexColor = "#" + material.color.getHexString();
      setMyColor(hexColor);
    } else if (myMode === "select") {
      setMySelectedIndex(index);
    }
  };

  const handlePointerMove = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (!e.instanceId || !doc) return;
    if (!e.face) return;

    const index = e.instanceId;
    const voxel = doc.voxels[index];
    if (!voxel) return;

    const { position } = voxel;
    const norm = e.face.normal;

    setGhost({
      position: [
        norm.x + position.x,
        norm.y + position.y,
        norm.z + position.z,
      ],
      visible: true,
    });
  };

  const handlePointerOut = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    setGhost({ ...ghost, visible: false });
  };

  return (
    <>
      <Instances
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerOut={handlePointerOut}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial metalness={0} roughness={1} />
        {doc?.voxels?.map(({ position, color }: VoxelData, index: number) => (
          <Instance
            key={index}
            color={color}
            position={[position.x, position.y, position.z]}
          />
        ))}
      </Instances>
      {ghost.visible && myMode === "add" && (
        <mesh position={ghost.position}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color="white" transparent opacity={0.3} />
        </mesh>
      )}
    </>
  );
};
