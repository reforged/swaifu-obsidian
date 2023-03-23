import React, {useContext} from "react";
import { NavLink, Link } from 'react-router-dom'
import { classNames, ReactElement } from '../../utils/helper'

import { RocketLaunchIcon} from "@heroicons/react/24/outline";
import NavigationContext, {NavigationContract} from "../../contexts/NavigationContext";

type LinkItem = {
  label: string
  href: string
  icon: (...props: any) => JSX.Element
  children?: LinkItem[]
}

export default function Sidebar (): JSX.Element {
  /*return (
    <div {...props}>
      <div className="bg-white hidden md:block flex  min-h-screen flex-col border-r border-gray-200">
        <Navigation />
      </div>
      <MobileSidebar open={open} setOpen={setOpen} />
    </div>
  )*/
  const [links, setLinks] = useContext(NavigationContext)

  return (
    <div className="sticky h-screen top-0">
      <div className="flex flex-col justify-between h-full bg-white">
        <Link to={"/"} className="inline-flex border">
          <div className="absolute inset-y-0 left-0 md:static md:flex-shrink-0">
            <div
              className="flex h-20 w-20 items-center justify-center  focus:outline-none "
            >
              <img
                className="h-12 w-auto"
                src="https://cdn.discordapp.com/attachments/935833137349541918/1071833266841210961/branding.png"
                alt="Your Company"
              />
            </div>
          </div>
        </Link>
        <div className="flex flex-col justify-between border-r h-full py-8">
          <div className=" flex flex-col gap-4">
            {links.map((link) =>
              <Item key={link.label} link={link} /> )
            }
          </div>

          <div>
            <div className="relative flex flex-col gap-4 py-4">
              dazda
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

function Navigation () {
  /*const links: LinkItem[] = [
    { label: 'Home', href: '/home', icon: HomeIcon },
    {
      label: 'Accounts',
      icon: UserGroupIcon,
      href: '/accounts',
      children: [
        { label: 'Gérer les utilisateurs', href: '/account/users', icon: FolderIcon },
        { label: 'Gérer roles', href: '/account/roles', icon: FolderIcon }
      ]
    },
    {
      label: 'Blog',
      icon: UserGroupIcon,
      href: '/blogs',
      children: [
        { label: 'Gestion des catégories', href: '/blog/categories', icon: FolderIcon },
        { label: 'Gestion des articles', href: '/blog/articles', icon: FolderIcon },
      ]
    },
    {
      label: 'Contenus de page',
      icon: UserGroupIcon,
      href: '/pages',
      children: [
        { label: 'Gestion des urls', href: '/pages/urls', icon: FolderIcon },
        { label: 'Gestion des pages', href: '/content-page/create', icon: FolderIcon },
      ]
    }
  ]*/
  const [links, setLinks] = useContext(NavigationContext)

  return (
    <div className="fixed z-40 px-5 py-5 space-y-10">
      <div className="inline-flex items-center space-x-2">
        <div className="w-10 h-10 flex items-center justify-center bg-purple-600 rounded-md">
          <RocketLaunchIcon className="w-5 h-5 text-white" />
        </div>
      </div>
      <div>
        {links.map((link, index) => <Item link={link} /> )}
      </div>
    </div>
  )
}


type NavLinkProps = {
  link: NavigationContract
}
function Item ({ link }: NavLinkProps) {
  return (
    <NavLink
      to={link.href}
      className={({ isActive }) => classNames('flex rounded-md p-3 mx-auto hover:bg-[#E2E9F3] hover:text-[#5B50D6] ease-in-out duration-200', isActive ? 'bg-[#E2E9F3]' : '')}
    >
      {({ isActive }) => (
        <ReactElement tag={link.icon} className={classNames('w-6', isActive ? 'text-[#5B50D6]' : '')} />
      )}
    </NavLink>
  )
}