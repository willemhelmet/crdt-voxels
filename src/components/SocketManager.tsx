import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { io, Socket } from "socket.io-client";

interface SocketManagerProps {
  docUrl: string;
  setPositions: (positions: {
    [id: string]: { x: number; y: number; z: number };
  }) => void;
  setMyId: (id: string) => void;
}

const SocketManager: React.FC<SocketManagerProps> = ({
  docUrl,
  setPositions,
  setMyId,
}) => {
  const socketRef = useRef<Socket | null>(null);
  const { raycaster, scene } = useThree();
  const lastSent = useRef(0);

  useEffect(() => {
    const socket = io("http://localhost:3000");
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Connected to server");
      setMyId(socket.id!);
      socket.emit("join", docUrl);
    });

    socket.on("update", (positions) => {
      setPositions(positions);
    });

    return () => {
      console.log("Disconnected from server");
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      socketRef.current = null;
    };
  }, [docUrl, setMyId, setPositions]);

  useFrame((_, delta) => {
    lastSent.current += delta;
    if (socketRef.current && lastSent.current > 1 / 60) {
      // Send at 60fps
      const intersects = raycaster.intersectObjects(scene.children, true);
      if (intersects.length > 0) {
        const { x, y, z } = intersects[0].point;
        socketRef.current.emit("position", {
          room: docUrl,
          position: { x, y, z },
        });
      }
      lastSent.current = 0;
    }
  });

  return null; // This component doesn't render anything
};

export default SocketManager;
