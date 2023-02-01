import React, {useEffect, useState} from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/diamond/Navbar'
import useMe from "../hooks/useMe";

export default function Layout ()  {
  const { } = useMe()

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <Outlet />
    </div>
  )
}