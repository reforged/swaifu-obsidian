import React, { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import AuthenticationContext from '../../contexts/AuthenticationContext'
import { IUser } from '../../utils'
import { classNames } from '../../utils/helper'
import {Link} from "react-router-dom";
import {Cog6ToothIcon} from "@heroicons/react/24/outline";
import useAuthentication from "../../hooks/use-authentication";

export default function Profil () {
  const { logout } = useAuthentication()
  const { mutate: disconnectUser } = logout()
  function handleClick () {
    disconnectUser()
  }

  return (
    <AuthenticationContext.Consumer>
      {([ user ]) => (
        <>
          { user &&
            <Menu as="div" className="relative ml-3">
              <div>
                <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none">
                  <div className="bg-gray-100 text-slate-600 font-medium h-12 w-12 justify-center rounded-full flex text-lg   items-center inline-block align-center mx-auto">
                       <span className="">
                          { user.firstname[0] }
                        </span>
                  </div>

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
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">

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
          }
        </>
      )}
    </AuthenticationContext.Consumer>
  )
}