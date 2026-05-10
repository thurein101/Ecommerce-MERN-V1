import React from "react";
import { NavLink } from "react-router-dom";
const UserMenu = () => {
  return (
    <div className="w-full">
      <div className="text-sm font-medium bg-white border rounded-lg overflow-hidden">
        <NavLink
          to="/dashboard/user"
          className={({ isActive }) =>
            `block w-full px-6 py-3 border-b transition
             ${
               isActive
                 ? "bg-indigo-100 text-indigo-700 font-semibold"
                 : "hover:bg-gray-100 text-gray-700"
             }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) =>
            `block w-full px-6 py-3 border-b transition
             ${
               isActive
                 ? "bg-indigo-100 text-indigo-700 font-semibold"
                 : "hover:bg-gray-100 text-gray-700"
             }`
          }
        >
          Profile
        </NavLink>

        <NavLink
          to="/dashboard/orders"
          className={({ isActive }) =>
            `block w-full px-6 py-3 border-b transition
             ${
               isActive
                 ? "bg-indigo-100 text-indigo-700 font-semibold"
                 : "hover:bg-gray-100 text-gray-700"
             }`
          }
        >
          Orders
        </NavLink>
      </div>
    </div>
  );
};

export default UserMenu;
