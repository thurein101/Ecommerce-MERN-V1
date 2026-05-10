import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", to: "/dashboard/admin" },
    { name: "Create Categories", to: "/dashboard/create-category" },
    { name: "Products", to: "/dashboard/create-products" },
    { name: "Users", to: "/dashboard/Users" },
  ];

  return (
    <div className="w-full">
      {/* Mobile toggle button */}
      <div className="md:hidden flex justify-end mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md focus:outline-none"
        >
          {isOpen ? "Close Menu" : "Open Menu"}
        </button>
      </div>

      {/* Menu */}
      <div
        className={`bg-white border rounded-lg overflow-hidden transition-all duration-300
        ${isOpen ? "max-h-screen" : "max-h-0 md:max-h-full"} md:max-h-full`}
      >
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `block w-full px-6 py-3 border-b transition
              ${isActive
                ? "bg-indigo-100 text-indigo-700 font-semibold"
                : "hover:bg-gray-100 text-gray-700"}`
            }
            onClick={() => setIsOpen(false)} // close menu on mobile after click
          >
            {item.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default AdminMenu;
