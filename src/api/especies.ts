import { API_BASE } from "./config";
import type { Especie } from "../types";

const base = `${API_BASE}/especies`;

async function json<T>(res: Response): Promise<T> {
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export const especiesApi = {
  listar: () => fetch(base).then((r) => json<Especie[]>(r)),

  buscar: (id: number) => fetch(`${base}/${id}`).then((r) => json<Especie>(r)),

  criar: (d: Omit<Especie, "idEspecie">) =>
    fetch(base, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(d),
    }).then((r) => json<Especie>(r)),

  atualizar: (id: number, d: Especie) =>
    fetch(`${base}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(d),
    }).then((r) => json<Especie>(r)),

  deletar: (id: number) =>
    fetch(`${base}/${id}`, {
      method: "DELETE",
    }),
};
