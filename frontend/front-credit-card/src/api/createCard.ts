import type { CreditCard } from "../interfaces/creditCardInterface";
import { API_URL } from "./config";

export async function createCard(userId: number): Promise<CreditCard> {
  const res = await fetch(`${API_URL}/CreditCards`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      type: "AUTO",
      last4: "0000",
      creditLimit: 0,
      balance: 0
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Error al crear tarjeta (${res.status})`);
  }

  return res.json() as Promise<CreditCard>;
}