import React from 'react'
import categoryHook from "../hook/categoryHook";
import { Link } from 'react-router-dom';

const Category = () => {

  const category = categoryHook();
  return (
     <div className="max-w-6xl mx-auto px-6 py-16 min-h-[70vh]">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-light text-gray-800 tracking-tight">Browse Categories</h2>
        <div className="h-1 w-12 bg-indigo-500 mx-auto mt-3 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.map((cat) => (
          <Link 
            key={cat.slug} 
            to={`/category-list/${cat.slug}`}
            className="group relative flex items-center justify-center p-8 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl hover:border-indigo-500 transition-all duration-300 ease-in-out overflow-hidden"
          >
            {/* Subtle background glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <span className="relative text-lg font-medium text-gray-600 group-hover:text-indigo-600 capitalize tracking-wide">
              {cat.name}
            </span>

            {/* Little arrow that appears on hover */}
            <svg 
              className="w-5 h-5 ml-2 transform translate-x-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-indigo-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Category
