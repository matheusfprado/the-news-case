import { useEffect, useRef, useState } from "react";
import { getRemoteValue, saveRemoteValue } from "@/shared/services/prototypeStorage";

type Validator<T> = (value: unknown) => value is T;

export function usePersistentState<T>(key: string, initialValue: T, isValid: Validator<T>) {
  const [value, setValue] = useState<T>(() => {
    try {
      const storedValue = localStorage.getItem(key);
      if (!storedValue) return initialValue;
      const parsedValue: unknown = JSON.parse(storedValue);
      return isValid(parsedValue) ? parsedValue : initialValue;
    } catch {
      return initialValue;
    }
  });
  const remoteReady = useRef(false);
  const latestValue = useRef(value);

  useEffect(() => {
    latestValue.current = value;
  }, [value]);

  useEffect(() => {
    const controller = new AbortController();
    remoteReady.current = false;

    void getRemoteValue(key, controller.signal)
      .then(async (remote) => {
        if (remote.found && isValid(remote.value)) setValue(remote.value);
        else await saveRemoteValue(key, latestValue.current);
        remoteReady.current = true;
      })
      .catch(() => {
        if (!controller.signal.aborted) remoteReady.current = true;
      });

    return () => controller.abort();
  }, [key, isValid]);

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Mantém o estado funcional sem armazenamento local.
    }
    if (remoteReady.current) void saveRemoteValue(key, value).catch(() => undefined);
  }, [key, value]);

  return [value, setValue] as const;
}
