import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Cards from "./pages/Cards";
import Transactions from "./pages/Transactions";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/cards" element={<Cards/>}></Route>
      <Route path="/transactions" element={<Transactions/>}></Route>
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
