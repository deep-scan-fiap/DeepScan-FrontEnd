// ─── Backend entity types ───────────────────────

export interface EstacaoMonitora {
  idEstacao: number;
  nomeEstacao: string;
  latEstacao: number;
  lonEstacao: number;
  tipoEstacao: "Boia" | "Satelite" | "Submarina";
}

export interface LeituraTelemetria {
  idLeitura: number;
  idEstacao: number;
  horarioLeitura: string | number[];
  sst: number;
  waveHeight: number;
  wavePeriod: number;
  windSpeed: number;
  windDirection: number;
  earthquakeMagnitude: number;
  focalDepth: number;
}

export interface Alerta {
  idAlerta: number;
  idLeitura: number;
  riscoAlerta: "ALTO" | "MEDIO" | "BAIXO";
  descAlerta: string;
  horarioAlerta: string | number[];
  observaAlerta: string | null;
  conclusaoAlerta: "S" | "N";
}

export interface Especie {
  idEspecie: number;
  ncEspecie: string; // nome científico
  npEspecie: string; // nome popular
  conservaEspecie: "LC" | "NT" | "VU" | "EN" | "CR";
  habitatEspecie: string;
  descEspecie: string | null;
}

export interface Avistamento {
  idAvista: number;
  idEstacao: number;
  idEspecie: number;
  horarioAvista: string | number[];
  quantAvista: number;
}

export interface ZonaMonitora {
  idZona: number;
  nomeZona: string;
  paisZona: string;
  descZona: string | null;
}

// ─── Utility ──────────────────────────────────────────────────────────────────

export function parseDateTime(
  raw: string | number[] | null | undefined,
): Date | null {
  if (!raw) return null;
  if (Array.isArray(raw)) {
    const [y, M, d, H = 0, m = 0, s = 0] = raw as number[];
    return new Date(y, M - 1, d, H, m, s);
  }
  return new Date(raw as string);
}

export function formatDateTime(
  raw: string | number[] | null | undefined,
): string {
  const d = parseDateTime(raw);
  if (!d) return "—";
  return d.toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
}

export function formatDate(raw: string | number[] | null | undefined): string {
  const d = parseDateTime(raw);
  if (!d) return "—";
  return d.toLocaleDateString("pt-BR");
}
