import React from "react";

import { useAuth } from "../context/AuthContext";
import UserMenu from "./UserMenu";

const Dashboard = () => {
    const[auth] = useAuth();
  return (
    <div className="w-full px-6">
      <div className="grid grid-cols-12 gap-6 mt-7">
        
        {/* Sidebar */}
        <div className="col-span-12 md:col-span-3">
          <UserMenu/>
        </div>

        {/* Content */}
        <div className="col-span-12 md:col-span-9">
          <div className="bg-white rounded-lg shadow p-6 min-h-[300px]">
            <h2 className="text-xl font-semibold mb-4">
             User Dashboard
             <hr />
            </h2>

            <h1 className="text-gray-600">
              {auth.user.name}
              
            </h1>
            <h1>{auth.user.email}</h1>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
