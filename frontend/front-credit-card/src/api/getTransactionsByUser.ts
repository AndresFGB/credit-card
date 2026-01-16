import { API_URL } from "./config";

export async function getTransactionsByUser(userId: number) {
  const res = await fetch(`${API_URL}/Transactions/user/${userId}`);

  if (!res.ok) {
    throw new Error("Error cargando historial");
  }

  return res.json();
}