// ─── Backend entity types ───────────────────────

/** Estação de monitoramento oceânico (boia, satélite ou submarina). */
export interface EstacaoMonitora {
  /** Identificador único da estação. */
  idEstacao: number;
  /** Nome descritivo da estação. */
  nomeEstacao: string;
  /** Latitude geográfica da estação. */
  latEstacao: number;
  /** Longitude geográfica da estação. */
  lonEstacao: number;
  /** Tipo físico da estação de monitoramento. */
  tipoEstacao: "Boia" | "Satelite" | "Submarina";
}

/** Leitura de telemetria registrada por uma estação. */
export interface LeituraTelemetria {
  /** Identificador único da leitura. */
  idLeitura: number;
  /** Estação que gerou esta leitura. */
  idEstacao: number;
  /** Horário da leitura (ISO string ou array [Y, M, D, H, m, s]). */
  horarioLeitura: string | number[];
  /** Sea Surface Temperature — temperatura da superfície do mar (°C). */
  sst: number;
  /** Altura das ondas em metros. */
  waveHeight: number;
  /** Período das ondas em segundos. */
  wavePeriod: number;
  /** Velocidade do vento em km/h. */
  windSpeed: number;
  /** Direção do vento em graus (0–360). */
  windDirection: number;
  /** Magnitude sísmica na escala Richter. */
  earthquakeMagnitude: number;
  /** Profundidade focal do evento sísmico em km. */
  focalDepth: number;
}

/** Alerta gerado a partir de uma leitura de telemetria. */
export interface Alerta {
  /** Identificador único do alerta. */
  idAlerta: number;
  /** Leitura que originou este alerta. */
  idLeitura: number;
  /** Nível de risco classificado pela IA. */
  riscoAlerta: "ALTO" | "MEDIO" | "BAIXO";
  /** Descrição textual do alerta. */
  descAlerta: string;
  /** Horário em que o alerta foi gerado. */
  horarioAlerta: string | number[];
  /** Observações adicionais, se houver. */
  observaAlerta: string | null;
  /** "S" = resolvido · "N" = pendente. */
  conclusaoAlerta: "S" | "N";
}

/** Espécie marinha catalogada na plataforma. */
export interface Especie {
  /** Identificador único da espécie. */
  idEspecie: number;
  /** Nome científico (Linnaeus). */
  ncEspecie: string;
  /** Nome popular em português. */
  npEspecie: string;
  /** Status de conservação IUCN. */
  conservaEspecie: "LC" | "NT" | "VU" | "EN" | "CR";
  /** Habitat primário da espécie. */
  habitatEspecie: string;
  /** Descrição opcional da espécie. */
  descEspecie: string | null;
}

/** Registro de avistamento de uma espécie marinha. */
export interface Avistamento {
  /** Identificador único do avistamento. */
  idAvista: number;
  /** Estação onde o avistamento foi registrado. */
  idEstacao: number;
  /** Espécie avistada. */
  idEspecie: number;
  /** Horário do avistamento. */
  horarioAvista: string | number[];
  /** Quantidade de indivíduos avistados. */
  quantAvista: number;
}

/** Zona geográfica de monitoramento oceânico. */
export interface ZonaMonitora {
  /** Identificador único da zona. */
  idZona: number;
  /** Nome da zona. */
  nomeZona: string;
  /** País ou região da zona. */
  paisZona: string;
  /** Descrição opcional da zona. */
  descZona: string | null;
}

// ─── Utility ──────────────────────────────────────────────────────────────────

/**
 * Converte um horário retornado pela API (string ISO ou array de números)
 * em um objeto Date.
 */
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

/**
 * Formata um horário da API para exibição em português (data + hora curta).
 * Retorna "—" se o valor for nulo.
 */
export function formatDateTime(
  raw: string | number[] | null | undefined,
): string {
  const d = parseDateTime(raw);
  if (!d) return "—";
  return d.toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
}

/**
 * Formata um horário da API para exibição somente da data em português.
 * Retorna "—" se o valor for nulo.
 */
export function formatDate(raw: string | number[] | null | undefined): string {
  const d = parseDateTime(raw);
  if (!d) return "—";
  return d.toLocaleDateString("pt-BR");
}
