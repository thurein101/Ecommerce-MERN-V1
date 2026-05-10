import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/apiBase";
import { useEffect } from "react";
import { useCart } from "../context/cartContext";

import { toast } from "react-hot-toast";

const CategoryList = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Loading state
  const [cart, setCart] = useCart();

  const getProductByCate = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/product/category-list/${params.slug}`);
      setProducts(res.data?.product || []);
      setCategory(res.data?.category || null);
    } catch (e) {
      console.log(e.message);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Slug ပြောင်းတိုင်း သို့မဟုတ် Reload လုပ်တိုင်း Data ခေါ်ဖို့
  useEffect(() => {
    if (params?.slug) getProductByCate();
  }, [params?.slug]);
  
  
  
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 capitalize mb-2">
            {loading ? "Loading..." : category?.name || "Category"}
          </h1>
          <p className="text-gray-500 text-sm">
            {products?.length} products found in this category
          </p>
          <div className="h-1 w-20 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {loading ? (
          /* Simple Loading Spinner */
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          /* Product Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.length > 0 ? (
              products.map((p) => (
                <div
                  key={p._id}
                  className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  {/* Image Area */}
                  <div className="relative h-60 bg-gray-50 overflow-hidden">
                    <img
                      src={`http://localhost:4000/product/product-photo/${p._id}`}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-xs font-bold text-indigo-600 shadow-sm">
                      ${p.price}
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-gray-800 truncate mb-1">
                      {p.name}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2 h-8">
                      {p.description}
                    </p>

                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => navigate(`/detail/${p.slug}`)}
                        className="flex-1 px-3 py-2 text-xs font-semibold border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                      >
                        Details
                      </button>
                      <button
                        className="flex-1 px-3 py-2 text-xs font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-md shadow-indigo-200 transition"
                        onClick={() => {
                          setCart([...cart, p]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, p]),
                          );
                          toast.success("Item added to cart!");
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20 bg-gray-50 rounded-2xl">
                <p className="text-gray-400 font-medium">
                  No products found in this category.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
