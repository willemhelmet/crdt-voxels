import { create } from "zustand";
import { Object3D, Vector3 } from "three";

type Mode = "add" | "erase" | "paint" | "dropper" | "select" | "move";
type View = "editor" | "first-person";

interface AppState {
  myMode: Mode;
  myView: View;
  myColor: string;
  mySelected: Object3D | null;
  mySelectedIndex: number | null;
  myCameraPosition: Vector3 | null;
  myRotation: number;
  positions: {
    [id: string]: {
      position: { x: number; y: number; z: number };
      view: View;
      color: string;
      rotation: number;
    };
  };
  myId: string | null;
  setMyMode: (mode: Mode) => void;
  setMyView: (view: View) => void;
  setMyColor: (color: string) => void;
  setMySelected: (selected: Object3D | null) => void;
  setMySelectedIndex: (selectedIndex: number | null) => void;
  setMyCameraPosition: (cameraPosition: Vector3 | null) => void;
  setMyRotation: (rotation: number) => void;
  setPositions: (positions: {
    [id: string]: {
      position: { x: number; y: number; z: number };
      view: View;
      color: string;
      rotation: number;
    };
  }) => void;
  setMyId: (myId: string | null) => void;
}
export const useStore = create<AppState>((set) => ({
  myMode: "move",
  myView: "editor",
  myColor: "#ff0000",
  mySelected: null,
  mySelectedIndex: null,
  myCameraPosition: null,
  myRotation: 0,
  positions: {},
  myId: null,
  setMyMode: (myMode) => set({ myMode }),
  setMyView: (myView) => set({ myView }),
  setMyColor: (myColor) => set({ myColor }),
  setMySelected: (mySelected) => set({ mySelected }),
  setMySelectedIndex: (mySelectedIndex) => set({ mySelectedIndex }),
  setMyCameraPosition: (myCameraPosition) => set({ myCameraPosition }),
  setMyRotation: (myRotation) => set({ myRotation }),
  setPositions: (positions) => set({ positions }),
  setMyId: (myId) => set({ myId }),
}));
