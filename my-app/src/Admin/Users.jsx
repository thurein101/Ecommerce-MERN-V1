import React from 'react'
import AdminMenu from './AdminMenu'

const Users = () => {
  return (
    <div className="w-full px-6">
      <div className="grid grid-cols-12 gap-6 mt-7">
        
        {/* Sidebar */}
        <div className="col-span-12 md:col-span-3">
          <AdminMenu/>
        </div>

        {/* Content */}
        <div className="col-span-12 md:col-span-9">
          <div className="bg-white rounded-lg shadow p-6 min-h-[300px]">
            <h2 className="text-xl font-semibold mb-4">
             Users Management
             <hr />
            </h2>

          Users Management
          </div>
        </div>

      </div>
    </div>
  )
}

export default Users
