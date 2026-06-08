import { useState, useCallback } from "react";
import { useFetch } from "@/hooks/useFetch";
import { estacoesApi } from "@/api/estacoes";
import { leiturasApi } from "@/api/leituras";
import { alertasApi } from "@/api/alertas";
import { especiesApi } from "@/api/especies";
import { avistamentosApi } from "@/api/avistamentos";
import { zonasApi } from "@/api/zonas";
import { LoadingSpinner, ErrorBox, EmptyBox } from "@/components/Feedback";
import { formatDateTime } from "@/types";
import type { Alerta, LeituraTelemetria, Especie, Avistamento } from "@/types";

// ── Constantes de estilo Tailwind ─────────────────────────────────────────────

const CARD =
  "bg-background rounded-2xl border border-foreground/10 overflow-hidden shadow-sm";
const HDR =
  "px-5 py-4 border-b border-foreground/10 flex items-center justify-between bg-background";
const TTL = "text-[15px] font-bold text-foreground flex items-center gap-2";
const BDY = "p-5";
const BDG =
  "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wide";
const SGRID = "grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4";
const TH =
  "bg-muted text-foreground font-bold text-[11px] uppercase tracking-wide py-2.5 px-3.5 text-left border-b-2 border-foreground/10 whitespace-nowrap";
const TD = "py-2.5 px-3.5 border-b border-foreground/10";
const TR = "hover:bg-muted/50";
const MOCK =
  "bg-gradient-to-br from-foreground/[4%] to-primary/[6%] border border-dashed border-secondary rounded-xl p-6";

function riscoBadge(r: string) {
  const cls =
    r === "ALTO"
      ? "bg-red-100 text-red-600"
      : r === "MEDIO"
        ? "bg-yellow-100 text-yellow-600"
        : "bg-green-100 text-green-600";
  return <span className={`${BDG} ${cls}`}>{r}</span>;
}

function statusBadge(c: string) {
  return c === "N" ? (
    <span className={`${BDG} bg-yellow-100 text-yellow-600`}>⏳ Pendente</span>
  ) : (
    <span className={`${BDG} bg-green-100 text-green-600`}>✓ Resolvido</span>
  );
}

function conservaBadge(c: string) {
  const cls: Record<string, string> = {
    LC: "bg-green-100 text-green-700",
    NT: "bg-emerald-100 text-emerald-700",
    VU: "bg-yellow-100 text-amber-700",
    EN: "bg-orange-100 text-orange-700",
    CR: "bg-red-100 text-red-800",
  };
  const label: Record<string, string> = {
    LC: "Pouco Preocupante",
    NT: "Quase Ameaçado",
    VU: "Vulnerável",
    EN: "Em Perigo",
    CR: "Criticamente",
  };
  return (
    <span className={`${BDG} ${cls[c] ?? ""}`}>
      {c} – {label[c] ?? c}
    </span>
  );
}

function tipoBadge(t: string) {
  const cls =
    t === "Boia"
      ? "bg-sky-100 text-sky-700"
      : t === "Satelite"
        ? "bg-violet-100 text-violet-700"
        : "bg-pink-100 text-pink-700";
  return <span className={`${BDG} ${cls}`}>{t}</span>;
}

function latestLeitura(
  leituras: LeituraTelemetria[],
): LeituraTelemetria | null {
  if (!leituras.length) return null;
  return leituras.reduce((a, b) => {
    const da = new Date(
      Array.isArray(a.horarioLeitura)
        ? (a.horarioLeitura as number[]).join("-")
        : (a.horarioLeitura as string),
    );
    const db = new Date(
      Array.isArray(b.horarioLeitura)
        ? (b.horarioLeitura as number[]).join("-")
        : (b.horarioLeitura as string),
    );
    return da > db ? a : b;
  });
}

// ── Componente de Stat Card ────────────────────────────────────────────────────

interface StatCardProps {
  icon: string;
  value: number | string;
  label: string;
  sub?: string;
  urgent?: boolean;
  green?: boolean;
}

