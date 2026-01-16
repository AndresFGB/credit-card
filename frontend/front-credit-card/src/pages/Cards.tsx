import { useEffect, useState } from "react";
import type { CreditCard } from "../interfaces/creditCardInterface";
import ScrollablePanel from "../components/shared/ScrollablePanel";
import ItemCard from "../components/card/ItemCard";
import authService from "../services/authService";
import { getCardByID } from "../api/getCardsById";
import { createCard } from "../api/createCard";
import { updateCard } from "../api/updateCard";
import { deleteCard } from "../api/deleteCard";

function Cards() {
  const [cards, setCards] = useState<CreditCard[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError("");

        const userIdStr = authService.getUserId();
        if (!userIdStr) throw new Error("No hay userId en sesión");

        const userId = Number(userIdStr);
        console.log(userId);
        const data = await getCardByID(userId);
        setCards(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Error cargando tarjetas");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const handleCreate = async () => {
    try {
      const userId = authService.getUserId();

      if (!userId) return;

      const newCard = await createCard(Number(userId));

      setCards((prev) => [...prev, newCard]);
    } catch (error) {
      console.error("Error creando tarjeta", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
    const userIdStr = authService.getUserId();
    if (!userIdStr) return;

    const ok = confirm("¿Seguro que deseas eliminar esta tarjeta?");
    if (!ok) return;

    await deleteCard(Number(userIdStr), id);

    setCards(prev => prev.filter(c => c.id !== id));
  } catch (error) {
    console.error("Error eliminando tarjeta", error);
    alert("No se pudo eliminar la tarjeta");
  }
  };

  const handleEdit = async (id: number) => {
    try {
      const userIdStr = authService.getUserId();
      if (!userIdStr) return;

      const card = cards.find((c) => c.id === id);
      if (!card) return;

      const newType = prompt(
        "Tipo de tarjeta (Visa, MasterCard, Amex, Discover):",
        card.type
      );
      if (!newType) return;

      const newLast4Raw = prompt("Últimos 4 dígitos:", card.last4);
      if (!newLast4Raw) return;

      const newLast4 = newLast4Raw.replace(/\D/g, "").slice(0, 4);

      if (newLast4.length !== 4) {
        alert("Debes ingresar exactamente 4 dígitos numéricos");
        return;
      }

      const newLimitStr = prompt("Nuevo cupo:", card.creditLimit.toString());
      if (!newLimitStr) return;

      const newLimit = Number(newLimitStr);
      if (isNaN(newLimit) || newLimit <= 0) {
        alert("El cupo debe ser un número válido");
        return;
      }

      const updated = await updateCard(
        Number(userIdStr),
        id,
        newType,
        newLast4,
        newLimit
      );

      setCards((prev) => prev.map((c) => (c.id === id ? updated : c)));
    } catch (error) {
      console.error("Error editando tarjeta", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex min-w-screen p-8">
      <div className="bg-white rounded-xl shadow-md p-10 flex-1 text-center">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">
          Gestionar mis Tarjetas
        </h1>
        <ScrollablePanel>
          {loading && <p className="text-slate-500">Cargando...</p>}
          {error && <p className="text-red-600">{error}</p>}

          {!loading && !error && (
            <div className="space-y-4">
              {cards.map((card) => (
                <ItemCard
                  id={card.id}
                  type={card.type}
                  last4={card.last4}
                  creditLimit={card.creditLimit}
                  balance={card.balance}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </ScrollablePanel>
        <div className="py-6" onClick={handleCreate}>
          <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition">
            Agregar tarjeta
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cards;
