import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.tsx";
import "./index.css";
import {
  DocHandle,
  Repo,
  isValidAutomergeUrl,
  RepoContext,
  IndexedDBStorageAdapter,
  WebSocketClientAdapter,
} from "@automerge/react";
import { type VoxelGrid, initVoxelGrid } from "./components/voxels.tsx";

const repo = new Repo({
  network: [new WebSocketClientAdapter("wss://sync.automerge.org")],
  storage: new IndexedDBStorageAdapter(),
});

const root = document.getElementById("root")!;

async function main() {
  let handle: DocHandle<VoxelGrid>;
  const locationHash = document.location.hash.substring(1);
  if (isValidAutomergeUrl(locationHash)) {
    handle = await repo.find(locationHash);
  } else {
    handle = repo.create<VoxelGrid>(initVoxelGrid());
    document.location.hash = handle.url;
  }

  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <RepoContext.Provider value={repo}>
        <App docUrl={handle.url} />
      </RepoContext.Provider>
    </React.StrictMode>,
  );
}

main();