function StatCard({ icon, value, label, sub, urgent, green }: StatCardProps) {
  const iconBg = urgent
    ? "bg-gradient-to-br from-red-500 to-red-700"
    : green
      ? "bg-gradient-to-br from-green-500 to-green-700"
      : "bg-gradient-to-br from-[#1da2d8] to-[#064273]";
  const valColor = urgent ? "text-red-600" : "text-[#064273]";

  return (
    <div className="bg-white rounded-xl border border-[#064273]/10 p-5 flex flex-col gap-1.5 shadow-sm">
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center text-white mb-2 text-xl ${iconBg}`}
      >
        {icon}
      </div>
      <div className={`text-[28px] font-black leading-none ${valColor}`}>
        {value}
      </div>
      <div className="text-[12px] text-[#5a7a8e] uppercase tracking-wider">
        {label}
      </div>
      {sub && <div className="text-[12px] text-[#5a7a8e]">{sub}</div>}
    </div>
  );
}

// ── Componente de Tabela ───────────────────────────────────────────────────────

function TableWrap({
  headers,
  children,
}: {
  headers: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-[13.5px]">
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h} className={TH}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

// ── Seção IA Mock ──────────────────────────────────────────────────────────────

function IaMock({
  title,
  desc,
  items,
}: {
  title: string;
  desc: string;
  items: string[];
}) {
  return (
    <div className={MOCK}>
      <div className="flex items-center gap-2.5 mb-4 flex-wrap">
        <span className="text-[22px]">🤖</span>
        <span className="text-[15px] font-bold text-[#064273]">{title}</span>
        <span
          className={`${BDG} bg-[#1da2d8]/15 text-[#064273] border border-dashed border-[#1da2d8]`}
        >
          IA Python — Em Desenvolvimento
        </span>
      </div>
      <p className="text-[13px] text-[#5a7a8e] mb-4">{desc}</p>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3">
        {items.map((item) => (
          <div
            key={item}
            className="bg-[#064273]/5 rounded-lg h-20 flex items-center justify-center text-[#5a7a8e] text-[13px] text-center px-3"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Tab: Oceano ───────────────────────────────────────────────────────────────

function TabOceano() {
  const estacoes = useFetch(() => estacoesApi.listar());
  const leituras = useFetch(() => leiturasApi.listar());
  const alertas = useFetch(() => alertasApi.listar());
  const zonas = useFetch(() => zonasApi.listar());

  const last = leituras.data ? latestLeitura(leituras.data) : null;
  const pendentes =
    alertas.data?.filter((a) => a.conclusaoAlerta === "N") ?? [];

  return (
    <div className="flex flex-col gap-5">
      {/* Stat cards */}
      <div className={SGRID}>
        <StatCard
          icon="🛰"
          value={estacoes.loading ? "…" : (estacoes.data?.length ?? "—")}
          label="Estações Ativas"
        />
        <StatCard
          icon="🌡"
          value={last ? `${last.sst.toFixed(1)}°` : "…"}
          label="SST Média (°C)"
          sub="Última leitura registrada"
        />
        <StatCard
          icon="🚨"
          value={alertas.loading ? "…" : pendentes.length}
          label="Alertas Pendentes"
          urgent={pendentes.length > 0}
        />
        <StatCard
          icon="🗺"
          value={zonas.loading ? "…" : (zonas.data?.length ?? "—")}
          label="Zonas Monitoradas"
        />
        <StatCard
          icon="📊"
          value={leituras.loading ? "…" : (leituras.data?.length ?? "—")}
          label="Leituras no Banco"
        />
      </div>

      {/* Última leitura telemetria */}
      <div className={CARD}>
        <div className={HDR}>
          <span className={TTL}>🌊 Última Leitura Telemetria</span>
          {last && (
            <span className="text-xs text-[#5a7a8e]">
              Estação #{last.idEstacao} · {formatDateTime(last.horarioLeitura)}
            </span>
          )}
        </div>
        <div className={BDY}>
          {leituras.loading && <LoadingSpinner text="Buscando leituras..." />}
          {leituras.error && <ErrorBox message={leituras.error} />}
          {!leituras.loading && !leituras.error && !last && (
            <EmptyBox text="Nenhuma leitura encontrada." />
          )}
          {last && (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-3">
              {[
                {
                  val: last.sst.toFixed(2),
                  label: "Temp. Superficial",
                  unit: "°C (SST)",
                  warn: false,
                },
                {
                  val: last.waveHeight.toFixed(2),
                  label: "Altura das Ondas",
                  unit: "metros",
                  warn: false,
                },
                {
                  val: last.wavePeriod.toFixed(1),
                  label: "Período das Ondas",
                  unit: "segundos",
                  warn: false,
                },
                {
                  val: last.windSpeed.toFixed(1),
                  label: "Vel. do Vento",
                  unit: `km/h · ${last.windDirection.toFixed(0)}°`,
                  warn: false,
                },
                {
                  val: last.earthquakeMagnitude.toFixed(2),
                  label: "Magnitude Sísmica",
                  unit: `Richter · ${last.focalDepth.toFixed(1)} km`,
                  warn: last.earthquakeMagnitude > 4,
                },
              ].map((m) => (
                <div
                  key={m.label}
                  className={`rounded-xl p-3.5 flex flex-col gap-1 ${m.warn ? "bg-red-100" : "bg-[#def3f6]"}`}
                >
                  <div
                    className={`text-[22px] font-black ${m.warn ? "text-red-600" : "text-[#064273]"}`}
                  >
                    {m.val}
                  </div>
                  <div className="text-[11px] text-[#5a7a8e] uppercase tracking-wide">
                    {m.label}
                  </div>
                  <div className="text-[11px] text-[#76b6c4] font-semibold">
                    {m.unit}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Histórico de leituras */}
      <div className={CARD}>
        <div className={HDR}>
          <span className={TTL}>📈 Histórico de Leituras</span>
          <span className="text-xs text-[#5a7a8e]">
            {leituras.data ? `${leituras.data.length} registros` : ""}
          </span>
        </div>
        <div>
          {leituras.loading && <LoadingSpinner />}
          {leituras.error && (
            <div className={BDY}>
              <ErrorBox message={leituras.error} />
            </div>
          )}
          {leituras.data && !leituras.data.length && <EmptyBox />}
          {leituras.data && leituras.data.length > 0 && (
            <TableWrap
              headers={[
                "#",
                "Estação",
                "Horário",
                "SST (°C)",
                "Onda (m)",
                "Vento (km/h)",
                "Magnitude",
                "Prof. Focal (km)",
              ]}
            >
              {[...leituras.data].reverse().map((l) => (
                <tr key={l.idLeitura} className={TR}>
                  <td className={TD}>
                    <strong>#{l.idLeitura}</strong>
                  </td>
                  <td className={TD}>Est. #{l.idEstacao}</td>
                  <td className={`${TD} whitespace-nowrap`}>
                    {formatDateTime(l.horarioLeitura)}
                  </td>
                  <td className={TD}>{l.sst.toFixed(2)}</td>
                  <td className={TD}>{l.waveHeight.toFixed(2)}</td>
                  <td className={TD}>
                    {l.windSpeed.toFixed(1)} @ {l.windDirection.toFixed(0)}°
                  </td>
                  <td
                    className={`${TD} ${l.earthquakeMagnitude > 4 ? "text-red-600 font-bold" : ""}`}
                  >
                    {l.earthquakeMagnitude.toFixed(2)}
                  </td>
                  <td className={TD}>{l.focalDepth.toFixed(3)}</td>
                </tr>
              ))}
            </TableWrap>
          )}
        </div>
      </div>

      {/* Estações */}
      <div className={CARD}>
        <div className={HDR}>
          <span className={TTL}>📡 Estações de Monitoramento</span>
          <span className="text-xs text-[#5a7a8e]">
            {estacoes.data ? `${estacoes.data.length} estações` : ""}
          </span>
        </div>
        <div>
          {estacoes.loading && <LoadingSpinner />}
          {estacoes.error && (
            <div className={BDY}>
              <ErrorBox message={estacoes.error} />
            </div>
          )}
          {estacoes.data && !estacoes.data.length && <EmptyBox />}
          {estacoes.data && estacoes.data.length > 0 && (
            <TableWrap headers={["#", "Nome", "Tipo", "Latitude", "Longitude"]}>
              {estacoes.data.map((e) => (
                <tr key={e.idEstacao} className={TR}>
                  <td className={TD}>
                    <strong>#{e.idEstacao}</strong>
                  </td>
                  <td className={TD}>{e.nomeEstacao}</td>
                  <td className={TD}>{tipoBadge(e.tipoEstacao)}</td>
                  <td className={TD}>
                    <code className="font-mono text-xs">
                      {e.latEstacao.toFixed(6)}
                    </code>
                  </td>
                  <td className={TD}>
                    <code className="font-mono text-xs">
                      {e.lonEstacao.toFixed(6)}
                    </code>
                  </td>
                </tr>
              ))}
            </TableWrap>
          )}
        </div>
      </div>

      {/* Zonas */}
      <div className={CARD}>
        <div className={HDR}>
          <span className={TTL}>🗺 Zonas de Monitoramento</span>
        </div>
        <div>
          {zonas.loading && <LoadingSpinner />}
          {zonas.error && (
            <div className={BDY}>
              <ErrorBox message={zonas.error} />
            </div>
          )}
          {zonas.data && !zonas.data.length && <EmptyBox />}
          {zonas.data && zonas.data.length > 0 && (
            <TableWrap headers={["#", "Nome", "País/Região", "Descrição"]}>
              {zonas.data.map((z) => (
                <tr key={z.idZona} className={TR}>
                  <td className={TD}>
                    <strong>#{z.idZona}</strong>
                  </td>
                  <td className={TD}>
                    <strong>{z.nomeZona}</strong>
                  </td>
                  <td className={TD}>{z.paisZona}</td>
                  <td className={`${TD} max-w-[380px] text-xs text-[#5a7a8e]`}>
                    {z.descZona ?? "—"}
                  </td>
                </tr>
              ))}
            </TableWrap>
          )}
        </div>
      </div>

      {/* IA Mock */}
      <IaMock
        title="Previsão de Eventos Oceânicos"
        desc="Este módulo será integrado ao backend Python com modelos preditivos de ML para previsão de tsunamis, furacões e anomalias de temperatura superficial."
        items={[
          "Risco de Tsunami",
          "Formação de Ciclone",
          "Anomalia de TSM",
          "Sismo > M5",
        ]}
      />
    </div>
  );
}

// ── Tab: Vida Marinha ─────────────────────────────────────────────────────────

function TabVidaMarinha() {
  const especies = useFetch(() => especiesApi.listar());
  const avistamentos = useFetch(() => avistamentosApi.listar());

  const especieMap = new Map<number, Especie>(
    (especies.data ?? []).map((e) => [e.idEspecie, e]),
  );

  const countByStatus = (especies.data ?? []).reduce<Record<string, number>>(
    (acc, e) => {
      acc[e.conservaEspecie] = (acc[e.conservaEspecie] ?? 0) + 1;
      return acc;
    },
    {},
  );

  return (
    <div className="flex flex-col gap-5">
      {/* Resumo de conservação */}
      <div className={SGRID}>
        {(["LC", "NT", "VU", "EN", "CR"] as const).map((s) => (
          <div
            key={s}
            className="bg-white rounded-xl border border-[#064273]/10 p-5 flex flex-col gap-2 shadow-sm"
          >
            <div className="text-[28px] font-black text-[#064273] leading-none">
              {countByStatus[s] ?? 0}
            </div>
            <div>{conservaBadge(s)}</div>
          </div>
        ))}
      </div>

      {/* Espécies monitoradas */}
      <div className={CARD}>
        <div className={HDR}>
          <span className={TTL}>🐋 Espécies Monitoradas</span>
          <span className="text-xs text-[#5a7a8e]">
            {especies.data ? `${especies.data.length} espécies` : ""}
          </span>
        </div>
        <div className={BDY}>
          {especies.loading && <LoadingSpinner text="Buscando espécies..." />}
          {especies.error && <ErrorBox message={especies.error} />}
          {especies.data && !especies.data.length && (
            <EmptyBox text="Nenhuma espécie registrada." />
          )}
          {especies.data && especies.data.length > 0 && (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
              {especies.data.map((e) => (
                <div
                  key={e.idEspecie}
                  className="bg-white rounded-xl border border-[#064273]/10 shadow-sm p-5 flex flex-col gap-2.5 transition-shadow hover:shadow-md"
                >
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <div className="text-[15px] font-bold text-[#064273]">
                        {e.npEspecie}
                      </div>
                      <div className="text-xs text-[#5a7a8e] italic mt-0.5">
                        {e.ncEspecie}
                      </div>
                    </div>
                    {conservaBadge(e.conservaEspecie)}
                  </div>
                  <div className="text-xs text-[#76b6c4] flex items-center gap-1">
                    🏠 {e.habitatEspecie}
                  </div>
                  {e.descEspecie && (
                    <p className="text-xs text-[#5a7a8e] leading-relaxed">
                      {e.descEspecie}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Registro de avistamentos */}
      <div className={CARD}>
        <div className={HDR}>
          <span className={TTL}>🔭 Registro de Avistamentos</span>
          <span className="text-xs text-[#5a7a8e]">
            {avistamentos.data ? `${avistamentos.data.length} registros` : ""}
          </span>
        </div>
        <div>
          {avistamentos.loading && <LoadingSpinner />}
          {avistamentos.error && (
            <div className={BDY}>
              <ErrorBox message={avistamentos.error} />
            </div>
          )}
          {avistamentos.data && !avistamentos.data.length && (
            <EmptyBox text="Nenhum avistamento registrado." />
          )}
          {avistamentos.data && avistamentos.data.length > 0 && (
            <TableWrap
              headers={[
                "#",
                "Espécie",
                "Nome Popular",
                "Estação",
                "Quantidade",
                "Horário",
              ]}
            >
              {[...avistamentos.data].reverse().map((a: Avistamento) => {
                const esp = especieMap.get(a.idEspecie);
                return (
                  <tr key={a.idAvista} className={TR}>
                    <td className={TD}>
                      <strong>#{a.idAvista}</strong>
                    </td>
                    <td className={`${TD} text-xs italic text-[#5a7a8e]`}>
                      {esp?.ncEspecie ?? `#${a.idEspecie}`}
                    </td>
                    <td className={TD}>{esp?.npEspecie ?? "—"}</td>
                    <td className={TD}>Est. #{a.idEstacao}</td>
                    <td className={TD}>
                      <strong>{a.quantAvista}</strong>
                    </td>
                    <td className={`${TD} whitespace-nowrap`}>
                      {formatDateTime(a.horarioAvista)}
                    </td>
                  </tr>
                );
              })}
            </TableWrap>
          )}
        </div>
      </div>

      {/* IA Mock */}
      <IaMock
        title="Análise de Tendências de Biodiversidade"
        desc="Este módulo usará o backend Python para correlacionar dados de avistamentos com variações de SST, atividade sísmica e mudanças climáticas sazonais."
        items={[
          "Mapa de Calor de Avistamentos",
          "Tendência Migratória",
          "Correlação SST × Espécie",
        ]}
      />
    </div>
  );
}

// ── Tab: Relatórios ───────────────────────────────────────────────────────────

function TabRelatorios() {
  const {
    data: alertas,
    loading,
    error,
    refetch,
  } = useFetch(() => alertasApi.listar());
  const leituras = useFetch(() => leiturasApi.listar());
  const [resolvendo, setResolvendo] = useState<number | null>(null);

  const resolver = useCallback(
    async (id: number) => {
      setResolvendo(id);
      try {
        await alertasApi.resolver(id);
        await refetch();
      } catch {
        alert("Erro ao resolver alerta. Tente novamente.");
      } finally {
        setResolvendo(null);
      }
    },
    [refetch],
  );

  const pendentes = alertas?.filter((a) => a.conclusaoAlerta === "N") ?? [];
  const resolvidos = alertas?.filter((a) => a.conclusaoAlerta === "S") ?? [];

  const leituraMap = new Map<number, LeituraTelemetria>(
    (leituras.data ?? []).map((l) => [l.idLeitura, l]),
  );

  function AlertList({ items, title }: { items: Alerta[]; title: string }) {
    return (
      <div className={CARD}>
        <div className={HDR}>
          <span className={TTL}>{title}</span>
          <span className="text-xs text-[#5a7a8e]">{items.length} alertas</span>
        </div>
        {items.length === 0 ? (
          <EmptyBox text="Nenhum alerta nesta categoria." />
        ) : (
          <div className="divide-y divide-[#064273]/10">
            {items.map((a: Alerta) => {
              const l = leituraMap.get(a.idLeitura);
              const borderCls =
                a.riscoAlerta === "ALTO"
                  ? "border-red-500"
                  : a.riscoAlerta === "MEDIO"
                    ? "border-yellow-500"
                    : "border-green-500";
              return (
                <div
                  key={a.idAlerta}
                  className={`border-l-4 ${borderCls} px-4 py-3.5 flex items-start justify-between gap-3 transition-colors hover:bg-[#def3f6]/40`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      {riscoBadge(a.riscoAlerta)}
                      {statusBadge(a.conclusaoAlerta)}
                      <span className="text-[11px] text-[#5a7a8e]">
                        Alerta #{a.idAlerta} · Leitura #{a.idLeitura}
                        {l && ` · Est. #${l.idEstacao}`}
                      </span>
                    </div>
                    <p className="text-[13.5px] text-[#0f2a3f] leading-relaxed">
                      {a.descAlerta}
                    </p>
                    {a.observaAlerta && (
                      <p className="text-[11px] text-[#5a7a8e] mt-1">
                        📝 {a.observaAlerta}
                      </p>
                    )}
                    <p className="text-[11px] text-[#5a7a8e] mt-1">
                      ⏱ {formatDateTime(a.horarioAlerta)}
                    </p>
                  </div>
                  {a.conclusaoAlerta === "N" && (
                    <div className="flex-shrink-0">
                      <button
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer border-0 transition-all bg-[#def3f6] text-[#064273] hover:bg-[#76b6c4] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={resolvendo === a.idAlerta}
                        onClick={() => resolver(a.idAlerta)}
                      >
                        {resolvendo === a.idAlerta ? "…" : "✓ Resolver"}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Resumo */}
      <div className={SGRID}>
        <StatCard
          icon="🚨"
          value={loading ? "…" : pendentes.length}
          label="Pendentes"
          urgent={pendentes.length > 0}
        />
        <StatCard
          icon="✓"
          value={loading ? "…" : resolvidos.length}
          label="Resolvidos"
          green
        />
        <StatCard
          icon="📊"
          value={
            loading
              ? "…"
              : (alertas?.filter((a) => a.riscoAlerta === "ALTO").length ?? 0)
          }
          label="Risco ALTO"
        />
        <StatCard
          icon="📋"
          value={loading ? "…" : (alertas?.length ?? 0)}
          label="Total de Alertas"
        />
      </div>

      {loading && <LoadingSpinner text="Buscando alertas..." />}
      {error && <ErrorBox message={error} />}

      {alertas && <AlertList items={pendentes} title="🔴 Alertas Pendentes" />}
      {alertas && (
        <AlertList items={resolvidos} title="✅ Alertas Resolvidos" />
      )}

      {/* IA Mock */}
      <IaMock
        title="Relatório Automático por IA"
        desc="O backend Python irá gerar relatórios automáticos correlacionando alertas, leituras e avistamentos, com sugestões de ação e previsões para as próximas 72h."
        items={[
          "Resumo Executivo (PDF)",
          "Previsão 24h",
          "Previsão 72h",
          "Análise de Padrões",
        ]}
      />
    </div>
  );
}

// ── Página principal ──────────────────────────────────────────────────────────

const TABS = [
  { id: "oceano", label: "🌊 Oceano" },
  { id: "vida", label: "🐋 Vida Marinha" },
  { id: "relatorios", label: "📋 Relatórios" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function Monitoramento() {
  const [tab, setTab] = useState<TabId>("oceano");

  return (
    <div className="max-w-[1280px] mx-auto py-8 px-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div>
          <h1 className="text-[26px] font-black text-[#064273] tracking-tight leading-tight">
            🌐 Central de Monitoramento
          </h1>
          <p className="text-[14px] text-[#5a7a8e] mt-1">
            Dados em tempo real · Alertas automáticos
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex gap-1 bg-[#def3f6] rounded-xl p-1 w-fit overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold cursor-pointer border-0 transition-all whitespace-nowrap flex items-center gap-2
                ${
                  tab === t.id
                    ? "bg-[#064273] text-white shadow-sm"
                    : "bg-transparent text-[#064273] hover:bg-[#064273]/10"
                }`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Conteúdo */}
      {tab === "oceano" && <TabOceano />}
      {tab === "vida" && <TabVidaMarinha />}
      {tab === "relatorios" && <TabRelatorios />}
    </div>
  );
}
