import { API_URL } from "./config";

export async function deleteCard(userId: number, id: number) {
  const res = await fetch(
    `${API_URL}/CreditCards/user/${userId}/${id}`,
    { method: "DELETE" }
  );

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || "Error eliminando tarjeta");
  }
}