import { VoxelData, VoxelGrid } from "./components/voxels";

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
