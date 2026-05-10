import { useLocation, useNavigate } from "react-router-dom";
import axios from "../api/apiBase";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const location = useLocation();

  const loginClickHandle = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post("/user/login", { email, password });

    if (res.status === 200) {
      const authData = {
        user: res.data.user,
        token: res.data.token,
      };

      // 1️⃣ Save to localStorage
      localStorage.setItem("auth", JSON.stringify(authData));

      // 2️⃣ Update context
      setAuth(authData);

      // 3️⃣ UI feedback
      toast.success("Login Successful");
      navigate(location.state || '/');

    }
  } catch (err) {
    console.log(err);
    toast.error("Login failed");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Login
        </h2>

        <form className="space-y-6" onSubmit={loginClickHandle}>
          {/* Email */}
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="
                peer w-full px-4 pt-6 pb-2
                border border-gray-300 rounded-xl
                focus:outline-none focus:border-indigo-600
                placeholder-transparent
              "
            />
            <label
              className="
                absolute left-4 top-2 text-gray-500 text-xs
                transition-all
                peer-placeholder-shown:text-sm
                peer-placeholder-shown:text-gray-400
                peer-placeholder-shown:top-4
                peer-focus:top-2
                peer-focus:text-xs
                peer-focus:text-indigo-600
                bg-white px-1
              "
            >
              Email
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="
                peer w-full px-4 pt-6 pb-2
                border border-gray-300 rounded-xl
                focus:outline-none focus:border-indigo-600
                placeholder-transparent
              "
            />
            <label
              className="
                absolute left-4 top-2 text-gray-500 text-xs
                transition-all
                peer-placeholder-shown:text-sm
                peer-placeholder-shown:text-gray-400
                peer-placeholder-shown:top-4
                peer-focus:top-2
                peer-focus:text-xs
                peer-focus:text-indigo-600
                bg-white px-1
              "
            >
              Password
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700"
          >
            Login
          </button>
<div className=" text-right "><a className="text-blue-700" href="/forgot-password">Forgot Password?</a></div>
          
        </form>
      </div>
    </div>
  );
};

export default Login;
