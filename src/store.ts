import { create } from "zustand";
import { Object3D, Vector3 } from "three";

type Mode = "add" | "erase" | "paint" | "dropper" | "select" | "move";
type View = "editor" | "first-person";

interface AppState {
  mode: Mode;
  view: View;
  color: string;
  selected: Object3D | null;
  selectedIndex: number | null;
  cameraPosition: Vector3 | null;
  positions: {
    [id: string]: {
      position: { x: number; y: number; z: number };
      view: View;
      color: string;
    };
  };
  myId: string | null;
  setMode: (mode: Mode) => void;
  setView: (view: View) => void;
  setColor: (color: string) => void;
  setSelected: (selected: Object3D | null) => void;
  setSelectedIndex: (selectedIndex: number | null) => void;
  setCameraPosition: (cameraPosition: Vector3 | null) => void;
  setPositions: (positions: {
    [id: string]: {
      position: { x: number; y: number; z: number };
      view: View;
      color: string;
    };
  }) => void;
  setMyId: (myId: string | null) => void;
}
export const useStore = create<AppState>((set) => ({
  mode: "move",
  view: "editor",
  color: "#ff0000",
  selected: null,
  selectedIndex: null,
  cameraPosition: null,
  positions: {},
  myId: null,
  setMode: (mode) => set({ mode }),
  setView: (view) => set({ view }),
  setColor: (color) => set({ color }),
  setSelected: (selected) => set({ selected }),
  setSelectedIndex: (selectedIndex) => set({ selectedIndex }),
  setCameraPosition: (cameraPosition) => set({ cameraPosition }),
  setPositions: (positions) => set({ positions }),
  setMyId: (myId) => set({ myId }),
}));
