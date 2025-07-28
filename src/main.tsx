import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  DocHandle,
  Repo,
  isValidAutomergeUrl,
  RepoContext,
  IndexedDBStorageAdapter,
  WebSocketClientAdapter,
} from "@automerge/react";
import { io } from "socket.io-client";

const repo = new Repo({
  network: [new WebSocketClientAdapter("wss://sync.automerge.org")],
  storage: new IndexedDBStorageAdapter(),
});

const root = document.getElementById("root")!;

async function main() {
  let handle: DocHandle<any>;
  const locationHash = document.location.hash.substring(1);
  if (isValidAutomergeUrl(locationHash)) {
    handle = await repo.find(locationHash);
  } else {
    handle = repo.create();
    document.location.hash = handle.url;
  }

  const socket = io("http://localhost:3000");

  socket.on("connect", () => {
    console.log("Connected to server");
    socket.emit("join", handle.url);
  });

  socket.on("update", (positions) => {
    console.log("Received positions:", positions);
    // Handle the received positions here
  });

  setInterval(() => {
    // Replace with actual position data
    const position = { x: Math.random(), y: Math.random(), z: Math.random() };
    socket.emit("position", { room: handle.url, position });
  }, 1000);

  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <RepoContext.Provider value={repo}>
        <App docUrl={handle.url} />
      </RepoContext.Provider>
    </React.StrictMode>,
  );
}

main();
