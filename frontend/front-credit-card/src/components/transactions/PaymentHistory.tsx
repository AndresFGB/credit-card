import { useEffect, useState } from "react";
import authService from "../../services/authService";
import { getTransactionsByUser } from "../../api/getTransactionsByUser";
import type { Transaction } from "../../interfaces/transaction";

function PaymentHistory() {
   const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const userIdStr = authService.getUserId();
      if (!userIdStr) return;

      const data = await getTransactionsByUser(Number(userIdStr));
      setTransactions(data);
      setLoading(false);
    }

    load();
  }, []);

  if (loading) return <p>Cargando historial...</p>;

  if (transactions.length === 0)
    return <p className="text-slate-500">No hay transacciones</p>;

  return (
    <div className="space-y-3">
      {transactions.map(tx => (
        <div
          key={tx.id}
          className="border rounded-lg p-4 flex justify-between"
        >
          <div>
            <p className="font-semibold">{tx.description}</p>
            <p className="text-sm text-slate-500">
              Tarjeta #{tx.creditCardId}
            </p>
            <p className="text-xs text-slate-400">
              {new Date(tx.createdAt).toLocaleString("es-CO")}
            </p>
          </div>

          <p className="font-bold text-red-600">
            - ${tx.amount.toLocaleString("es-CO")}
          </p>
        </div>
      ))}
    </div>
  
  );
}

export default PaymentHistory;
