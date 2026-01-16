interface ItemCardProps {
  id: number;
  type: string;
  last4: string;
  creditLimit:number,
  balance: number;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

function ItemCard({id, type, last4, creditLimit, balance, onEdit, onDelete  }:ItemCardProps){
 return (
   <div className="border rounded-lg p-4 flex justify-between items-center">
      <div>
        <p className="font-semibold">
          {type} <br></br> **** {last4}
        </p>
        <p className="text-sm text-slate-500">
          Cupo de: ${creditLimit}
        </p>
        <p className="text-sm text-slate-500">
          Saldo: ${balance}
        </p>
      </div>

      <div className="space-x-2">
        <button
          onClick={() => onEdit(id)}
          className="text-blue-600 hover:underline"
        >
          Editar
        </button>

        <button
          onClick={() => onDelete(id)}
          className="text-red-600 hover:underline"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default ItemCard;