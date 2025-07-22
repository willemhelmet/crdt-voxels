import { Box } from "@react-three/drei";
import { AutomergeUrl, useDocument } from "@automerge/react";

export interface VoxelData {
  position: [number, number, number];
  color: [number, number, number];
}

export interface VoxelGrid {
  voxels: VoxelData[];
}

export function initVoxelGrid(): VoxelGrid {
  return {
    voxels: [
      {
        position: [1, 0, 0],
        color: [1, 0, 0],
      },
      {
        position: [0, 1, 0],
        color: [0, 1, 0],
      },
      {
        position: [0, 0, 1],
        color: [0, 0, 1],
      },
    ],
  };
}

export const Voxels: React.FC<{ docUrl: AutomergeUrl }> = ({ docUrl }) => {
  const [doc, changeDoc] = useDocument(docUrl, {
    // This hooks the `useDocument` into reacts suspense infrastructure so the whole component
    // only renderes once the document is loaded
    suspense: true,
  });
  console.log(doc);
  return (
    <>
      {doc &&
        doc.voxels?.map(({ position, color }) => (
          <group position={position} key={position.join("-")}>
            <Box args={[1, 1, 1]}>
              <meshStandardMaterial color={color} />
            </Box>
          </group>
        ))}
    </>
  );
};
