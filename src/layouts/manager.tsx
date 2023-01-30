import React, { useContext } from 'react'
import { AuthenticationContext} from '../contexts/AuthenticationContext'
import {Outlet, useNavigate} from 'react-router'
import useMe from '../hooks/useMe'
import Sidebar from "../components/manager/Sidebar";

export default function Manager () {
  const { user } = useContext(AuthenticationContext)
  const router = useNavigate()


  const { data} = useMe()
  console.log(data)

  if (!user) {
    router('/login')
    return (
      <div>
        pas connecté
      </div>
    )
  }

  return (
    <div className="hidden lg:flex lg:flex-shrink-0">
      <Sidebar className="flex w-64 min-h-screen flex-col border-r border-gray-200" />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden w-full">
        <div className="px-5 max-w-7xl mx-auto w-full pt-12">
          <Outlet />
        </div>
      </div>
    </div>
  )
}