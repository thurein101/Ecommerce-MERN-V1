import React, { useEffect, useState } from "react";
import AdminMenu from "./AdminMenu";
import axios from "../api/apiBase";
import CategoryForm from "./CategoryForm";
import { toast } from "react-hot-toast";
import { Button, Modal } from "antd";


const Create_Category = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [UpdateName, setUpdateName] = useState("");

  //create category submit

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/category/create-category", { name });
      console.log(res);
      if (res.status === 200) {
        toast.success("Category created");
        setName(""); // clear input
        getAllCategories(); // refresh list
      }
    } catch (err) {
      toast.error(err.response?.data?.msg || "Something went wrong");
    }
  };

  //update Handle Submit
  const updateSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(`/category/update-category/${selected._id}`, {
        name: UpdateName,
      });
      console.log(res);

      if (res.status == 200) {
        setSelected(null);
        setUpdateName("");
        setVisible(false);
        getAllCategories();
        toast.success(` ${res.data.name} is updated`);
      }
    } catch (err) {
      console.log(err);
      toast.error("Update Failed");
    }
  };

  //update Handle Submit
  const DeleteSubmit = async (pId) => {
    try {
      const res = await axios.delete(`/category/delete-category/${pId}`);
      if (res.status == 200) {
          getAllCategories(); // ✅ correct name
      }
    } catch (err) {
      console.log(err);
    }
  };

  // GET ALL CATEGORIES
  const getAllCategories = async () => {
    try {
      const res = await axios.get("/category/get-categories");

      // adjust according to backend response
      if (res.status == 200) {
        setCategories(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllCategories();
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
              Admin Category
              <hr className="mt-2" />
            </h2>

            {/* Create Category Form */}
            <div className="mb-6">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>

            {/* Category Table */}
            <table className="table-auto w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-2">Name</th>
                  <th className="text-right px-4 py-2">Action</th>
                </tr>
              </thead>

              <tbody>
                {categories.length > 0 ? (
                  categories.map((cat) => (
                    <tr key={cat._id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2">{cat.name}</td>

                      <td className="px-4 py-2 text-right space-x-2">
                        <button
                          className="px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
                          onClick={() => {
                            (setVisible(true),
                              setUpdateName(cat.name),
                              setSelected(cat));
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                          onClick={() => DeleteSubmit(cat._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="text-center py-6 text-gray-500">
                      No categories found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal onCancel={() => setVisible(false)} footer={null} open={visible}>
        <CategoryForm
          value={UpdateName}
          setValue={setUpdateName}
          handleSubmit={updateSubmit}
          buttonText="Confirm"
        />
      </Modal>
    </div>
  );
};

export default Create_Category;
