import { API_BASE } from "./config";
import type { LeituraTelemetria } from "../types";

const base = `${API_BASE}/leituras`;

async function json<T>(res: Response): Promise<T> {
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export const leiturasApi = {
  listar: () => fetch(base).then((r) => json<LeituraTelemetria[]>(r)),

  buscar: (id: number) =>
    fetch(`${base}/${id}`).then((r) => json<LeituraTelemetria>(r)),

  listarPorEstacao: (idEstacao: number) =>
    fetch(`${base}/estacao/${idEstacao}`).then((r) =>
      json<LeituraTelemetria[]>(r),
    ),

  criar: (d: Omit<LeituraTelemetria, "idLeitura">) =>
    fetch(base, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(d),
    }).then((r) => json<LeituraTelemetria>(r)),

  deletar: (id: number) =>
    fetch(`${base}/${id}`, {
      method: "DELETE",
    }),
};
