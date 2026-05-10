import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "../api/apiBase";

const ProductDetail = () => {
  const [oneProduct, setOneProduct] = useState(null);
  const params = useParams();
  const [related, setRelated] = useState([]);

const getRelatedProduct = async (pid, cid) => {
  try {
    const res = await axios.get(
      `/product/similar-product/${pid}/${cid}`
    );
    setRelated(res.data);
  } catch (e) {
    console.log(e.message);
  }
};

const getSingleProduct = async () => {
  try {
    const res = await axios.get(
      `/product/getsingle-product/${params.slug}`
    );

    setOneProduct(res.data);

    getRelatedProduct(
      res.data._id,
      res.data.category._id
    );
  } catch (e) {
    console.log(e.message);
  }
};

  useEffect(() => {
    if (params?.slug) getSingleProduct();
   
  }, [params?.slug]);

 

  // Loading state
  if (!oneProduct) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
   <div className="bg-white min-h-screen">
  <div className="max-w-6xl mx-auto px-4 py-12">
    {/* 🟢 PRODUCT DETAIL SECTION */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
      {/* IMAGE - Glassmorphism effect background */}
      <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 shadow-sm group">
        <img
          src={`http://localhost:4000/product/product-photo/${oneProduct._id}`}
          alt={oneProduct.name}
          className="w-full h-[450px] object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>

      {/* INFO - Cleaner Typography */}
      <div className="flex flex-col">
        <div className="mb-6">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">
            In Stock
          </span>
          <h1 className="text-4xl font-bold text-gray-900 mt-3 leading-tight">
            {oneProduct.name}
          </h1>
          <div className="flex items-center gap-4 mt-4">
            <span className="text-3xl font-extrabold text-gray-900">
              ${oneProduct.price}
            </span>
            <span className="text-sm text-gray-400 line-through">
              ${(oneProduct.price * 1.2).toFixed(0)}
            </span>
          </div>
        </div>

        <div className="border-t border-b border-gray-100 py-6 mb-6">
          <h3 className="text-sm font-bold text-gray-800 uppercase mb-2">Description</h3>
          <p className="text-gray-600 leading-relaxed">
            {oneProduct.description}
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="flex-1 px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all">
            Add to Cart
          </button>
          <button className="flex-1 px-8 py-4 border-2 border-gray-900 text-gray-900 font-bold rounded-xl hover:bg-gray-900 hover:text-white active:scale-95 transition-all">
            Buy Now
          </button>
        </div>
      </div>
    </div>

    {/* 🔵 ADDITIONAL DETAILS SECTION */}
    <div className="mt-20">
      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Product Details</h2>
        <div className="h-px flex-1 bg-gray-100"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-600">
        <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
          <h4 className="font-bold text-gray-800 mb-2">Quality Material</h4>
          <p className="text-sm leading-relaxed">Crafted with the highest standards of durability and comfort.</p>
        </div>
        <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
          <h4 className="font-bold text-gray-800 mb-2">Fast Delivery</h4>
          <p className="text-sm leading-relaxed">Ships within 24-48 hours with premium tracking included.</p>
        </div>
        <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
          <h4 className="font-bold text-gray-800 mb-2">Secure Checkout</h4>
          <p className="text-sm leading-relaxed">Your data is protected with industry-standard encryption.</p>
        </div>
      </div>
    </div>

    {/* 🔴 RELATED PRODUCTS SECTION */}
    <div className="mt-24">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-800">You May Also Like</h2>
       
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {related.map((item) => (
          <NavLink
            onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); }}
            key={item._id}
            to={`/detail/${item.slug}`}
            className="group block"
          >
            <div className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 mb-3">
              <img
                src={`http://localhost:4000/product/product-photo/${item._id}`}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold text-indigo-600 shadow-sm">
                ${item.price}
              </div>
            </div>
            <h3 className="text-sm font-bold text-gray-800 truncate group-hover:text-indigo-600 transition-colors">
              {item.name}
            </h3>
          </NavLink>
        ))}
      </div>
    </div>
  </div>
</div>
  );
};

export default ProductDetail;