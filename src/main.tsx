import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  DocHandle,
  IndexedDBStorageAdapter,
  isValidAutomergeUrl,
  Repo,
  RepoContext,
  WebSocketClientAdapter,
} from "@automerge/react";
import { VoxelGrid, initVoxelGrid } from "./components/voxels.tsx";

const repo = new Repo({
  network: [new WebSocketClientAdapter("wss://sync.automerge.org")],
  storage: new IndexedDBStorageAdapter(),
});

declare global {
  interface window {
    repo: Repo;
    handle: DocHandle<VoxelGrid>;
  }
}
window.repo = repo;

// Check the URL for a document to load
const locationHash = document.location.hash.substring(1);
// Depending if we have an AutomergeUrl, either find or create the document
if (isValidAutomergeUrl(locationHash)) {
  window.handle = await repo.find(locationHash);
} else {
  window.handle = repo.create<VoxelGrid>(initVoxelGrid());
  document.location.hash = window.handle.url;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense>
      <RepoContext.Provider value={repo}>
        <App docUrl={window.handle.url} />
      </RepoContext.Provider>
    </Suspense>
  </StrictMode>,
);
