import { API_BASE } from "./config";
import type { Avistamento } from "../types";

const base = `${API_BASE}/avistamentos`;

async function json<T>(res: Response): Promise<T> {
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export const avistamentosApi = {
  listar: () => fetch(base).then((r) => json<Avistamento[]>(r)),

  buscar: (id: number) =>
    fetch(`${base}/${id}`).then((r) => json<Avistamento>(r)),

  listarPorEspecie: (idEspecie: number) =>
    fetch(`${base}/especie/${idEspecie}`).then((r) => json<Avistamento[]>(r)),

  criar: (d: Omit<Avistamento, "idAvista">) =>
    fetch(base, {
      method: "POST", // Criação
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(d),
    }).then((r) => json<Avistamento>(r)),

  atualizar: (id: number, d: Avistamento) =>
    fetch(`${base}/${id}`, {
      method: "PUT", // Atualização
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(d),
    }).then((r) => json<Avistamento>(r)),

  deletar: (id: number) =>
    fetch(`${base}/${id}`, {
      method: "DELETE",
    }),
};
