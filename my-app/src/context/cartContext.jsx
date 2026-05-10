import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Page load ဖြစ်တာနဲ့ localStorage က data ကို တစ်ခါတည်း ယူမယ်
    const existingCartItem = localStorage.getItem("cart");
    return existingCartItem ? JSON.parse(existingCartItem) : [];
  });

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { useCart, CartProvider };