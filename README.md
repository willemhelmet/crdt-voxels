# 3D Voxel Editor

### **LIVE DEMO COMING SOON (EARLY AUGUST)**

This is a collaborative 3D voxel editor built with React and Three.js. It allows multiple users to edit a shared 3D space in real-time.

## Features

- Real-time collaboration with other users
- Add, erase, and paint voxels
- Move the camera and select objects
- Synced state with Automerge
- 3D rendering with Three.js and react-three-fiber

## Technologies

- React
- TypeScript
- Vite
- Three.js / react-three-fiber
- Automerge
- Zustand
- Socket.io

## Getting Started

To get started, clone the repository and install the dependencies:

```bash
git clone https://github.com/your-username/three-automerge.git
cd three-automerge
npm install
```

Then, start the development server:

```bash
npm run dev
```

This will start the Vite development server and you can view the application in your browser at `http://localhost:5173`.

## How it Works

The application uses a client-server architecture to enable real-time collaboration. The server is a simple Express server with Socket.io that manages the Automerge document and broadcasts changes to all connected clients.

The client is a React application that uses react-three-fiber to render the 3D scene. It uses Zustand for client-side state management and the `@automerge/react` hook to sync the local state with the server.
