import React, {Fragment, useContext, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { Disclosure, Menu, Transition, Dialog } from '@headlessui/react'
import {
  Bars3CenterLeftIcon,
  Bars3Icon,
  BellIcon,
  ChevronDownIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { classNames } from '../../utils/helper'
import DarkMode from '../DarkMode'
import AuthenticationContext from '../../contexts/AuthenticationContext'
import {IUser} from '../../utils'
import {IPermission, IRole} from '../../utils'
import useAuthentication from "../../hooks/use-authentication";

type Props = {
  open: boolean
  setOpen: (a: boolean) => void
}

const navigation = [
  {label: 'Accueil', href: '/'},
  {label: "L'Équipe", href: '/team'},
]
export default function Navbar ({ }: Props) {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <Link to={"/"} className="flex flex-shrink-0 items-center">
              <div className="flex flex-shrink-0 items-center">
                <img
                  className="block h-8 w-8 lg:hidden object-cover rounded-md"
                  src="https://cdn.discordapp.com/attachments/1092374549133275186/1092374584709369886/favicon.png"
                  alt="Your Company"
                />
                <img
                  className="hidden h-8 w-8 lg:block object-cover rounded-md"
                  src="https://cdn.discordapp.com/attachments/1092374549133275186/1092374584709369886/favicon.png"
                  alt="Your Company"
                />

              </div>
            </Link>

            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              { navigation.map((item, index) => (
                <Link
                  key={index}
                  to={item.href}
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                >
                  {item.label}
                </Link>
              ))}

            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center gap-8">
            <AuthenticationContext.Consumer>
              {([ user ]) => (
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
          </div>
          <button
            type="button"
            className="border-r border-gray-200 px-4 text-gray-500  lg:hidden"
            onClick={() => setOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3CenterLeftIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>

      <MobileNavbar open={open} setOpen={setOpen}/>
    </>

  )
}

const Profil = () => {
  const { logout } = useAuthentication()
  const { mutate: disconnectUser } = logout()
  const [user, setUser] = useContext(AuthenticationContext)
  const permissions: string[] = []
  user.permissions?.forEach((permission: IPermission) => permissions.push(permission.key))
  user.roles?.forEach((role: IRole) => {
    role.permissions.forEach((item: IPermission) => {
      if (!permissions.includes(item.key)) permissions.push(item.key)
    })
  })

  function handleClick () {
    disconnectUser()
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
        <Menu.Button className="inline-flex w-full justify-center rounded-md bg-gray-100 border border-gray-200  px-4 py-2 text-sm font-medium text-gray-900 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          {user.firstname} {user.lastname}
          <ChevronDownIcon
            className="ml-2 -mr-1 h-5 w-5"
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
            <p className="truncate text-sm font-medium text-gray-900">{ user.email ? user.email : user.numero }</p>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to={"/profil"}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Mon compte
                </Link>
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
                        Panel Administrateur
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
                    Se Déconnecter
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
  setOpen: any
}
function MobileNavbar ({ open, setOpen }: MobileProps) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative s-40 lg:hidden" onClose={setOpen}>
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
            <Dialog.Panel className="relative flex w-full max-w-sm flex-1 flex-col bg-white pb-4 pt-5">
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
                    className="ml-1 flex h-10 w-10 items-center justify-center rounded-full"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex flex-shrink-0 items-center px-4 justify-between">
                <img
                  className="h-8 w-auto"
                  src="https://cdn.discordapp.com/attachments/1092374549133275186/1092374584709369886/favicon.png"
                  alt="Your Company"
                />
                <AuthenticationContext.Consumer>
                  {([ user ]) => (
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
              </div>

              <div className="mt-5 mx-3 h-0 flex-1 overflow-y-auto">
                <div className="pt-4 flex flex-col gap-2 border-t mx-auto">
                  { navigation.map((item, index) => (
                    <Link
                      key={index}
                      to={item.href}
                      className="inline-flex items-center px-1 pt-1 text-lg font-medium text-gray-900"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}