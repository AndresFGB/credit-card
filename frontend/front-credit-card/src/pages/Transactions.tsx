import { useState } from "react";
import ScrollablePanel from "../components/shared/ScrollablePanel";
import { createTransaction } from "../api/createTransaction";
import authService from "../services/authService";
import type { ActiveCharge } from "../interfaces/activecharge";
import ActiveChargeItem from "../components/transactions/ActiveCharges";
import PaymentHistory from "../components/transactions/PaymentHistory";

function Transactions() {
  const [activeTab, setActiveTab] = useState<"history" | "charges">("history");

  const [charges, setCharges] = useState<ActiveCharge[]>([
   { id: 1, description: "Spotify", amount: 3000, creditCardId: 31 },
  { id: 2, description: "Netflix", amount: 5.777, creditCardId: 29 },

  { id: 3, description: "Amazon Prime", amount: 8.99, creditCardId: 29 },
  { id: 4, description: "Disney Plus", amount: 7.49, creditCardId: 29 },

  { id: 5, description: "YouTube Premium", amount: 11.99, creditCardId: 30 },
  { id: 6, description: "Google Drive Storage", amount: 2.99, creditCardId: 30 },

  { id: 7, description: "Apple Music", amount: 10.99, creditCardId: 31 },
  { id: 8, description: "iCloud+", amount: 0.99, creditCardId: 31 }
  ]);

  const handleGenerateTransaction = async (charge: ActiveCharge) => {
    try {
      const userIdStr = authService.getUserId();
      if (!userIdStr) return;

      const userId = Number(userIdStr);

      await createTransaction(
        userId,
        charge.creditCardId,
        charge.amount,
        charge.description
      );

      // quitar el cobro activo una vez aceptado
      setCharges((prev) => prev.filter((c) => c.id !== charge.id));

      alert("Transacción creada");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("No se pudo crear la transacción");
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex min-w-screen p-8">
      <div className="bg-white rounded-xl shadow-md p-10 flex-1 text-center">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">
          Mis Transacciones
        </h1>
        <ScrollablePanel>
          {/* Tabs */}
          <div className="flex border-b mb-6">
            <button
              onClick={() => setActiveTab("history")}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "history"
                  ? "border-b-2 border-slate-800 text-slate-800"
                  : "text-slate-500"
              }`}
            >
              Historial de Pagos
            </button>

            <button
              onClick={() => setActiveTab("charges")}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "charges"
                  ? "border-b-2 border-slate-800 text-slate-800"
                  : "text-slate-500"
              }`}
            >
              Cobros Activos
            </button>
          </div>

          {activeTab === "history" && <PaymentHistory />}
          {activeTab === "charges" && (
            <div className="space-y-4">
              {charges.map((charge) => (
                <ActiveChargeItem
                  key={charge.creditCardId}
                  charge={charge}
                  onAccept={handleGenerateTransaction}
                  onReject={(id) =>
                    setCharges((prev) => prev.filter((c) => c.id !== id))
                  }
                />
              ))}
            </div>
          )}
        </ScrollablePanel>
      </div>
    </div>
  );
}

export default Transactions;
