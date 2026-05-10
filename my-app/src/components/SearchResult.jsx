import React, { useEffect } from "react";
import { useSearch } from "../context/searchContext";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext"; // ✅ Added for cart logic
import { toast } from "react-hot-toast"; // ✅ Added for feedback

const SearchResult = () => {
  const [values, setValues] = useSearch();
  const [cart, setCart] = useCart(); // ✅ Get cart state
  const navigate = useNavigate();

  // ✅ Hydrate data on reload
  // Search logic fix main
  useEffect(() => {
    const data = localStorage.getItem("search");
    if (data) setValues(JSON.parse(data));
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800">Search Results</h1>
          <p className="text-gray-500 mt-2">
            {values?.result?.length < 1
              ? "No products found"
              : `Found ${values?.result?.length} items for your search`}
          </p>
          <div className="h-1.5 w-20 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Grid of products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {values?.result?.length > 0 ? (
            values.result.map((p) => (
              <div
                key={p._id}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300"
              >
                {/* Image Area */}
                <div className="relative h-56 bg-gray-50 overflow-hidden">
                  <img
                    src={`http://localhost:4000/product/product-photo/${p._id}`}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur px-2.5 py-1 rounded-lg font-bold text-indigo-600 shadow-sm">
                    ${p.price}
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-5">
                  <h3 className="font-bold text-gray-800 truncate group-hover:text-indigo-600 transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1 line-clamp-2 h-8 leading-relaxed">
                    {p.description}
                  </p>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <button
                      onClick={() => navigate(`/detail/${p.slug}`)}
                      className="py-2.5 text-xs font-bold border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 active:scale-95 transition"
                    >
                      VIEW
                    </button>
                    <button
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p]),
                        );
                        toast.success("Item added to cart!");
                      }}
                      className="py-2.5 text-xs font-bold bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 active:scale-95 transition"
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // No result found UI
            <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-gray-200">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-gray-400 font-medium">
                Sorry, we couldn't find what you're looking for.
              </p>
              <button
                onClick={() => navigate("/")}
                className="mt-4 text-indigo-600 font-semibold hover:underline"
              >
                Back to Home
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
