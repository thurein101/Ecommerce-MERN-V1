import UserMenu from "./UserMenu";
import React from 'react'

const Orders = () => {
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
             Orders
             <hr />
            </h2>

          This is orderes.
          </div>
        </div>

      </div>
    </div>
  )
}

export default Orders

