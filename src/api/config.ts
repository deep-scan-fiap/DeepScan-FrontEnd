// Base URL — ambiente de produção: deepscan.labs-lcs-server.com
export const API_BASE =
  (import.meta as unknown as { env: { VITE_API_URL?: string } }).env
    ?.VITE_API_URL ?? "https://deepscan.labs-lcs-server.com/deepscan";
