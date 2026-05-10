import React from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  // ✅ Total Price Logic (Fix: handle empty cart and formatting)
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
      return "$0.00";
    }
  };

  // ✅ Remove Item Logic
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  return (
   <div className="bg-white min-h-screen py-12">
  <div className="max-w-6xl mx-auto px-6">
    
    {/* 🍏 Refined Header */}
    <div className="mb-12">
      <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
        Bag
      </h1>
      <p className="text-base font-medium text-gray-400 mt-1">
        {cart?.length || 0} ITEMS
      </p>
    </div>

    <div className="flex flex-col lg:flex-row gap-16">
      
      {/* ⬅️ Cart Items Section */}
      <div className="lg:w-[60%] space-y-10">
        {cart?.length > 0 ? (
          cart.map((p, index) => (
            <div
              key={p._id + index}
              className="group flex items-start gap-8 pb-10 border-b border-gray-100 last:border-0"
            >
              {/* Product Image */}
              <div className="w-32 h-32 bg-gray-50 rounded-[2rem] overflow-hidden flex-shrink-0 border border-gray-50">
                <img
                  src={`http://localhost:4000/product/product-photo/${p._id}`}
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1 py-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 leading-snug">
                      {p.name}
                    </h3>
                    <p className="text-base text-gray-500 mt-1 line-clamp-2 font-normal">
                      {p.description}
                    </p>
                  </div>
                  <span className="text-lg font-bold text-gray-900 ml-4">
                    ${p.price}
                  </span>
                </div>

                <div className="mt-6">
                  {/* Remove Button with SVG Hover */}
                  <button
                    onClick={() => removeCartItem(p._id)}
                    className="p-2 -ml-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-300"
                    title="Remove Item"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-24 text-center">
            <p className="text-gray-400 text-lg font-medium">Your bag is empty.</p>
            <button 
              onClick={() => navigate("/")}
              className="mt-6 text-blue-600 font-bold text-base hover:underline flex items-center justify-center gap-2 mx-auto"
            >
              Start Shopping 
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* ➡️ Summary Section */}
      <div className="lg:w-[40%]">
        <div className="bg-gray-50/70 rounded-[2.5rem] p-10 sticky top-24 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-8 tracking-tight">
            Order Summary
          </h3>

          <div className="space-y-5 mb-8">
            <div className="flex justify-between text-base">
              <span className="text-gray-500">Subtotal</span>
              <span className="text-gray-900 font-semibold">{totalPrice()}</span>
            </div>
            <div className="flex justify-between text-base">
              <span className="text-gray-500">Shipping</span>
              <span className="text-green-600 font-bold">Free</span>
            </div>
            <div className="pt-6 border-t border-gray-200 flex justify-between items-center">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <span className="text-2xl font-black text-gray-900 tracking-tight">
                {totalPrice()}
              </span>
            </div>
          </div>

          <div className="space-y-6">
            {auth?.token ? (
              <>
                <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Shipping Address</span>
                  </div>
                  {auth?.user?.address ? (
                    <>
                      <p className="text-base text-gray-700 font-medium leading-relaxed mb-4">
                        {auth?.user?.address}
                      </p>
                      <button 
                        onClick={() => navigate('/dashboard/profile')} 
                        className="text-sm font-bold text-blue-600 hover:text-blue-700 underline underline-offset-4"
                      >
                        Change Address
                      </button>
                    </>
                  ) : (
                    <button 
                      onClick={() => navigate('/dashboard/profile')} 
                      className="w-full py-4 bg-blue-50 text-blue-600 font-bold rounded-2xl hover:bg-blue-100 transition-all"
                    >
                      + Add Address
                    </button>
                  )}
                </div>

                <button 
                  disabled={!auth?.user?.address || cart?.length === 0}
                  className={`w-full py-5 rounded-full font-bold text-base transition-all active:scale-[0.97] shadow-xl
                    ${auth?.user?.address && cart?.length > 0 
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-100' 
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'}`}
                >
                  Confirm and Pay
                </button>
              </>
            ) : (
              <button 
                onClick={() => navigate('/login', { state: '/cart' })}
                className="w-full py-5 bg-gray-900 text-white font-bold text-base rounded-full hover:bg-black transition-all active:scale-[0.97] shadow-xl shadow-gray-200"
              >
                Sign in to Checkout
              </button>
            )}
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-4 opacity-40 grayscale scale-90">
             <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4" alt="Visa" />
             <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-6" alt="Mastercard" />
             <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-4" alt="Paypal" />
          </div>
        </div>
      </div>

    </div>
  </div>
</div>
  );
};

export default CartPage;
