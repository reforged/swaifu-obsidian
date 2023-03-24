import React, {ReactNode, useContext, useEffect, useState} from "react";
import AuthenticationContext from '../contexts/AuthenticationContext'
import {Outlet, useNavigate} from 'react-router'
import useMe from '../hooks/useMe'
import Sidebar from "../components/manager/Sidebar";
import {Link, useLocation} from "react-router-dom";
import NavigationContext, {NavigationContract} from "../contexts/NavigationContext";
import {classNames} from "../utils/helper";
import {ChevronRightIcon} from "@heroicons/react/24/outline";
import {HomeIcon} from "@heroicons/react/20/solid";
import useAuthentication from "../hooks/use-authentication";

type Props = {
  children: ReactNode

  layout: {
    label: string
    location: string[]
    navigation?: any[]
  }
}

export default function Manager ({ children, layout }: Props) {
  const [ user ] = useContext(AuthenticationContext)
  const location = useLocation()
  const { me } = useAuthentication()
  const { data } = me()
  const [navigation, setNavigation] = useContext(NavigationContext)
  const [select, setSelected] = useState<NavigationContract>(selectItemNavigation())
  const router = useNavigate()

  function getPath (data: NavigationContract) {
    const list: string[] = [data.href]
    if (data.children) {
      data.children.forEach((item) => {
        if (!list.includes(item.href)) list.push(item.href)
      })
    }
    return list
  }

  function selectItemNavigation (): NavigationContract {
    for (const item of navigation) {
      if (getPath(item).includes(location.pathname)) return item
    }
    return navigation[0]
  }




  if (!user) {
    router('/authentication/login')
  }


  return (
    <div className="hidden lg:flex lg:flex-shrink-0 min-h-screen bg-[#E2E9F3]">
      <Sidebar />
      <div className="flex min-w-0 min-h-screen flex-1 flex-col overflow-hidden w-full h-full">
        <div className="mx-auto w-full p-4 h-full min-h-screen flex ">
          <div className="bg-white w-full min-h-full rounded-md shadow-md overflow-hidden">

            <Navigation select={select} />
            <div className="p-12">
              <Breadcrumbs pages={layout.location}/>
              <div className="py-8 flex items-center justify-between">
                <span className="font-title text-3xl font-bold">{layout.label}</span>
              </div>
              <div className="">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Navigation ({ select }: { select: NavigationContract}) {
  const location = useLocation()

  return (
    <div className="bg-[#F7F9FC] w-full p-4 flex items-center justify-between relative">
      { select.children &&
        <div className="flex items-center gap-2">
          { select.children.map((item, index) => (
            <Link to={item.href} key={index}>
              <div className={classNames(
                location.pathname === item.href ? 'bg-white border !text-gray-900 font-medium' : '',
                'px-3 py-2 rounded-md text-gray-500'
              )}>
                {item.label}
              </div>
            </Link>
          ))}
        </div>
      }
    </div>
  )
}

function Breadcrumbs ({ pages }) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role='list' className="flex items-center space-x-4">
        <li>
          <div>
            <Link to={'/manager/home'} className="text-gray-400 hover:text-gray-500">
              <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>

        { pages.map((page) => (
          <li key={page.name}>
            <div className="flex items-center">
              <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
              <Link
                to={page.href}
                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                aria-current={page.current ? 'page' : undefined}
              >
                {page.name}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}