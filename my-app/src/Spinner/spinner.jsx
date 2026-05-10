import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Spinner = () => {

  const [count, setCount] = useState(5);
const navigate = useNavigate();
const location = useLocation();

useEffect(() => {
  if (count === 0) {
    navigate("/login",{state: location.pathname});
    return;
  }

  const interval = setInterval(() => {
    setCount((prev) => prev - 1);
  }, 1000);

  return () => clearInterval(interval);
}, [count, navigate ,location]);

  return (
   <div className="flex items-center justify-center min-h-screen bg-gray-50">
  <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-2xl shadow-lg">
    <h3 className="text-lg font-medium text-gray-700">
      Redirecting you in <span className="font-bold text-blue-600">{count}</span> sec
    </h3>

    <div className="relative w-16 h-16">
      <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
      <div className="absolute inset-0 border-4 border-t-blue-600 rounded-full animate-spin"></div>
    </div>
  </div>
</div>

  
  );
};

export default Spinner;
