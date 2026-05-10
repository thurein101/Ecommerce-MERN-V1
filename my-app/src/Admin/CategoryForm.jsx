import React from 'react'


const CategoryForm = ({handleSubmit,setValue,value,buttonText}) => {
  return (
    <form
  onSubmit={handleSubmit}
  className="max-w-md bg-white rounded-lg shadow border border-gray-200 p-4"
>
  {/* Input */}
  <input
    type="text"
    placeholder="Category name"
    value={value}
    onChange={(e) => setValue(e.target.value)}
    className="w-full px-3 py-2 mb-3 rounded-md border border-gray-300
               focus:outline-none focus:ring-1 focus:ring-indigo-500
               focus:border-indigo-500 transition text-sm"
    required
  />

  {/* Button */}
  <button
    type="submit"
    className="w-full py-2 rounded-md bg-indigo-600 text-white text-sm font-medium
               hover:bg-indigo-700 transition"
  >
    {buttonText?"Confirm" : "Create Category"}
  </button>
</form>


  )
}

export default CategoryForm
