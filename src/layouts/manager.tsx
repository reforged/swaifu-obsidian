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
    <div className="hidden lg:flex lg:flex-shrink-0 min-h-screen bg-[#E2E9F3]">
      <Sidebar />
      <div className="flex min-w-0 min-h-screen flex-1 flex-col overflow-hidden w-full h-full">
        <div className="mx-auto w-full p-4 h-full min-h-screen flex ">
          <div className="bg-white w-full min-h-full rounded-md shadow-md overflow-hidden">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}