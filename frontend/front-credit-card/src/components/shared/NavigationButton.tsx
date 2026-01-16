import { useNavigate } from "react-router-dom";
import type { NavigationButtonProps } from "../../interfaces/NavigationButtonProps";



function NavigationButton({ label, to }: NavigationButtonProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
    >
      {label}
    </button>
  );
}

export default NavigationButton;