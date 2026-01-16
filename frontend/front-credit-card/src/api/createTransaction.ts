import { API_URL } from "./config";

export async function createTransaction(
  userId: number,
  creditCardId: number,
  amount: number,
  description: string
) {
  const res = await fetch(`${API_URL}/Transactions/user/${userId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount,
      description,
      creditCardId 
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || "Error creando transacción");
  }

  return res.json();
}
