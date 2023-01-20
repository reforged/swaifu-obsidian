import React from 'react'
import { Outlet } from 'react-router'
import Sidebar from '../components/Sidebar'
import Manager from './manager'

export default function Layout ()  {
  return (
    <Manager>
      <div className="hidden lg:flex lg:flex-shrink-0">
        <Sidebar className="flex w-64 min-h-screen flex-col border-r border-gray-200" />
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden w-full">

          <div className="px-5 max-w-7xl mx-auto w-full pt-12">
            <Outlet />
          </div>
        </div>
      </div>
    </Manager>
  )
}