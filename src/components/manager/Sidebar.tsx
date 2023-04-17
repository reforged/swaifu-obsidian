import React, {Fragment, useContext, useState} from "react";
import { NavLink, Link } from 'react-router-dom'
import {
  HomeIcon,
  ListBulletIcon,
  ChatBubbleBottomCenterTextIcon,
  UserIcon,
  DocumentTextIcon,
  UserGroupIcon, XMarkIcon
} from '@heroicons/react/24/solid'
import { classNames, ReactElement } from '../../utils/helper'
import Profil from "./Profil";
import {Menu, Transition, Dialog} from "@headlessui/react";
import {
  Bars3CenterLeftIcon,
  InformationCircleIcon, MagnifyingGlassIcon,
  RocketLaunchIcon
} from "@heroicons/react/24/outline";
import NavigationContext, {NavigationContract} from "../../contexts/NavigationContext";
import AuthenticationContext from "../../contexts/AuthenticationContext";
import useAuthentication from "../../hooks/use-authentication";

type LinkItem = {
  label: string
  href: string
  icon: (...props: any) => JSX.Element
  children?: LinkItem[]
}

export default function Sidebar (): JSX.Element {
  const [links, setLinks] = useContext(NavigationContext)
  const { logout } = useAuthentication()
  const { mutate: disconnectUser } = logout()
  const [open, setOpen] = useState(false)
  const [user, setUser] = useContext(AuthenticationContext)

  function handleClick () {
    disconnectUser()
  }
  return (
    <div>
      <div>
        <MobileSidebar setOpen={setOpen} open={open} />
      </div>
      <div className="hidden lg:flex lg:sticky h-screen top-0">
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
                <div className="mx-auto">
                  <InformationCircleIcon className="w-8" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 border-b border-gray-200 bg-white lg:hidden">
        <button
          type="button"
          className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 lg:hidden"
          onClick={() => setOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3CenterLeftIcon className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className="flex flex-1 justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex flex-1">
            <form className="flex w-full md:ml-0" action="#" method="GET">
              <label htmlFor="search-field" className="sr-only">
                Search
              </label>
              <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                  <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
                </div>
                <input
                  id="search-field"
                  name="search-field"
                  className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 focus:border-transparent focus:outline-none focus:ring-0 focus:placeholder:text-gray-400 sm:text-sm"
                  placeholder="Search"
                  type="search"
                />
              </div>
            </form>
          </div>
          <div className="flex items-center">
            {/* Profile dropdown */}
            <Profil />
          </div>
        </div>
      </div>
    </div>

  )
}

function Navigation () {
  const [links, setLinks] = useContext(NavigationContext)

  return (
    <div className="fixed z-40 px-5 py-5 space-y-10">
      <div className="inline-flex items-center space-x-2">
        <div className="w-10 h-10 flex items-center justify-center bg-purple-600 rounded-md">
          <RocketLaunchIcon className="w-5 h-5 text-white" />
        </div>
      </div>
      <div>
        {links.map((link, index) => <Item link={link} key={index} /> )}
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

function MobileSidebar ({ open, setOpen }) {
  const [links, setLinks] = useContext(NavigationContext)
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white pb-4 pt-5">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute right-0 top-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex flex-shrink-0 items-center px-4">
                <img
                  className="h-8 w-auto"
                  src="../../public/favicon.ico"
                  alt="Your Company"
                />
              </div>
              <div className="mt-5 h-0 flex-1 overflow-y-auto">
                <nav className="px-2">
                  <div className="flex flex-col gap-2">
                    { links.filter((link) => link.children).map((link, index) => (
                      <div className="px-3" key={index}>
                        <h3 className=" text-sm font-medium text-gray-500" id="mobile-teams-headline">
                          {link.label}
                        </h3>
                        {link.children &&
                          <div className="flex flex-col">
                            {link.children.map((item, index) => (
                              <NavLink
                                key={index}
                                to={item.href}
                                className={({ isActive }) => classNames('flex rounded-md p-3 hover:bg-[#E2E9F3] hover:text-[#5B50D6] ease-in-out duration-200', isActive ? 'bg-[#E2E9F3]' : '')}
                              >
                                <div className="flex items-center gap-4 text-gray-400">
                                  <ReactElement tag={link.icon} className={classNames('w-4')} />
                                  <span>{item.label}</span>
                                </div>
                              </NavLink>
                            ))}
                          </div>
                        }

                      </div>
                    ))


                    }
                    {/* {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                          'group flex items-center rounded-md px-2 py-2 text-base font-medium leading-5'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        <item.icon
                          className={classNames(
                            item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                            'mr-3 h-6 w-6 flex-shrink-0'
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    ))}*/}
                  </div>

                </nav>
              </div>
            </Dialog.Panel>
          </Transition.Child>
          <div className="w-14 flex-shrink-0" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}