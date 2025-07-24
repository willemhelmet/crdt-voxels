import { create } from "zustand";

interface AppState {
  mode: "add" | "erase";
  color: string;
  setMode: (mode: "add" | "erase") => void;
  setColor: (color: string) => void;
}
export const useStore = create<AppState>((set) => ({
  mode: "add",
  color: "#ff0000",
  setMode: (mode) => set({ mode }),
  setColor: (color) => set({ color }),
}));
