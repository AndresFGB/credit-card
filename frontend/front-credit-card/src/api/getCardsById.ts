import type { CreditCard } from "../interfaces/creditCardInterface";
import { API_URL } from "./config";

export async function getCardByID(userId: number): Promise<CreditCard[]> {
  const res = await fetch(`${API_URL}/CreditCards/user/${userId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Error al traer tarjetas (${res.status})`);
  }

  return res.json() as Promise<CreditCard[]>;
}
