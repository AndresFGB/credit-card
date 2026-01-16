import type { ActiveCharge } from "../../interfaces/activecharge";

interface ActiveChargeItemProps {
  charge: ActiveCharge;
  onAccept: (charge: ActiveCharge) => void;
  onReject: (id: number) => void;
}

function ActiveChargeItem({
  charge,
  onAccept,
  onReject,
}: ActiveChargeItemProps) {
  return (
    <div className="border rounded-lg p-4 flex justify-between items-center">
      <div>
        <p className="text-sm text-slate-500">
          Tarjeta ID: {charge.creditCardId}
        </p>
        <p className="font-semibold text-slate-700">{charge.description}</p>
        <p className="text-sm text-slate-500">${charge.amount}</p>
      </div>

      <div className="space-x-2">
        <button
          onClick={() => onAccept(charge)}
          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
        >
          Aceptar
        </button>

        <button
          onClick={() => onReject(charge.id)}
          className="bg-slate-300 text-slate-700 px-3 py-1 rounded hover:bg-slate-400"
        >
          Rechazar
        </button>
      </div>
    </div>
  );
}

export default ActiveChargeItem;
