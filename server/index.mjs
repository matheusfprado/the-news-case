import { createHash } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import path from "node:path";

const port = Number(process.env.PORT) || 8787;
const root = path.dirname(fileURLToPath(import.meta.url));
const dataDirectory = path.join(root, "data");
const storePath = path.join(dataDirectory, "store.json");
const temporaryStorePath = path.join(dataDirectory, "store.tmp.json");
const keyPattern = /^the-news-[a-z0-9-]{1,80}$/;
const clientPattern = /^[a-f0-9-]{36}$/;
let writeQueue = Promise.resolve();

async function readStore() {
  try {
    const content = await readFile(storePath, "utf8");
    const value = JSON.parse(content);
    return typeof value === "object" && value !== null ? value : {};
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") return {};
    throw error;
  }
}

function saveValue(clientKey, key, value) {
  writeQueue = writeQueue.then(async () => {
    const store = await readStore();
    const clientStore = typeof store[clientKey] === "object" && store[clientKey] !== null ? store[clientKey] : {};
    store[clientKey] = { ...clientStore, [key]: value };
    await mkdir(dataDirectory, { recursive: true });
    await writeFile(temporaryStorePath, JSON.stringify(store, null, 2), "utf8");
    await rename(temporaryStorePath, storePath);
  });
  return writeQueue;
}

function deleteClient(clientKey) {
  writeQueue = writeQueue.then(async () => {
    const store = await readStore();
    delete store[clientKey];
    await mkdir(dataDirectory, { recursive: true });
    await writeFile(temporaryStorePath, JSON.stringify(store, null, 2), "utf8");
    await rename(temporaryStorePath, storePath);
  });
  return writeQueue;
}

function send(response, status, payload) {
  response.writeHead(status, { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" });
  response.end(JSON.stringify(payload));
}

async function readBody(request) {
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > 256_000) throw new Error("PAYLOAD_TOO_LARGE");
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? "/", `http://${request.headers.host ?? "localhost"}`);
    if (url.pathname === "/api/health" && request.method === "GET") {
      send(response, 200, { ok: true });
      return;
    }

    if (url.pathname === "/api/state" && request.method === "DELETE") {
      const clientId = request.headers["x-client-id"];
      if (typeof clientId !== "string" || !clientPattern.test(clientId)) {
        send(response, 400, { error: "Identificação inválida" });
        return;
      }
      const clientKey = createHash("sha256").update(clientId).digest("hex");
      await deleteClient(clientKey);
      send(response, 200, { deleted: true });
      return;
    }

    const match = url.pathname.match(/^\/api\/state\/([^/]+)$/);
    if (!match || !["GET", "PUT"].includes(request.method ?? "")) {
      send(response, 404, { error: "Rota não encontrada" });
      return;
    }

    const clientId = request.headers["x-client-id"];
    const key = decodeURIComponent(match[1]);
    if (typeof clientId !== "string" || !clientPattern.test(clientId) || !keyPattern.test(key)) {
      send(response, 400, { error: "Identificação inválida" });
      return;
    }

    const clientKey = createHash("sha256").update(clientId).digest("hex");
    if (request.method === "GET") {
      await writeQueue;
      const store = await readStore();
      const clientStore = store[clientKey];
      if (typeof clientStore !== "object" || clientStore === null || !(key in clientStore)) {
        send(response, 404, { found: false });
        return;
      }
      send(response, 200, { found: true, value: clientStore[key] });
      return;
    }

    const body = await readBody(request);
    if (typeof body !== "object" || body === null || !("value" in body)) {
      send(response, 400, { error: "Payload inválido" });
      return;
    }
    await saveValue(clientKey, key, body.value);
    send(response, 200, { saved: true });
  } catch (error) {
    const status = error instanceof Error && error.message === "PAYLOAD_TOO_LARGE" ? 413 : 500;
    send(response, status, { error: status === 413 ? "Payload muito grande" : "Erro interno" });
  }
});

server.listen(port, () => {
  console.log(`API do protótipo em http://localhost:${port}`);
});
