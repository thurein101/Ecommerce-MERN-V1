import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "../api/apiBase";
import { useSearch } from "../context/searchContext";
import categoryHook from "../hook/categoryHook";
import { useCart } from "../context/cartContext";


const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [auth, setAuth] = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  const catgoreisHook = categoryHook();
  const [cart , setCart ] = useCart();
  

  //keyword function

  const keyWordHandle = async () => {
  try {
    const res = await axios.get(`/product/search-filter/${values.keyword}`);
    
    // ✅ Create the object first
    const searchData = { ...values, result: res.data };
    
    // ✅ Update both State and LocalStorage
    setValues(searchData);
    localStorage.setItem("search", JSON.stringify(searchData));
    
    navigate("/search");
  } catch (e) {
    console.log(e.message);
  }
};

  const handleClick = () => {
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll to top
  };

  const LogOut = async () => {
    const res = await axios.post("/user/logout");
    console.log(res);
    if (res.status == 200) {
      localStorage.removeItem("auth");
      window.location.reload();
    }
  };

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-wide text-gray-800">
          <span className="text-indigo-600">Thurein</span> Shopping
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-5 text-gray-700 font-medium">
          {/* 🔍 Search */}
          <div className="relative">
            {/* Icon Button */}
            <button
              type="submit"
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 rounded-md hover:bg-gray-100 transition"
            >
              {showSearch ? (
                /* ❌ Cross icon */
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                /* 🔍 Search icon */
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35M16.65 10.5a6.15 6.15 0 11-12.3 0 6.15 6.15 0 0112.3 0z"
                  />
                </svg>
              )}
            </button>

            {/* 🔽 Animated Search Bar */}
            <div
              className={`
      absolute right-0 mt-2 w-64
      transition-all duration-300 ease-out
      ${showSearch ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3 pointer-events-none"}
    `}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault(); // prevent default page reload
                  if (values.keyword.trim() !== "") {
                    keyWordHandle(); // call your search function
                  } else {
                    setShowSearch(!showSearch); // toggle search bar if empty
                  }
                }}className="flex w-full max-w-md gap-2"
              >
                <input
    type="text"
    value={values.keyword} 
    placeholder="Search products..."
    className="
      flex-1 h-10 px-4
      text-sm
      border border-gray-300
      rounded-md
      bg-white
      shadow-sm
      focus:outline-none
      focus:ring-2 focus:ring-indigo-500
    "
    onChange={(e) =>
      setValues({ ...values, keyword: e.target.value })
    }
  />
  
  <button
    onClick={keyWordHandle} // Replace 'handleSubmit' with your actual search function name
    className="
      h-10 px-5
      bg-indigo-600 
      hover:bg-indigo-700 
      text-white 
      text-sm 
      font-medium 
      rounded-md 
      transition-colors
    "
  >
    Search
  </button>
              </form>
            </div>
          </div>

          <NavItem to="/" label="Home" onClick={handleClick} />
          <div className="relative inline-block text-left">

      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-3 py-2 text-sm border rounded-md bg-white hover:bg-gray-50"
      >
        Category
        <svg
          className={`w-4 h-4 transition-transform ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 mt-2 w-40 bg-white border rounded-md shadow-sm z-50">
          <ul className="text-sm text-gray-700">
            <li className="px-3 py-2 hover:bg-indigo-50 cursor-pointer">
              <NavItem to="/category" label="All Categories" onClick={handleClick} />
            </li>
            {catgoreisHook.map((c)=>(
              
              <li className="px-3 py-2 hover:bg-indigo-50 cursor-pointer">
               <NavItem to={`/category-list/${c.slug}`} label={`${c.name}`} onClick={handleClick} />
            </li>
            ))}
            
          </ul>
        </div>
      )}
    </div>
    <NavLink to="/cart" className="relative group p-2 flex items-center justify-center">
  {/* Shopping Bag Icon */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-7 h-7 text-gray-700 group-hover:text-indigo-600 transition-colors"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"
    />
  </svg>

  {/* 🔴 The Badge Section */}
  {cart?.length > 0 && (
    <div className="absolute top-0 right-0 -mr-1 -mt-1 flex items-center justify-center">
      {/* 🌊 Temporary Ripple Effect */}
      <span 
        key={`ripple-${cart.length}`} 
        className="absolute inset-0 rounded-full bg-indigo-400 animate-ripple h-full w-full"
      ></span>

      {/* 🔢 Main Badge Count */}
      <span
        key={`count-${cart.length}`}
        className="relative flex h-5 w-5 items-center justify-center 
                   rounded-full bg-indigo-600 text-[10px] font-bold text-white 
                   shadow-sm ring-2 ring-white animate-bounce-once"
      >
        {cart.length}
      </span>
    </div>
  )}
</NavLink>

          

          {!auth.user ? (
            <>
              <NavItem to="/register" label="Register" onClick={handleClick} />
              <NavItem to="/login" label="Login" onClick={handleClick} />
            </>
          ) : (
            <>


              {/* User Dropdown */}
              <li className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="
            flex items-center gap-1
            px-2 py-1
            rounded-md
            hover:text-indigo-600
            transition
          "
                >
                  <span className="text-sm">{auth?.user?.name}</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      userMenuOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md overflow-hidden">
                    <NavLink
                      to={`/dashboard/${auth.user.role === 1 ? "admin" : "user"}`}
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-4 py-2 text-sm hover:bg-indigo-600 hover:text-white transition"
                    >
                      Dashboard
                    </NavLink>

                    <button
                      onClick={LogOut}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-red-600 hover:text-white transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </li>
            </>
          )}
        </ul>
        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          {open ? (
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Animated Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out
          ${open ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"}`}
      >
        <ul className="bg-white border-t px-6 py-4 space-y-4 text-gray-700 font-medium">
          <NavItem to="/home" label="Home" onClick={handleClick} />
          <NavItem to="/category" label="Category" onClick={handleClick} />
          <NavItem to="/register" label="Register" onClick={handleClick} />
          <div className="bg-indigo-600">
            <NavItem to="/login" label="Login" onClick={handleClick} />
          </div>
        </ul>
      </div>
    </nav>
  );
};

/* Nav Item */
const NavItem = ({ to, label, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `block px-3 py-2 rounded-md transition-all duration-300
       ${isActive ? "text-indigo-600" : "hover:text-indigo-600 hover:translate-x-1"}`
    }
  >
    {label}
  </NavLink>
);

export default NavBar;
