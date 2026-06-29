const CLIENT_ID_KEY = "the-news-client-id-v1";
const CLIENT_ID_PATTERN = /^[a-f0-9-]{36}$/;

interface RemoteValue {
  found: boolean;
  value?: unknown;
}

function getClientId() {
  const storedId = localStorage.getItem(CLIENT_ID_KEY);
  if (storedId && CLIENT_ID_PATTERN.test(storedId)) return storedId;
  const clientId = crypto.randomUUID();
  localStorage.setItem(CLIENT_ID_KEY, clientId);
  return clientId;
}

export async function getRemoteValue(key: string, signal: AbortSignal): Promise<RemoteValue> {
  const response = await fetch(`/api/state/${encodeURIComponent(key)}`, {
    headers: { "x-client-id": getClientId() },
    signal,
  });
  if (response.status === 404) return { found: false };
  if (!response.ok) throw new Error("Falha ao carregar dados");
  return response.json() as Promise<RemoteValue>;
}

export async function saveRemoteValue(key: string, value: unknown) {
  const response = await fetch(`/api/state/${encodeURIComponent(key)}`, {
    method: "PUT",
    headers: { "content-type": "application/json", "x-client-id": getClientId() },
    body: JSON.stringify({ value }),
  });
  if (!response.ok) throw new Error("Falha ao salvar dados");
}

export async function clearRemoteValues() {
  const response = await fetch("/api/state", {
    method: "DELETE",
    headers: { "x-client-id": getClientId() },
  });
  if (!response.ok) throw new Error("Falha ao apagar dados");
}
