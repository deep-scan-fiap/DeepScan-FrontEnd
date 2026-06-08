import { API_BASE } from "./config";
import type { ZonaMonitora } from "../types";

const base = `${API_BASE}/zonas`;

async function json<T>(res: Response): Promise<T> {
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export const zonasApi = {
  listar: () => fetch(base).then((r) => json<ZonaMonitora[]>(r)),

  criar: (d: Omit<ZonaMonitora, "idZona">) =>
    fetch(base, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(d),
    }).then((r) => json<ZonaMonitora>(r)),

  deletar: (id: number) =>
    fetch(`${base}/${id}`, {
      method: "DELETE",
    }),
};
