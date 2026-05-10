import React, { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import { Select } from "antd";
const { Option } = Select;
import { toast } from "react-hot-toast";
import axios from "../api/apiBase";
import { useNavigate, useParams } from "react-router-dom";

const Update_Product = () => {
  const navigate = useNavigate();

  // States
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [photo, setPhoto] = useState(null);
  const [shipping, setShipping] = useState("0"); // "0" = No, "1" = Yes
  const [id, setId] = useState("");

  // Remove photo
  const removePhoto = () => setPhoto(null);

  // Fetch all categories
  const getAllCategories = async () => {
    try {
      const res = await axios.get("/category/get-categories");
      if (res.status === 200) setCategories(res.data);
    } catch (err) {
      console.log("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  //Get Single Product For Update Each Data

  const params = useParams();

  const getSingleProduct = async () => {
    try {
      const res = await axios.get(`/product/getsingle-product/${params.slug}`);
      console.log(res);
      if (res.status == 200) {
        const p = res.data;

        setName(p.name);
        setDescription(p.description);
        setCategory(p.category?._id || p.category);
        setPrice(p.price);
        setQuantity(p.quantity);
        setShipping(p.shipping ? "1" : "0");
        setId(p._id);

        // IMPORTANT
        setPhoto(null); // update မှာ file အသစ်ရွေးမှ set
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  // Handle Update
  const handleUpdate = async () => {
    try {
     
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("shipping", shipping);
       // 🔥 only if new photo selected
    if (photo) {
      formData.append("photo", photo);
    }

       const res = await axios.put(
      `/product/update-product/${id}`,
      formData
    );

      if (res.status === 200) {
        toast.success("Product updated successfully");
        navigate("/dashboard/products");
      }
    } catch (err) {
      console.log(err.response?.data || err.message);
      toast.error("Product update failed");
    }
  };

  //Handle Delete
 const handleDelete = async () => {
  try {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    const res = await axios.delete(`/product/delete-product/${id}`);

    if (res.status === 200) {
      toast.success("Product deleted successfully");
      navigate("/dashboard/products");
    }
  } catch (e) {
    console.log(e);
    toast.error("Failed to delete product");
  }
};


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
              Creating Product
              <hr />
            </h2>
            <button
              type="button"
              onClick={() => navigate("/dashboard/products")}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 mb-8"
            >
              ← Back
            </button>

            {/* Category Select */}
            <Select
              placeholder="Select Category"
              size="middle"
              showSearch
              className="mb-4 w-60"
              value={category}
              onChange={(value) => setCategory(value)}
            >
              {categories.map((cat) => (
                <Option key={cat._id} value={cat._id}>
                  {cat.name}
                </Option>
              ))}
            </Select>

            {/* Photo Upload */}
            <div className="mb-4">
              <label className="flex items-center justify-center w-60 h-12 px-4 border border-gray-300 rounded-lg cursor-pointer bg-white hover:border-gray-400 hover:bg-gray-50 text-gray-600 font-medium shadow-sm">
                {photo ? photo.name : "Upload Photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  hidden
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
              </label>
            </div>

            {/* Photo Preview */}
            <div className="relative w-full max-w-md mx-auto mb-4">
              {/* New photo preview */}
              {photo && (
                <>
                  <button
                    onClick={removePhoto}
                    className="absolute top-1 right-1 text-white bg-black bg-opacity-50 rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-opacity-70"
                  >
                    ×
                  </button>

                  <img
                    src={URL.createObjectURL(photo)}
                    className="w-full max-w-md h-auto mx-auto rounded-lg object-cover"
                    alt="new product"
                  />
                </>
              )}

              {/* Old photo preview */}
              {!photo && id && (
                <img
                  src={`http://localhost:4000/product/product-photo/${id}`}
                  className="w-full max-w-md h-auto mx-auto rounded-lg object-cover"
                  alt="old product"
                />
              )}
            </div>

            {/* Name */}
            <div className="mb-2">
              <label className="block mb-1 font-semibold text-sm">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                placeholder="Product name"
                required
              />
            </div>

            {/* Description */}
            <div className="mb-2">
              <label className="block mb-1 font-semibold text-sm">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                placeholder="Product description"
                rows={3}
                required
              />
            </div>

            {/* Price */}
            <div className="mb-2">
              <label className="block mb-1 font-semibold text-sm">Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                placeholder="Price in USD"
                required
                min="0"
              />
            </div>

            {/* Quantity */}
            <div className="mb-2">
              <label className="block mb-1 font-semibold text-sm">
                Quantity
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                placeholder="Quantity available"
                required
                min="0"
              />
            </div>

            {/* Shipping */}
            <div className="mb-2">
              <label className="block mb-1 font-semibold text-sm">
                Shipping
              </label>
              <select
                value={shipping}
                onChange={(e) => setShipping(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              >
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>

            {/* Submit */}
            <div className="flex gap-3 mt-4">
              {/* Confirm */}
              <button
                type="button"
                onClick={handleUpdate}
                className="px-6 py-2 rounded-md bg-blue-500 text-white font-medium
               hover:bg-blue-600 transition"
              >
                Confirm
              </button>

              {/* Delete */}
              <button
                type="button"
                onClick={handleDelete}
                className="px-6 py-2 rounded-md bg-red-500 text-white font-medium
               hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update_Product;
