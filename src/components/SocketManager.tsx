import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { io, Socket } from "socket.io-client";
import { useStore } from "../store";

interface SocketManagerProps {
  docUrl: string;
}

export function SocketManager({ docUrl }: SocketManagerProps) {
  const socketRef = useRef<Socket | null>(null);
  const { raycaster, scene } = useThree();
  const lastSent = useRef(0);
  const setPositions = useStore((state) => state.setPositions);
  const myId = useStore((state) => state.myId);
  const setMyId = useStore((state) => state.setMyId);
  const view = useStore((state) => state.view);
  const cameraPosition = useStore((state) => state.cameraPosition);
  const color = useStore((state) => state.color);

  useEffect(() => {
    const socket = io("http://localhost:3000");
    socketRef.current = socket;

    socket.on("connect", () => {
      // console.log("Connected to server");
      setMyId(socket.id!);
      socket.emit("join", docUrl);
    });

    socket.on("update", (positions) => {
      setPositions(positions);
    });

    return () => {
      // console.log("Disconnected from server");
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      socketRef.current = null;
    };
  }, [docUrl, setMyId, setPositions]);

  // Send view changes to the server
  useEffect(() => {
    if (socketRef.current && myId) {
      socketRef.current.emit("viewChange", { room: docUrl, view });
    }
  }, [view, docUrl, myId]);

  // Send color changes to the server
  useEffect(() => {
    if (socketRef.current && myId) {
      socketRef.current.emit("colorChange", { room: docUrl, color });
    }
  }, [color, docUrl, myId]);

  useFrame((_, delta) => {
    lastSent.current += delta;
    if (socketRef.current && lastSent.current > 1 / 60) {
      // Send at 60fps
      if (view === "first-person" && cameraPosition) {
        socketRef.current.emit("position", {
          room: docUrl,
          position: {
            x: cameraPosition.x,
            y: cameraPosition.y,
            z: cameraPosition.z,
          },
        });
      } else {
        const intersects = raycaster.intersectObjects(scene.children, true);
        if (intersects.length > 0) {
          const { x, y, z } = intersects[0].point;
          socketRef.current.emit("position", {
            room: docUrl,
            position: { x, y, z },
          });
        }
      }
      lastSent.current = 0;
    }
  });

  return null; // This component doesn't render anything
}
