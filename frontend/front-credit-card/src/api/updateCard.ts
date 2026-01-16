import { API_URL } from "./config";
import type { CreditCard } from "../interfaces/creditCardInterface";

export async function updateCard(
    userId: number,
  id: number,
  type: string,
  last4: string,
  creditLimit: number

): Promise<CreditCard> {
  const res = await fetch(
   `${API_URL}/CreditCards/user/${userId}/${id}`
    , {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type,
      last4,
      creditLimit,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || "Error actualizando tarjeta");
  }

  return res.json();
}
