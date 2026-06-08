import { useState, useEffect, useCallback, useRef } from "react";

interface State<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * Hook genérico para buscar dados de uma API.
 * Cancela automaticamente a requisição ao desmontar o componente.
 */
export function useFetch<T>(fetcher: () => Promise<T>, deps: unknown[] = []) {
  const [state, setState] = useState<State<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const abortRef = useRef<AbortController | null>(null);

  const load = useCallback(async () => {
    // Cancela requisição anterior se ainda estiver pendente
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    setState((s) => ({ ...s, loading: true, error: null }));

    try {
      const data = await fetcher();
      setState({ data, loading: false, error: null });
    } catch (e) {
      if ((e as Error).name === "AbortError") return;
      setState({
        data: null,
        loading: false,
        error: (e as Error).message ?? "Erro desconhecido",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    load();
    return () => {
      abortRef.current?.abort();
    };
  }, [load]);

  return { ...state, refetch: load };
}
