import { AutomergeUrl, useDocument } from "@automerge/react";
import { Voxel } from "./voxel.tsx";

export interface VoxelData {
  position: { x: number; y: number; z: number };
  color: string;
}

export interface VoxelGrid {
  voxels: VoxelData[];
}

export function initVoxelGrid(): VoxelGrid {
  const voxels: VoxelData[] = [];
  const gridSize = 10;
  // The color is dark-grey, matching the plane in App.tsx (#404040)
  const color = "#404040";

  for (let x = 0 - gridSize / 2; x < gridSize - gridSize / 2; x++) {
    for (let z = 0 - gridSize / 2; z < gridSize - gridSize / 2; z++) {
      voxels.push({
        position: { x: x + 1, y: -1, z: z + 1 },
        color: color,
      });
    }
  }

  return { voxels };
}

export const Voxels: React.FC<{ docUrl: AutomergeUrl }> = ({ docUrl }) => {
  const [doc] = useDocument(docUrl, {
    // This hooks the `useDocument` into reacts suspense infrastructure so the whole component
    // only renderes once the document is loaded
    suspense: true,
  });

  return (
    <>
      {doc &&
        doc.voxels?.map(({ position, color }, index) => (
          <Voxel
            position={position}
            color={color}
            key={index}
            name={`box-${index}`}
            docUrl={docUrl}
          />
        ))}
    </>
  );
};
