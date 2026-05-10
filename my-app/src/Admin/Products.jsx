import React, {useEffect, useState} from 'react';
import AdminMenu from './AdminMenu';

import axios from '../api/apiBase';
import {Link} from 'react-router-dom';

const Product = () => {
  const [product, setProduct] = useState ([]);
  const getAllProduct = async () => {
    try {
      const res = await axios.get ('product/getall-products');
      console.log (res.data);

      if (res.status == 200) {
        setProduct (res.data);
      }
    } catch (e) {
      console.log (e.message);
    }
  };

  useEffect (() => {
    getAllProduct ();
  }, []);

  return (
    <div className="w-full px-6">
      <div className="grid grid-cols-12 gap-6 mt-7">
        {/* Sidebar */}
        <div className="col-span-12 md:col-span-3">
          <AdminMenu />
        </div>

        {/* Content */}
        <div className="col-span-12 md:col-span-9">
          <div className="bg-white rounded-lg shadow p-6 min-h-[300px]">
            <h2 className="text-xl font-semibold mb-4">
              Product List
              <hr />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {product.length > 0 ? (
  product.map(p => (
    <Link to={`/dashboard/update-product/${p.slug}`} key={p._id}>
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300 mt-6">
        {/* Image */}
        <div className="h-52 overflow-hidden">
          <img
            src={`http://localhost:4000/product/product-photo/${p._id}`}
            alt={p.name}
            className="w-full h-full object-cover hover:scale-105 transition duration-300"
          />
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Name */}
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {p.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
            {p.description}
          </p>

          {/* Price */}
          <div className="mt-4 flex items-center justify-between">
            <span className="text-blue-600 font-bold text-lg">
              ${p.price}
            </span>
          </div>
        </div>
      </div>
    </Link>
  ))
) : (
  <div className="mt-6 text-gray-500 font-medium">
    No Product found
  </div>
)}

                
              </div>

            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
