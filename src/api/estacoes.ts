import { API_BASE } from "./config";
import type { EstacaoMonitora } from "../types";

const base = `${API_BASE}/estacoes`;

async function json<T>(res: Response): Promise<T> {
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export const estacoesApi = {
  listar: () => fetch(base).then((r) => json<EstacaoMonitora[]>(r)),

  buscar: (id: number) =>
    fetch(`${base}/${id}`).then((r) => json<EstacaoMonitora>(r)),

  criar: (d: Omit<EstacaoMonitora, "idEstacao">) =>
    fetch(base, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(d),
    }).then((r) => json<EstacaoMonitora>(r)),

  atualizar: (id: number, d: EstacaoMonitora) =>
    fetch(`${base}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(d),
    }).then((r) => json<EstacaoMonitora>(r)),

  deletar: (id: number) =>
    fetch(`${base}/${id}`, {
      method: "DELETE",
    }),
};
