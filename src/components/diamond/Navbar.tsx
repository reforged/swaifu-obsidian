import React, {Fragment, useContext, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { Disclosure, Menu, Transition, Dialog } from '@headlessui/react'
import {Bars3Icon, BellIcon, ChevronDownIcon, XMarkIcon} from '@heroicons/react/24/outline'
import { classNames } from '../../utils/helper'
import DarkMode from '../DarkMode'
import {AuthenticationContext} from '../../contexts/AuthenticationContext'
import {IUser} from '../../utils'
import {IPermission, IRole} from '../../utils'
import userLogout from '../../hooks/user-logout'

type Props = {
  open: boolean
  setOpen: (a: boolean) => void
}

export default function Navbar ({ }: Props) {
  return (
    <Disclosure as="nav" className="">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-8 w-8 lg:hidden object-cover rounded-md"
                    src="https://cdn.discordapp.com/attachments/1052152529682710558/1064960787426324531/dzadazdazda.png"
                    alt="Your Company"
                  />
                  <img
                    className="hidden h-8 w-8 lg:block object-cover rounded-md"
                    src="../../public/favicon.ico"
                    alt="Your Company"
                  />

                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <a
                    href="#"
                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                  >
                    Accueil
                  </a>
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center gap-8">
                <AuthenticationContext.Consumer>
                  {({ user }) => (
                    <div>
                      { user ?
                        <div>
                          <Profil />
                        </div>
                        : <Link to={'/authentication/login'} className="px-3 py-2 border rounded-md bg-gray-800 border-gray-700 text-gray-300">Login</Link>
                      }
                    </div>
                  )}
                </AuthenticationContext.Consumer>

                <DarkMode />
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <MobileNavbar open={open} />
        </>
      )}
    </Disclosure>
  )
}

const Profil = () => {
  const { mutate: logout } = userLogout()
  const { user } = useContext(AuthenticationContext)
  const permissions: string[] = []
  user.permissions?.forEach((permission: IPermission) => permissions.push(permission.key))
  user.roles?.forEach((role: IRole) => {
    role.permissions.forEach((item: IPermission) => {
      if (!permissions.includes(item.key)) permissions.push(item.key)
    })
  })

  function handleClick () {
    logout()
  }

  const [manager, setManager] = useState<boolean>((permissions.includes('admin') || permissions.includes('manager')))

  useEffect(() => {
    if (permissions.includes('admin') || permissions.includes('manager')) {
      setManager(true)
    }
  }, [permissions, user])

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md bg-gray-800 border border-gray-700  px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          {user.email}
          <ChevronDownIcon
            className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-4 py-3">
            <p className="text-sm">Connecté avec</p>
            <p className="truncate text-sm font-medium text-gray-900">{ user.email }</p>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Account settings
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Support
                </a>
              )}
            </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div>
                    { manager &&
                      <Link
                        to={"/manager/home"}
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        Manager
                      </Link>
                    }
                  </div>

                )}
              </Menu.Item>

          </div>
          <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="button"
                    onClick={handleClick}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full px-4 py-2 text-left text-sm'
                    )}
                  >
                    Sign out
                  </button>
                )}
              </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

type MobileProps = {
  open: boolean
}
function MobileNavbar ({ open }: MobileProps) {
  return (
    <Fragment>
      <Transition
        as={Fragment}
        show={open}
        enter="transform transition duration-[400ms]"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transform duration-200 transition ease-in-out"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black bg-opacity-50" />
      </Transition>

      <Transition.Root show={open} as={Fragment}>
        <Dialog as={Fragment} onClose={() => !open}>
          <div className="relative z-10">
            <div className="fixed inset-0" />
            <div className="fixed inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10">
                  <Transition.Child
                    as={Fragment}
                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                    enterFrom="-translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                    leaveFrom="translate-x-0"
                    leaveTo="-translate-x-full"
                  >
                    <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                      <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                        <div className="relative flex-1">
                          <div className="flex justify-between w-full">
                            <div>
                              Lorem
                            </div>
                            <div className="flex items-start justify-between pr-5">
                              <div className="ml-3 flex h-7 items-center">
                                <Disclosure.Button
                                  type="button"
                                  className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                  <span className="sr-only">Close panel</span>
                                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                </Disclosure.Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

    </Fragment>
  )
}