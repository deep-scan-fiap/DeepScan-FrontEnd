/**
 * URL base da API.
 * Em desenvolvimento, define a variável de ambiente VITE_API_URL no arquivo .env.local
 * Exemplo: VITE_API_URL=http://localhost:8080/api/deepscan
 */
export const API_BASE = import.meta.env.VITE_API_URL ?? "/api/deepscan";

/**
 * Timeout padrão para todas as requisições (ms).
 */
export const API_TIMEOUT = 10_000;

/**
 * Headers padrão enviados em todas as requisições.
 */
export const DEFAULT_HEADERS: HeadersInit = {
  "Content-Type": "application/json",
  Accept: "application/json",
};
