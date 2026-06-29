import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const api = spawn(process.execPath, ["server/index.mjs"], { cwd: root, stdio: "inherit" });
const web = spawn(process.execPath, ["node_modules/vite/bin/vite.js"], { cwd: root, stdio: "inherit" });

function stop(exitCode = 0) {
  api.kill();
  web.kill();
  process.exit(exitCode);
}

api.on("exit", (code) => stop(code ?? 0));
web.on("exit", (code) => stop(code ?? 0));
process.on("SIGINT", () => stop());
process.on("SIGTERM", () => stop());
