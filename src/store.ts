import { create } from "zustand";
import { Object3D } from "three";

interface AppState {
  mode: "add" | "erase" | "paint" | "dropper" | "select" | "move";
  color: string;
  selected: Object3D | null;
  selectedIndex: number | null;
  setMode: (
    mode: "add" | "erase" | "paint" | "dropper" | "select" | "move",
  ) => void;
  setColor: (color: string) => void;
  setSelected: (selected: Object3D | null) => void;
  setSelectedIndex: (selectedIndex: number | null) => void;
}
export const useStore = create<AppState>((set) => ({
  mode: "add",
  color: "#ff0000",
  selected: null,
  selectedIndex: null,
  setMode: (mode) => set({ mode }),
  setColor: (color) => set({ color }),
  setSelected: (selected) => set({ selected }),
  setSelectedIndex: (selectedIndex) => set({ selectedIndex }),
}));
