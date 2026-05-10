import { useAuth } from "../context/AuthContext";
import axios from "../api/apiBase";
import { useEffect, useState } from "react";
import { Checkbox, Radio } from "antd";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";
import { toast } from "react-hot-toast";

const Home = () => {
  const [auth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]); // selected categories
  const [radio, setRadio] = useState([]); // selected price _id
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  const Prices = [
    { _id: 0, name: "$0 - $19", array: [0, 19] },
    { _id: 1, name: "$20 - $39", array: [20, 39] },
    { _id: 2, name: "$40 - $59", array: [40, 59] },
    { _id: 3, name: "$60 - $99", array: [60, 99] },
    { _id: 4, name: "$100+", array: [100, 99999999] },
  ];

  //get total count function
  const getTotalCount = async () => {
    try {
      const res = await axios.get("/product/count-product");
      setTotal(res.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  //getting filter products with radio and checkbox

  const filterProduct = async () => {
    try {
      setLoading(true);

      const res = await axios.post("/product/filter-product", {
        checked,
        radio,
      });
      setProducts(res.data);
    } catch (e) {
      console.log(e.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all products

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/product/product-list/${page}`);
      setProducts(res.data);
    } catch (e) {
      console.log(e.message);
    } finally {
      setLoading(false);
    }
  };
  //loadmore
  // loadmore function ကို ဒီလိုပြင်ပါ
  const loadMore = async () => {
    try {
      setLoading(true);
      // API call မှာ page variable ကို သေချာထည့်ပါ
      const res = await axios.get(`/product/product-list/${page}`);
      setLoading(false);
      // ရလာတဲ့ data အသစ်ကို အရင်ရှိပြီးသား products တွေနောက်မှာ ပေါင်းထည့်မယ်
      setProducts([...products, ...res?.data]);
    } catch (e) {
      console.log(e.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  // Fetch all categories
  const getAllCategories = async () => {
    try {
      const res = await axios.get("/category/get-categories");
      if (res.status === 200) setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Toggle category selection
  const handleCategory = (value, id) => {
    let all = [...checked];
    if (value) all.push(id);
    else all = all.filter((c) => c !== id);
    setChecked(all);
  };

  //useEff for categories and total
  useEffect(() => {
    getAllCategories();
    getTotalCount();
  }, []);

  //useEff for getting product and filtering
  useEffect(() => {
    if (checked.length || radio.length) {
      filterProduct();
    } else {
      getAllProducts();
    }
  }, [checked, radio]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 🟢 LEFT – FILTER SIDEBAR (Responsive) */}
          
          <aside className="w-full lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
              <div className="flex items-center justify-between mb-4 border-b pb-3">
                <h2 className="text-lg font-bold text-gray-800">Filters</h2>
                <button
                  onClick={() => window.location.reload()}
                  className="text-xs font-medium text-red-500 hover:underline"
                >
                  Clear All
                </button>
              </div>

              {/* CATEGORY FILTER */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">
                  Categories
                </h3>
                <div className="flex flex-col gap-2">
                  {categories.map((c) => {
                    const isChecked = checked.includes(c._id);
                    return (
                      <label
                        key={c._id}
                        className={`flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-all duration-200
                    ${isChecked ? "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-500" : "hover:bg-gray-50 text-gray-600 border border-transparent"}`}
                      >
                        <Checkbox
                          checked={isChecked}
                          onChange={(e) =>
                            handleCategory(e.target.checked, c._id)
                          }
                          className="accent-indigo-600"
                        />
                        <span className="text-sm font-medium">{c.name}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* PRICE FILTER */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">
                  Price Range
                </h3>
                <Radio.Group
                  value={radio}
                  onChange={(e) => setRadio(e.target.value)}
                  className="flex flex-col gap-2"
                >
                  {Prices.map((p) => {
                    const isActive =
                      JSON.stringify(radio) === JSON.stringify(p.array);
                    return (
                      <label
                        key={p._id}
                        className={`flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-all duration-200
                    ${isActive ? "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-500" : "hover:bg-gray-50 text-gray-600 border border-transparent"}`}
                      >
                        <Radio value={p.array} />
                        <span className="text-sm font-medium">{p.name}</span>
                      </label>
                    );
                  })}
                </Radio.Group>
              </div>
            </div>
          </aside>

          {/* 🔵 RIGHT – PRODUCTS SECTION */}
          <main className="w-full lg:w-3/4">
            <div className="relative">
              {/* Header info */}
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-xl font-bold text-gray-800">
                  All Products{" "}
                  <span className="text-gray-400 font-normal">
                    ({products.length})
                  </span>
                </h1>
              </div>

              {/* LOADING OVERLAY */}
              {loading && (
                <div className="absolute inset-0 z-20 bg-white/60 backdrop-blur-[2px] flex flex-col items-center justify-center rounded-2xl min-h-[400px]">
                  <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent shadow-lg" />
                  <p className="mt-3 text-sm font-semibold text-indigo-600 animate-pulse">
                    Updating inventory...
                  </p>
                </div>
              )}

              {/* PRODUCT GRID - Mobile 1, Tablet 2, Desktop 3 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.length > 0 ? (
                  products.map((p) => (
                    <div
                      key={p._id}
                      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-indigo-100 transition-all duration-300"
                    >
                      {/* Image wrapper */}
                      <div className="relative h-56 bg-gray-50 overflow-hidden">
                        <img
                          src={`http://localhost:4000/product/product-photo/${p._id}`}
                          alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-lg font-bold text-indigo-600 shadow-sm">
                          ${p.price}
                        </div>
                      </div>

                      {/* Body */}
                      <div className="p-4">
                        <h3 className="font-bold text-gray-800 truncate group-hover:text-indigo-600 transition-colors">
                          {p.name}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                          {p.description}
                        </p>

                        <div className="mt-5 grid grid-cols-2 gap-3">
                          <button
                            onClick={() => navigate(`/detail/${p.slug}`)}
                            className="py-2 text-xs font-bold border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 active:scale-95 transition"
                          >
                            VIEW
                          </button>
                          <button
                            className="py-2 text-xs font-bold bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 shadow-md shadow-indigo-100 active:scale-95 transition"
                            onClick={() => {
                              
                              setCart([...cart, p]);
                              localStorage.setItem('cart', JSON.stringify([...cart,p]))
                              toast.success("Item added to cart!");
                            }}
                          >
                            ADD TO CART
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center bg-white rounded-2xl border border-dashed border-gray-200">
                    <p className="text-gray-400 font-medium">
                      No products match your filters.
                    </p>
                  </div>
                )}
              </div>

              {/* LOAD MORE BUTTON */}
              {products && products.length >= 6 && products.length < total && (
                <div className="flex justify-center mt-12 pb-10">
                  <button
                    onClick={() => setPage(page + 1)}
                    disabled={loading}
                    className="group flex items-center gap-2 px-8 py-3 bg-white border-2 border-indigo-600 text-indigo-600 font-bold rounded-full hover:bg-indigo-600 hover:text-white transition-all duration-300 disabled:opacity-50"
                  >
                    {loading ? "FETCHING..." : "LOAD MORE"}
                    {!loading && (
                      <span className="group-hover:translate-y-1 transition-transform">
                        ↓
                      </span>
                    )}
                  </button>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Home;
