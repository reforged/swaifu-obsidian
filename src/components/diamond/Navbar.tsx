import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Disclosure, Menu, Transition, Dialog } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { classNames } from '../../utils/helper'
import DarkMode from "../DarkMode";
import {AuthenticationContext} from '../../contexts/AuthenticationContext'

type Props = {
  open: boolean
  setOpen: (a: boolean) => void
}
export default function Navbar ({ }: Props) {
  console.log(localStorage.theme)
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
                    src="https://cdn.discordapp.com/attachments/1052152529682710558/1064960787426324531/dzadazdazda.png"
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
                  {({ user }) => {
                    if (user) return (
                     <Menu>
                       <Menu.Button>
                         <span className="px-2 py-2 border rounded-md bg-gray-50 shadow-sm">{ user.firstname }</span>
                       </Menu.Button>
                       <div className="">
                         <Transition
                           as={Fragment}
                           enter="transition ease-out duration-100"
                           enterFrom="transform opacity-0 scale-95"
                           enterTo="transform opacity-100 scale-100"
                           leave="transition ease-in duration-75"
                           leaveFrom="transform opacity-100 scale-100"
                           leaveTo="transform opacity-0 scale-95"
                         >
                           <div className="absolute rounded-md left-0 -top-44 mt-2 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                             <div className="px-4 py-3">
                               <p className="text-sm">Connecté avec</p>
                               <p className="truncate text-sm font-medium text-gray-900">{ user.email }</p>
                             </div>

                             <div className="py-1">
                               <a
                                 href="src/components/manager/Profil#"
                                 className={classNames(
                                   'block px-4 py-2 text-sm'
                                 )}
                               >
                                 Account settings
                               </a>
                             </div>

                             <div className="py-1">
                               <button
                                 type="button"
                                 className={classNames(
                                   'block w-full px-4 py-2 text-left text-sm'
                                 )}
                               >
                                 Se déconnecter
                               </button>
                             </div>
                           </div>
                         </Transition>
                       </div>

                     </Menu>
                    )

                    return (
                      <Link to={"/login"}>Login</Link>
                    )
                  }}
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

type MobileProps = {
  open: boolean
}
function MobileNavbar ({ open }: MobileProps) {
  console.log(open)
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