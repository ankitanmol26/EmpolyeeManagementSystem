import { FiBell, FiMoon, FiSearch, FiSun } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

function Navbar({ searchValue, onSearchChange }) {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-20 px-8 shadow-sm flex items-center justify-between bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800">

      <div className="relative w-96">

        <FiSearch className="absolute left-4 top-4 text-gray-500" />

        <input
          type="text"
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search employees..."
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-400 outline-none dark:border-slate-700 dark:bg-slate-800"
        />

      </div>

      <div className="flex items-center gap-6">

        <button onClick={toggleTheme} className="rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800">
          {theme === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>

        <button>

          <FiBell size={22} />

        </button>

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">

            A

          </div>

          <div>

            <h4 className="font-semibold">

              {user?.name || "Admin"}

            </h4>

            <p className="text-sm text-gray-500">

              {user?.role || "Administrator"}

            </p>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Navbar;