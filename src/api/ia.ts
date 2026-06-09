export const AI_BASE =
  (import.meta as unknown as { env: { VITE_AI_URL?: string } }).env
    ?.VITE_AI_URL ?? "https://deepscan-ai.labs-lcs-server.com";

async function json<T>(res: Response): Promise<T> {
  if (!res.ok) throw new Error(`HTTP ${res.status} — ${res.statusText}`);
  return res.json();
}

// ── Tipos de entrada e saída ──────────────────────────────────────────────────

/** Parâmetros sísmicos para classificação de risco de tsunami. */
export interface RiscoInput {
  /** Magnitude do terremoto na escala Richter. */
  magnitude: number;
  /** Profundidade focal do evento sísmico em km. */
  depth: number;
  /** Latitude do epicentro em graus decimais. */
  latitude: number;
  /** Longitude do epicentro em graus decimais. */
  longitude: number;
  /** Gap azimutal em graus — cobertura das estações sismológicas (0–360). */
  gap: number;
  /** Distância mínima até a estação sismológica mais próxima em km. */
  dmin: number;
  /** Índice de significância do evento (escala USGS, tipicamente 0–2000+). */
  sig: number;
}

/** Resultado da classificação de risco de tsunami. */
export interface RiscoResult {
  /** Classificação textual do risco. */
  risco: "Tsunami" | "Sem Tsunami";
  /** Código binário: 1 = Tsunami, 0 = Sem Tsunami. */
  codigo: 0 | 1;
}

/** Parâmetros oceânicos para previsão de temperatura superficial do mar (SST). */
export interface TemperaturaInput {
  /** Latitude do ponto de medição em graus decimais. */
  latitude: number;
  /** Longitude do ponto de medição em graus decimais. */
  longitude: number;
  /** Nível de pH da água do mar (tipicamente 7.5–8.5). */
  ph_level: number;
  /** Número de espécies marinhas observadas no local. */
  species_observed: number;
  /** Indicador de onda de calor marinho: 1 = ativa, 0 = ausente. */
  marine_heatwave: 0 | 1;
}

/** Resultado da previsão de temperatura superficial do mar. */
export interface TemperaturaResult {
  /** Temperatura prevista em graus Celsius. */
  temperatura_prevista: number;
  /** Unidade de medida retornada pela API. */
  unidade: string;
}

// ── Chamadas de API ───────────────────────────────────────────────────────────

export const iaApi = {
  /**
   * POST /predict/risco
   * Classifica um evento sísmico quanto ao risco de geração de tsunami.
   */
  risco: (data: RiscoInput) =>
    fetch(`${AI_BASE}/predict/risco`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => json<RiscoResult>(r)),

  /**
   * POST /predict/temperatura
   * Prevê a temperatura superficial do mar (SST) para um dado ponto geográfico.
   */
  temperatura: (data: TemperaturaInput) =>
    fetch(`${AI_BASE}/predict/temperatura`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => json<TemperaturaResult>(r)),
};
