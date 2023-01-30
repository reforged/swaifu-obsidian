import React, {useState} from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/diamond/Navbar'
import useMe from "../hooks/useMe";

export default function Layout ()  {
  const { data} = useMe()
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">

      <Outlet />
    </div>
  )
}