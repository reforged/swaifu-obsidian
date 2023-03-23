import React, {useEffect, useState} from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/diamond/Navbar'
import useAuthentication from "../hooks/use-authentication";

export default function Layout ()  {
  const { me } = useAuthentication()
  const { } = me()

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <Outlet />
    </div>
  )
}