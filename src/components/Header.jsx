import { useEffect, useState } from "react";
import logo from "../assets/logoFinanceiro.png"; // ou .svg

function Header() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <header className="bg-blue-600 dark:bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <div className="flex items-center gap-3">
        <img
          src={logo}
          alt="Logo"
          className="w-8 h-8 object-contain"
          style={{ maxWidth: "32px", maxHeight: "32px" }}
        />
        <h1 className="text-xl font-bold">FinanZen</h1>
      </div>

      <button
        onClick={() => setIsDark(!isDark)}
        className="bg-white dark:bg-gray-800 text-blue-600 dark:text-white px-3 py-1 rounded transition-all"
      >
        {isDark ? "☀️ Claro" : "🌙 Escuro"}
      </button>
    </header>
  );
}

export default Header;
