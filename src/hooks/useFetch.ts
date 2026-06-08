import { useState, useEffect, useCallback } from "react";

interface State<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

async function fetchWithTimeout(
  fetcher: () => Promise<unknown>,
  timeoutMs = 10000,
): Promise<unknown> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const result = await fetcher();
    return result;
  } finally {
    clearTimeout(id);
  }
}

async function fetchWithRetry<T>(
  fetcher: () => Promise<T>,
  retries = 2,
  delayMs = 800,
): Promise<T> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return (await fetchWithTimeout(fetcher)) as T;
    } catch (e) {
      if (attempt === retries) throw e;
      await new Promise((res) => setTimeout(res, delayMs * (attempt + 1)));
    }
  }
  throw new Error("Falha após múltiplas tentativas");
}

export function useFetch<T>(fetcher: () => Promise<T>, deps: unknown[] = []) {
  const [state, setState] = useState<State<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const load = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const data = await fetchWithRetry(fetcher);
      setState({ data, loading: false, error: null });
    } catch (e) {
      const msg =
        (e as Error).name === "AbortError"
          ? "Tempo de conexão esgotado. Verifique sua rede."
          : (e as Error).message;
      setState({ data: null, loading: false, error: msg });
    }
  }, deps);

  useEffect(() => {
    load();
  }, [load]);

  return { ...state, refetch: load };
}
