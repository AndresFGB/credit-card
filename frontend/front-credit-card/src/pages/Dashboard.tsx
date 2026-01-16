import NavigationButton from "../components/shared/NavigationButton";
import authService from "../services/authService";

function Dashboard() {
  const username = authService.getUsername();

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-md p-10 text-center">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          Bienvenido, {username ?? "Usuario"}
        </h1>

        <div className="flex gap-4 justify-center">
          <NavigationButton label="Gestionar mis tarjetas" to="/cards" />
          <NavigationButton label="Ver mis transacciones" to="/transactions" />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;