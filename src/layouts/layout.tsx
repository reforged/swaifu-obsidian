import React from 'react'
import { Outlet } from 'react-router'
import Sidebar from '../components/Sidebar'

export default function Layout () {
  return (
    <div className="hidden lg:flex lg:flex-shrink-0">
      <Sidebar className="flex w-64 min-h-screen flex-col border-r border-gray-200" />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden w-full">
        <div className="w-full flex justify-end px-5 py-2">
          <div className="w-10 rounded-full aspect-square overflow-hidden">
            <img src="https://cdn.dribbble.com/users/627492/avatars/small/7c25e85c6288974ae5d1f34b27105c04.jpg?1648023466" alt="avatar" />
          </div>
        </div>
        <div className="px-5 max-w-7xl mx-auto w-full">
          <Outlet />
        </div>
      </div>
    </div>

  )
}