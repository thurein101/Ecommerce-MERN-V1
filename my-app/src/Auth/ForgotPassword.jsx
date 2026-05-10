import React, { useState } from "react";
import axios from "../api/apiBase";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [answer, setAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const data = { email, answer, newPassword };
      const res = await axios.post("/user/forgot-password", data);
      console.log(res);

      if (res.status == 200) {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Reset Password
        </h2>

        <form className="space-y-6" onSubmit={handleForgotPassword}>
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

          {/*Answer*/}
          <div className="relative">
            <input
              type="password"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Your Fav Sports"
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
              Your fav sports
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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
            Reset New Password
          </button>
          <div className=" text-left ">
            <a className="text-blue-700" href="/login">
              Back
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
