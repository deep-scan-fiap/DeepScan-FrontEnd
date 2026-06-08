import { API_BASE } from "./config";
import type { Alerta } from "../types";

const base = `${API_BASE}/alertas`;

async function json<T>(res: Response): Promise<T> {
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export const alertasApi = {
  listar: () => fetch(base).then((r) => json<Alerta[]>(r)),

  listarPendentes: () =>
    fetch(`${base}/pendentes`).then((r) => json<Alerta[]>(r)),

  resolver: (id: number) =>
    fetch(`${base}/${id}/resolver`, {
      method: "PUT",
    }).then((r) => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
    }),

  deletar: (id: number) =>
    fetch(`${base}/${id}`, {
      method: "DELETE",
    }),
};
