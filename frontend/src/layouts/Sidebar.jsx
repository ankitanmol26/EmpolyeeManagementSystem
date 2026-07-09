import {
  FiHome,
  FiUsers,
  FiBriefcase,
  FiUser,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const menu = [
  {
    name: "Dashboard",
    icon: FiHome,
    path: "/dashboard",
  },
  {
    name: "Employees",
    icon: FiUsers,
    path: "/dashboard/employees",
  },
  {
    name: "Departments",
    icon: FiBriefcase,
    path: "/dashboard/departments",
  },
  {
    name: "Profile",
    icon: FiUser,
    path: "/dashboard/profile",
  },
  {
    name: "Settings",
    icon: FiSettings,
    path: "/dashboard/settings",
  },
];

function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside className="w-72 bg-slate-900 text-white flex flex-col dark:bg-slate-950">

      <div className="h-20 flex items-center justify-center border-b border-slate-700">

        <h1 className="text-2xl font-bold tracking-wide">

          EMS

        </h1>

      </div>

      <nav className="flex-1 p-5">

        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-xl mb-3 transition-all duration-300 ${
                  isActive
                    ? "bg-indigo-600"
                    : "hover:bg-slate-800"
                }`
              }
            >
              <Icon size={20} />

              <span>{item.name}</span>

            </NavLink>
          );
        })}

      </nav>

      <div className="p-5 border-t border-slate-700">

        <button onClick={handleLogout} className="flex items-center gap-3">

          <FiLogOut />

          Logout

        </button>

      </div>

    </aside>
  );
}

export default Sidebar;
