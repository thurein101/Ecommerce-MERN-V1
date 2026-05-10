import React, { useEffect, useState } from "react";
import UserMenu from "./UserMenu";
import { useAuth } from "../context/AuthContext";
import axios from "../api/apiBase";
import { toast } from 'react-hot-toast';

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phNo, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [auth, setAuth] = useAuth();

 const handleUpdateSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.put("/user/profile", {
      name,
      password,
      phNo,
      address,
    });

    console.log(res);
    

    // Axios မှာ data က res.data ထဲမှာ ရှိပါတယ်
    if (res?.data?.success) { 
      // 1. Context Update
      setAuth({ ...auth, user: res.data.updatedUser });

      // 2. LocalStorage Update
      let ls = JSON.parse(localStorage.getItem("auth"));
      ls.user = res.data.updatedUser;
      localStorage.setItem("auth", JSON.stringify(ls));

      //  data.message မဟုတ်ပါ၊ res.data.message ဖြစ်ရပါမယ်
      toast.success(res.data.message); 
    } else {
      toast.error(res.data?.message || "Update failed");
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
};

  // အချက်အလက်တွေကို Form ထဲမှာ အလိုအလျောက် ဖြည့်ပေးဖို့
  useEffect(() => {
    if (auth?.user) {
      const { name, email, phNo, address } = auth.user;
      setName(name || "");
      setEmail(email || "");
      setPhone(phNo || "");
      setAddress(address || "");
    }
  }, [auth?.user]); // auth state ပြောင်းသွားရင် ဒါလေး အလုပ်လုပ်မယ်
  return (
    <div className="w-full px-6">
      <div className="grid grid-cols-12 gap-6 mt-7">
        {/* Sidebar */}
        <div className="col-span-12 md:col-span-3">
          <UserMenu />
        </div>

        {/* Content */}
        <div className="col-span-12 md:col-span-9">
          <div className="bg-white rounded-lg shadow p-6 min-h-[300px]">
            <h2 className="text-xl font-semibold mb-4">
              Profile
              <hr />
            </h2>
            <form className="mt-8 space-y-4" onSubmit={handleUpdateSubmit}>
              {/* Full Name */}
              <div className="relative group">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1 mb-1 block transition-colors group-focus-within:text-indigo-600">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    
                    placeholder="Enter your name"
                    className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm transition-all focus:bg-white focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="relative group">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1 mb-1 block transition-colors group-focus-within:text-indigo-600">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    required
                    placeholder="name@company.com"
                    className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm transition-all focus:bg-white focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none"
                    disabled
                  />
                </div>
              </div>

              {/* Password */}
              <div className="relative group">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1 mb-1 block transition-colors group-focus-within:text-indigo-600">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    disabled
                    
                    placeholder="••••••••"
                    className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm transition-all focus:bg-white focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="relative group">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1 mb-1 block transition-colors group-focus-within:text-indigo-600">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <input
                    value={phNo}
                    onChange={(e) => setPhone(e.target.value)}
                    type="text"
                    
                    placeholder="09..."
                    className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm transition-all focus:bg-white focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="relative group">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1 mb-1 block transition-colors group-focus-within:text-indigo-600">
                  Shipping Address
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows="3"
                  
                  placeholder="Street, Township, City"
                  className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm transition-all focus:bg-white focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none resize-none"
                ></textarea>
              </div>

              {/* Gradient Submit Button */}
              <button
                type="submit"
                className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98] focus:ring-4 focus:ring-indigo-200"
               
              >
                Update Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
