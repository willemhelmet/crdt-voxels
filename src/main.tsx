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

  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <RepoContext.Provider value={repo}>
        <App docUrl={handle.url} />
      </RepoContext.Provider>
    </React.StrictMode>,
  );
}

main();
