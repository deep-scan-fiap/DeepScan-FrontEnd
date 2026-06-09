import { useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import { leiturasApi } from "@/api/leituras";
import { estacoesApi } from "@/api/estacoes";
import { avistamentosApi } from "@/api/avistamentos";
import { iaApi } from "@/api/ia";
import type { RiscoResult, TemperaturaResult } from "@/api/ia";
import { LoadingSpinner, ErrorBox } from "@/components/Feedback";
import { formatDateTime } from "@/types";
import type { LeituraTelemetria, EstacaoMonitora } from "@/types";

// ── Constantes de estilo (mesmos padrões do Monitoramento.tsx) ─────────────────
const CARD =
  "bg-background rounded-2xl border border-foreground/10 overflow-hidden shadow-sm";
const HDR =
  "px-5 py-4 border-b border-foreground/10 flex items-center justify-between bg-background flex-wrap gap-3";
const TTL = "text-[15px] font-bold text-foreground flex items-center gap-2";
const BDY = "p-5";

// ── Helpers de UI ──────────────────────────────────────────────────────────────

function FieldGroup({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] uppercase tracking-wider font-bold text-[#064273]">
        {label}
        {hint && (
          <span className="ml-1.5 text-[#76b6c4] normal-case font-normal tracking-normal">
            — {hint}
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

function NumInput({
  value,
  onChange,
  placeholder,
  step,
  min,
  max,
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  step?: string;
  min?: string;
  max?: string;
  disabled?: boolean;
}) {
  return (
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      step={step ?? "any"}
      min={min}
      max={max}
      disabled={disabled}
      className="px-3 py-2.5 bg-[#def3f6] border-2 border-transparent rounded-lg
        focus:border-[#1da2d8] focus:outline-none text-[#064273]
        placeholder:text-[#76b6c4] transition-all duration-200 text-[14px] w-full
        disabled:opacity-50 disabled:cursor-not-allowed"
    />
  );
}

function SubmitBtn({
  onClick,
  disabled,
  loading,
  label,
}: {
  onClick: () => void;
  disabled: boolean;
  loading: boolean;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className="flex-1 bg-[#064273] hover:bg-[#1da2d8] text-white py-3 rounded-xl
        font-bold text-[14px] transition-all duration-300 hover:scale-[1.01]
        hover:shadow-lg active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed
        disabled:hover:scale-100 border-0 cursor-pointer"
    >
      {loading ? "Analisando..." : label}
    </button>
  );
}

function ClearBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-3 rounded-xl font-semibold text-[13px] bg-muted
        text-[#064273] hover:bg-[#def3f6] transition-colors border-0 cursor-pointer"
    >
      Limpar
    </button>
  );
}

function EmptyResult({ icon, text }: { icon: string; text: string }) {
  return (
    <div
      className={`${CARD} flex flex-col items-center justify-center gap-3
        text-[#76b6c4] min-h-[180px] p-6 text-center`}
    >
      <span className="text-4xl opacity-30">{icon}</span>
      <p className="text-[13px] leading-relaxed">{text}</p>
    </div>
  );
}

// Encontra a leitura mais recente dentre todas
function latestLeitura(list: LeituraTelemetria[]): LeituraTelemetria | null {
  if (!list.length) return null;
  return list.reduce((a, b) => {
    const toDate = (h: string | number[]) =>
      Array.isArray(h)
        ? new Date((h as number[]).join("-"))
        : new Date(h as string);
    return toDate(a.horarioLeitura) > toDate(b.horarioLeitura) ? a : b;
  });
}

// ── TAB: Risco de Tsunami ──────────────────────────────────────────────────────

function TabTsunami() {
  const leituras = useFetch(() => leiturasApi.listar());
  const estacoes = useFetch(() => estacoesApi.listar());

  const [form, setForm] = useState({
    magnitude: "",
    depth: "",
    latitude: "",
    longitude: "",
    gap: "",
    dmin: "",
    sig: "",
  });
  const set = (k: keyof typeof form) => (v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const [result, setResult] = useState<RiscoResult | null>(null);
  const [predLoading, setPredLoading] = useState(false);
  const [predError, setPredError] = useState<string | null>(null);
  const [loadedFrom, setLoadedFrom] = useState<string | null>(null);

  const preencherDaLeitura = () => {
    const l = latestLeitura(leituras.data ?? []);
    if (!l) return;
    const estacao = (estacoes.data ?? []).find(
      (e) => e.idEstacao === l.idEstacao,
    );
    setForm((prev) => ({
      ...prev,
      magnitude: l.earthquakeMagnitude.toFixed(2),
      depth: l.focalDepth.toFixed(3),
      latitude: estacao ? estacao.latEstacao.toFixed(6) : prev.latitude,
      longitude: estacao ? estacao.lonEstacao.toFixed(6) : prev.longitude,
    }));
    setLoadedFrom(
      `Leitura #${l.idLeitura} · ${formatDateTime(l.horarioLeitura)}`,
    );
    setResult(null);
    setPredError(null);
  };

  const formIsValid = Object.values(form).every(
    (v) => v !== "" && !isNaN(parseFloat(v)),
  );

  const submit = async () => {
    if (!formIsValid) return;
    setPredLoading(true);
    setPredError(null);
    setResult(null);
    try {
      const res = await iaApi.risco({
        magnitude: parseFloat(form.magnitude),
        depth: parseFloat(form.depth),
        latitude: parseFloat(form.latitude),
        longitude: parseFloat(form.longitude),
        gap: parseFloat(form.gap),
        dmin: parseFloat(form.dmin),
        sig: parseFloat(form.sig),
      });
      setResult(res);
    } catch (e) {
      setPredError(
        (e as Error).message.includes("HTTP")
          ? `Erro na API de IA: ${(e as Error).message}. Verifique se o servidor Python está acessível.`
          : (e as Error).message,
      );
    } finally {
      setPredLoading(false);
    }
  };

  const clear = () => {
    setForm({
      magnitude: "",
      depth: "",
      latitude: "",
      longitude: "",
      gap: "",
      dmin: "",
      sig: "",
    });
    setResult(null);
    setPredError(null);
    setLoadedFrom(null);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Descrição do modelo */}
      <div className="bg-gradient-to-br from-[#064273]/5 to-[#1da2d8]/10 rounded-2xl p-5 border border-[#1da2d8]/20">
        <div className="flex items-start gap-3">
          <span className="text-2xl flex-shrink-0 mt-0.5">🌊</span>
          <div>
            <h3 className="text-[14px] font-bold text-[#064273] mb-1.5">
              Modelo de Classificação de Risco de Tsunami
            </h3>
            <p className="text-[13px] text-[#5a7a8e] leading-relaxed">
              Classifica eventos sísmicos como{" "}
              <strong className="text-[#064273]">Risco de Tsunami</strong> ou{" "}
              <strong className="text-[#064273]">Sem Risco</strong> com base em
              parâmetros geofísicos. Os dados de magnitude e profundidade focal
              podem ser carregados diretamente da última leitura registrada
              pelas estações de monitoramento.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-5 items-start">
        {/* Formulário */}
        <div className={CARD}>
          <div className={HDR}>
            <span className={TTL}>📝 Parâmetros Sísmicos</span>
            <button
              onClick={preencherDaLeitura}
              disabled={
                leituras.loading || !leituras.data?.length || estacoes.loading
              }
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                text-[12px] font-semibold bg-[#def3f6] text-[#1da2d8]
                hover:bg-[#1da2d8] hover:text-white transition-all duration-200
                disabled:opacity-40 disabled:cursor-not-allowed border-0 cursor-pointer"
            >
              ⚡ Carregar da última leitura
            </button>
          </div>
          <div className={BDY}>
            {/* Banner de origem dos dados */}
            {loadedFrom && (
              <div className="mb-4 px-3 py-2.5 bg-[#def3f6] rounded-xl text-[12px] text-[#1da2d8] flex items-center gap-2">
                <span className="text-base">✓</span>
                <span>
                  Magnitude e profundidade carregados da{" "}
                  <strong>{loadedFrom}</strong>
                </span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FieldGroup label="Magnitude" hint="Richter, ex: 7.5">
                <NumInput
                  value={form.magnitude}
                  onChange={set("magnitude")}
                  placeholder="ex: 7.5"
                  step="0.1"
                  min="0"
                  max="10"
                />
              </FieldGroup>

              <FieldGroup label="Profundidade Focal" hint="km, ex: 10.0">
                <NumInput
                  value={form.depth}
                  onChange={set("depth")}
                  placeholder="ex: 10.0"
                  step="0.1"
                  min="0"
                />
              </FieldGroup>

              <FieldGroup label="Latitude" hint="graus decimais, -90 a 90">
                <NumInput
                  value={form.latitude}
                  onChange={set("latitude")}
                  placeholder="ex: -8.453"
                  step="0.000001"
                  min="-90"
                  max="90"
                />
              </FieldGroup>

              <FieldGroup label="Longitude" hint="graus decimais, -180 a 180">
                <NumInput
                  value={form.longitude}
                  onChange={set("longitude")}
                  placeholder="ex: -35.078"
                  step="0.000001"
                  min="-180"
                  max="180"
                />
              </FieldGroup>

              <FieldGroup label="Gap Azimutal" hint="graus, 0–360">
                <NumInput
                  value={form.gap}
                  onChange={set("gap")}
                  placeholder="ex: 90"
                  step="1"
                  min="0"
                  max="360"
                />
              </FieldGroup>

              <FieldGroup
                label="Dist. Mín. de Estação"
                hint="km até a mais próxima"
              >
                <NumInput
                  value={form.dmin}
                  onChange={set("dmin")}
                  placeholder="ex: 1.5"
                  step="0.1"
                  min="0"
                />
              </FieldGroup>

              <FieldGroup
                label="Significância (sig)"
                hint="0 a 2000+, escala USGS"
              >
                <NumInput
                  value={form.sig}
                  onChange={set("sig")}
                  placeholder="ex: 600"
                  step="1"
                  min="0"
                />
              </FieldGroup>
            </div>

            {/* Legenda dos campos técnicos */}
            <div className="mt-4 p-3.5 bg-muted rounded-xl">
              <p className="text-[11px] text-[#5a7a8e] leading-relaxed">
                <strong className="text-[#064273]">Gap Azimutal:</strong> maior
                ângulo sem cobertura de estações ({"<"}90° = bem coberto).{" "}
                <strong className="text-[#064273]">Dist. Mín.:</strong>{" "}
                distância até a estação sismológica mais próxima.{" "}
                <strong className="text-[#064273]">Sig:</strong> significância
                atribuída pelo USGS ao evento ({">"} 600 = significativo).
              </p>
            </div>

            <div className="mt-5 flex gap-3">
              <SubmitBtn
                onClick={submit}
                disabled={!formIsValid}
                loading={predLoading}
                label="🔍 Analisar Risco de Tsunami"
              />
              <ClearBtn onClick={clear} />
            </div>

            {!formIsValid && Object.values(form).some((v) => v !== "") && (
              <p className="mt-2 text-[12px] text-[#76b6c4]">
                ↑ Preencha todos os campos para habilitar a análise
              </p>
            )}
          </div>
        </div>

        {/* Resultado */}
        <div className="flex flex-col gap-4">
          {predLoading && (
            <div className={CARD}>
              <div className={BDY}>
                <LoadingSpinner text="Consultando modelo de classificação..." />
              </div>
            </div>
          )}

          {predError && <ErrorBox message={predError} />}

          {result && !predLoading && (
            <div className={`${CARD} overflow-hidden`}>
              <div
                className={`p-6 text-center ${
                  result.codigo === 1
                    ? "bg-gradient-to-br from-red-500 to-red-700"
                    : "bg-gradient-to-br from-green-500 to-green-700"
                }`}
              >
                <div className="text-5xl mb-3">
                  {result.codigo === 1 ? "🚨" : "✅"}
                </div>
                <div className="text-white font-black text-[22px] leading-tight tracking-tight">
                  {result.codigo === 1 ? "RISCO DETECTADO" : "SEM RISCO"}
                </div>
                <div className="text-white/80 text-[14px] mt-1 font-semibold">
                  {result.risco}
                </div>
              </div>
              <div className="p-4 bg-background">
                <p className="text-[12px] text-[#5a7a8e] text-center leading-relaxed">
                  {result.codigo === 1
                    ? "⚠️ Parâmetros indicam probabilidade de geração de onda tsunamigênica. Acione os protocolos de alerta e monitoramento costeiro."
                    : "✓ Parâmetros dentro dos limites seguros. Mantenha o monitoramento regular das estações."}
                </p>
              </div>
            </div>
          )}

          {!predLoading && !predError && !result && (
            <EmptyResult
              icon="🌊"
              text="Preencha os parâmetros sísmicos e clique em Analisar para ver a classificação do modelo"
            />
          )}

          {/* Tabela de referência */}
          <div className={CARD}>
            <div className={`${HDR} border-b-0`}>
              <span className="text-[12px] font-bold text-[#064273] flex items-center gap-2">
                📊 Referência de Magnitude
              </span>
            </div>
            <div className="px-4 pb-4">
              {[
                {
                  range: "< 5.0",
                  label: "Sem impacto oceânico",
                  color: "bg-green-100 text-green-700",
                },
                {
                  range: "5.0 – 6.5",
                  label: "Potencialmente tsunamigênico",
                  color: "bg-yellow-100 text-yellow-700",
                },
                {
                  range: "6.5 – 7.5",
                  label: "Risco moderado",
                  color: "bg-orange-100 text-orange-700",
                },
                {
                  range: "> 7.5",
                  label: "Alto risco de tsunami",
                  color: "bg-red-100 text-red-700",
                },
              ].map((r) => (
                <div
                  key={r.range}
                  className="flex items-center justify-between py-2 border-b border-foreground/5 last:border-0 gap-2"
                >
                  <code className="text-[12px] font-mono text-[#064273]">
                    {r.range}
                  </code>
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${r.color}`}
                  >
                    {r.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── TAB: Previsão de Temperatura do Mar (SST) ──────────────────────────────────

function TabTemperatura() {
  const estacoes = useFetch(() => estacoesApi.listar());
  const avistamentos = useFetch(() => avistamentosApi.listar());

  const [selectedEstacao, setSelectedEstacao] =
    useState<EstacaoMonitora | null>(null);

  const [form, setForm] = useState({
    latitude: "",
    longitude: "",
    ph_level: "8.1",
    species_observed: "",
    marine_heatwave: "0" as "0" | "1",
  });
  const set = (k: keyof typeof form) => (v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const [result, setResult] = useState<TemperaturaResult | null>(null);
  const [predLoading, setPredLoading] = useState(false);
  const [predError, setPredError] = useState<string | null>(null);

  // Contar avistamentos para estação selecionada
  const contagemEspecie = selectedEstacao
    ? new Set(
        (avistamentos.data ?? [])
          .filter((a) => a.idEstacao === selectedEstacao.idEstacao)
          .map((a) => a.idEspecie),
      ).size
    : 0;

  const handleEstacaoChange = (id: number) => {
    const estacao = (estacoes.data ?? []).find((e) => e.idEstacao === id);
    if (!estacao) return;
    setSelectedEstacao(estacao);
    // Contar espécies distintas avistadas nessa estação
    const especiesNaEstacao = new Set(
      (avistamentos.data ?? [])
        .filter((a) => a.idEstacao === id)
        .map((a) => a.idEspecie),
    ).size;
    setForm((prev) => ({
      ...prev,
      latitude: estacao.latEstacao.toFixed(6),
      longitude: estacao.lonEstacao.toFixed(6),
      species_observed: especiesNaEstacao.toString(),
    }));
    setResult(null);
    setPredError(null);
  };

  const formIsValid =
    form.latitude !== "" &&
    form.longitude !== "" &&
    form.ph_level !== "" &&
    form.species_observed !== "" &&
    !isNaN(parseFloat(form.latitude)) &&
    !isNaN(parseFloat(form.longitude)) &&
    !isNaN(parseFloat(form.ph_level)) &&
    !isNaN(parseFloat(form.species_observed));

  const submit = async () => {
    if (!formIsValid) return;
    setPredLoading(true);
    setPredError(null);
    setResult(null);
    try {
      const res = await iaApi.temperatura({
        latitude: parseFloat(form.latitude),
        longitude: parseFloat(form.longitude),
        ph_level: parseFloat(form.ph_level),
        species_observed: parseInt(form.species_observed, 10),
        marine_heatwave: (form.marine_heatwave === "1" ? 1 : 0) as 0 | 1,
      });
      setResult(res);
    } catch (e) {
      setPredError(
        (e as Error).message.includes("HTTP")
          ? `Erro na API de IA: ${(e as Error).message}. Verifique se o servidor Python está acessível.`
          : (e as Error).message,
      );
    } finally {
      setPredLoading(false);
    }
  };

  const clear = () => {
    setSelectedEstacao(null);
    setForm({
      latitude: "",
      longitude: "",
      ph_level: "8.1",
      species_observed: "",
      marine_heatwave: "0",
    });
    setResult(null);
    setPredError(null);
  };

  const sstContext = (t: number) => {
    if (t < 10)
      return { label: "Muito Frio", color: "text-blue-600", bg: "bg-blue-100" };
    if (t < 20)
      return { label: "Frio", color: "text-sky-600", bg: "bg-sky-100" };
    if (t < 28)
      return { label: "Normal", color: "text-green-600", bg: "bg-green-100" };
    if (t < 31)
      return {
        label: "Aquecido",
        color: "text-orange-600",
        bg: "bg-orange-100",
      };
    return {
      label: "Crítico — Possível Onda de Calor Marinho",
      color: "text-red-600",
      bg: "bg-red-100",
    };
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Descrição do modelo */}
      <div className="bg-gradient-to-br from-[#064273]/5 to-[#1da2d8]/10 rounded-2xl p-5 border border-[#1da2d8]/20">
        <div className="flex items-start gap-3">
          <span className="text-2xl flex-shrink-0 mt-0.5">🌡</span>
          <div>
            <h3 className="text-[14px] font-bold text-[#064273] mb-1.5">
              Modelo de Previsão de Temperatura Superficial do Mar (SST)
            </h3>
            <p className="text-[13px] text-[#5a7a8e] leading-relaxed">
              Prevê a{" "}
              <strong className="text-[#064273]">
                temperatura da superfície do mar
              </strong>{" "}
              em graus Celsius com base em parâmetros geográficos e oceânicos.
              Selecione uma estação de monitoramento para preencher
              automaticamente latitude, longitude e número de espécies
              observadas via dados de avistamentos.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-5 items-start">
        {/* Formulário */}
        <div className={CARD}>
          <div className={HDR}>
            <span className={TTL}>🗺 Parâmetros Oceânicos</span>
          </div>
          <div className={BDY}>
            {/* Seletor de estação */}
            <div className="mb-5 flex flex-col gap-1.5">
              <label className="text-[11px] uppercase tracking-wider font-bold text-[#064273]">
                Carregar dados de uma estação
              </label>
              {estacoes.loading ? (
                <div className="text-[13px] text-[#76b6c4] animate-pulse">
                  Carregando estações...
                </div>
              ) : (
                <select
                  value={selectedEstacao?.idEstacao ?? ""}
                  onChange={(e) =>
                    e.target.value
                      ? handleEstacaoChange(parseInt(e.target.value, 10))
                      : null
                  }
                  className="px-3 py-2.5 bg-[#def3f6] border-2 border-transparent rounded-lg
                    focus:border-[#1da2d8] focus:outline-none text-[#064273]
                    transition-all duration-200 text-[14px] w-full cursor-pointer"
                >
                  <option value="">— selecionar estação (opcional) —</option>
                  {(estacoes.data ?? []).map((e) => (
                    <option key={e.idEstacao} value={e.idEstacao}>
                      #{e.idEstacao} · {e.nomeEstacao} ({e.tipoEstacao})
                    </option>
                  ))}
                </select>
              )}
              {selectedEstacao && (
                <div className="px-3 py-2 bg-[#def3f6] rounded-lg text-[12px] text-[#1da2d8] flex items-center gap-2">
                  <span>✓</span>
                  <span>
                    Lat/lon e espécies carregados de{" "}
                    <strong>{selectedEstacao.nomeEstacao}</strong>
                    {contagemEspecie > 0 &&
                      ` · ${contagemEspecie} espécie${contagemEspecie !== 1 ? "s" : ""} avistada${contagemEspecie !== 1 ? "s" : ""}`}
                  </span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FieldGroup label="Latitude" hint="graus decimais, -90 a 90">
                <NumInput
                  value={form.latitude}
                  onChange={set("latitude")}
                  placeholder="ex: -8.453"
                  step="0.000001"
                  min="-90"
                  max="90"
                />
              </FieldGroup>

              <FieldGroup label="Longitude" hint="graus decimais, -180 a 180">
                <NumInput
                  value={form.longitude}
                  onChange={set("longitude")}
                  placeholder="ex: -35.078"
                  step="0.000001"
                  min="-180"
                  max="180"
                />
              </FieldGroup>

              <FieldGroup label="Nível de pH" hint="típico oceano: 7.5–8.5">
                <NumInput
                  value={form.ph_level}
                  onChange={set("ph_level")}
                  placeholder="ex: 8.1"
                  step="0.01"
                  min="0"
                  max="14"
                />
              </FieldGroup>

              <FieldGroup
                label="Espécies Observadas"
                hint="total de espécies distintas"
              >
                <NumInput
                  value={form.species_observed}
                  onChange={set("species_observed")}
                  placeholder="ex: 12"
                  step="1"
                  min="0"
                />
              </FieldGroup>
            </div>

            {/* Toggle Onda de Calor Marinho */}
            <div className="mt-4 p-4 bg-muted rounded-xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[12px] font-bold text-[#064273] uppercase tracking-wider mb-0.5">
                    Onda de Calor Marinho Ativa
                  </p>
                  <p className="text-[11px] text-[#5a7a8e]">
                    Marine Heatwave — condições de aquecimento extremo do oceano
                  </p>
                </div>
                <button
                  onClick={() =>
                    set("marine_heatwave")(
                      form.marine_heatwave === "0" ? "1" : "0",
                    )
                  }
                  className={`relative flex-shrink-0 w-12 h-6 rounded-full transition-colors duration-300 border-0 cursor-pointer ${
                    form.marine_heatwave === "1"
                      ? "bg-[#1da2d8]"
                      : "bg-[#76b6c4]/40"
                  }`}
                  aria-pressed={form.marine_heatwave === "1"}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${
                      form.marine_heatwave === "1"
                        ? "translate-x-6"
                        : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
              {form.marine_heatwave === "1" && (
                <div className="mt-2 text-[11px] text-orange-600 font-semibold">
                  ⚠️ Marine Heatwave ativa — temperatura tende a ser mais
                  elevada
                </div>
              )}
            </div>

            <div className="mt-5 flex gap-3">
              <SubmitBtn
                onClick={submit}
                disabled={!formIsValid}
                loading={predLoading}
                label="🌡 Prever Temperatura SST"
              />
              <ClearBtn onClick={clear} />
            </div>

            {!formIsValid &&
              (form.latitude !== "" || form.longitude !== "") && (
                <p className="mt-2 text-[12px] text-[#76b6c4]">
                  ↑ Preencha todos os campos para habilitar a previsão
                </p>
              )}
          </div>
        </div>

        {/* Resultado */}
        <div className="flex flex-col gap-4">
          {predLoading && (
            <div className={CARD}>
              <div className={BDY}>
                <LoadingSpinner text="Consultando modelo de regressão..." />
              </div>
            </div>
          )}

          {predError && <ErrorBox message={predError} />}

          {result &&
            !predLoading &&
            (() => {
              const ctx = sstContext(result.temperatura_prevista);
              return (
                <div className={`${CARD} overflow-hidden`}>
                  <div className="p-6 text-center bg-gradient-to-br from-[#064273] to-[#1da2d8]">
                    <div className="text-4xl mb-2">🌡</div>
                    <div className="text-white font-black text-[42px] leading-none tracking-tight">
                      {result.temperatura_prevista.toFixed(1)}
                      <span className="text-[22px] font-bold ml-1">°C</span>
                    </div>
                    <div className="text-white/70 text-[13px] mt-1">
                      Temperatura Superficial Prevista
                    </div>
                  </div>
                  <div className="p-4 bg-background">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <span
                        className={`text-[12px] font-bold px-3 py-1 rounded-full ${ctx.bg} ${ctx.color}`}
                      >
                        {ctx.label}
                      </span>
                    </div>
                    <p className="text-[12px] text-[#5a7a8e] text-center leading-relaxed">
                      {result.temperatura_prevista >= 28
                        ? "Temperatura elevada: monitorar indicadores de branqueamento de corais e estresse em espécies sensíveis."
                        : result.temperatura_prevista < 15
                          ? "Temperatura baixa: verificar comportamento de espécies migrantes e correntes oceânicas."
                          : "Temperatura dentro da faixa típica para o oceano tropical-subtropical."}
                    </p>
                  </div>
                </div>
              );
            })()}

          {!predLoading && !predError && !result && (
            <EmptyResult
              icon="🌡"
              text="Selecione uma estação ou preencha os parâmetros e clique em Prever para ver o resultado do modelo"
            />
          )}

          {/* Faixas de referência de SST */}
          <div className={CARD}>
            <div className={`${HDR} border-b-0`}>
              <span className="text-[12px] font-bold text-[#064273] flex items-center gap-2">
                📊 Faixas de Referência (SST)
              </span>
            </div>
            <div className="px-4 pb-4">
              {[
                {
                  range: "< 10°C",
                  label: "Muito Frio",
                  color: "bg-blue-100 text-blue-700",
                },
                {
                  range: "10 – 20°C",
                  label: "Frio",
                  color: "bg-sky-100 text-sky-700",
                },
                {
                  range: "20 – 28°C",
                  label: "Normal",
                  color: "bg-green-100 text-green-700",
                },
                {
                  range: "28 – 31°C",
                  label: "Aquecido",
                  color: "bg-orange-100 text-orange-700",
                },
                {
                  range: "> 31°C",
                  label: "Crítico / Heatwave",
                  color: "bg-red-100 text-red-700",
                },
              ].map((r) => (
                <div
                  key={r.range}
                  className="flex items-center justify-between py-2 border-b border-foreground/5 last:border-0 gap-2"
                >
                  <code className="text-[12px] font-mono text-[#064273]">
                    {r.range}
                  </code>
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${r.color}`}
                  >
                    {r.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Página principal ──────────────────────────────────────────────────────────

const TABS = [
  { id: "tsunami", label: "🌊 Risco de Tsunami" },
  { id: "temperatura", label: "🌡 Previsão SST" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function AnaliseIA() {
  const [tab, setTab] = useState<TabId>("tsunami");

  return (
    <div className="max-w-[1280px] mx-auto py-8 px-6">
      {/* Cabeçalho */}
      <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
        <div>
          <h1 className="text-[26px] font-black text-foreground tracking-tight leading-tight">
            🤖 Análise por Inteligência Artificial
          </h1>
          <p className="text-[14px] text-secondary mt-1">
            Modelos preditivos de ML · Integrado aos dados do monitoramento
          </p>
        </div>
        <div className="px-3 py-1.5 rounded-lg bg-[#1da2d8]/10 border border-[#1da2d8]/30 text-[12px] font-semibold text-[#1da2d8] flex items-center gap-1.5">
          <span className="w-2 h-2 bg-[#1da2d8] rounded-full animate-pulse inline-block" />
          API Python · Sklearn
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex gap-1 bg-muted rounded-xl p-1 w-fit overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold cursor-pointer border-0 transition-all whitespace-nowrap flex items-center gap-2
                ${
                  tab === t.id
                    ? "bg-foreground text-primary-foreground shadow-sm"
                    : "bg-transparent text-foreground hover:bg-foreground/10"
                }`}
              onClick={() => setTab(t.id)}
              aria-pressed={tab === t.id}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Conteúdo */}
      {tab === "tsunami" && <TabTsunami />}
      {tab === "temperatura" && <TabTemperatura />}
    </div>
  );
}
