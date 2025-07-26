# Gemini Code Understanding

This document provides a high-level overview of the project structure, key components, and functionality based on the contents of the `src` directory.

## Project Overview

This is a collaborative 3D voxel editor built with React and Three.js. It allows multiple users to edit a shared 3D space in real-time. The application uses Automerge for state synchronization, Zustand for client-side state management, and react-three-fiber for rendering the 3D scene.

## Core Technologies

- **React:** The core UI library.
- **TypeScript:** For static typing.
- **Three.js / react-three-fiber:** For creating and managing the 3D scene and objects.
- **Automerge:** For handling real-time collaboration and data synchronization.
- **Zustand:** For managing global application state, such as the current editing mode and selected color.

## File Breakdown

### `src/`

- **`main.tsx`**: The entry point of the application. It initializes the Automerge repository, sets up the WebSocket connection for synchronization, and renders the main `App` component. It also handles loading or creating the Automerge document based on the URL hash.

- **`App.tsx`**: The root component of the application. It sets up the main layout, including the Three.js `Canvas` and the `UI` components. It passes the Automerge document URL to the `Voxels` component.

- **`store.ts`**: Defines the global state management using Zustand. It manages the application's current `mode` (e.g., 'add', 'erase', 'paint'), the selected `color`, and the currently `selected` object in the 3D scene.

- **`App.css` & `index.css`**: Provide the styling for the application. `App.css` contains styles for the main layout, UI elements, and the 3D canvas. `index.css` is currently empty.

### `src/components/`

This directory contains the reusable React components that make up the application's UI and 3D scene.

- **`ui.tsx`**: Renders the main user interface, which includes the toolbar with different editing tools. It allows the user to switch between modes and select a color.

- **`voxels.tsx`**: This component is responsible for rendering the grid of voxels. It uses the `useDocument` hook from Automerge to subscribe to changes in the shared document and renders a `Voxel` component for each item in the `voxels` array. It also includes the `initVoxelGrid` function to create an initial empty grid.

- **`voxel.tsx`**: Represents a single voxel (a cube) in the 3D scene. This component handles all user interactions with a voxel, such as clicking to add, erase, or paint it. It also shows a "ghost" preview of where a new voxel will be placed. The interaction logic changes based on the current `mode` from the Zustand store.

- **`lighting.tsx`**: Sets up the lighting for the 3D scene, including ambient light, spotlights, and a skybox. This component uses helpers from `@react-three/drei`.

- **Tool Components (`pencil.tsx`, `eraser.tsx`, `brush.tsx`, `dropper.tsx`, `Hand.tsx`, `Pointer.tsx`)**: These components represent the different tools in the UI toolbar. Each component allows the user to switch to a specific mode (`add`, `erase`, `paint`, `dropper`, `move`, `select`) by calling the `setMode` function from the Zustand store. They also visually indicate the currently active mode.

### `src/components/icons/`

This directory contains a set of SVG icon components used in the UI, primarily for the toolbar buttons. Each icon has two variants: a filled version for the active state and an outline version for the inactive state.
