import React, { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { AuthenticationContext } from '../../contexts/AuthenticationContext'
import { IUser } from '../../utils'
import { classNames } from '../../utils/helper'
import userLogout from '../../hooks/user-logout'
import {Link} from "react-router-dom";
import {Cog6ToothIcon} from "@heroicons/react/24/outline";

export default function Profil () {
  const { mutate: logout } = userLogout()

  return (
    <AuthenticationContext.Consumer>
      {([ user ]) => (
        <>
          { user &&
            <Menu>
              <Menu.Button className="mx-auto w-full">
                <div className="flex items-center gap-3 hover:bg-[#E2E9F3] px-3 py-2 rounded-md">
                  <div className="bg-white text-slate-600 font-medium h-12 w-12 justify-center rounded-full flex text-lg  focus:ring-offset-2 items-center inline-block align-center mx-auto focus:ring-indigo-500">
                   <span className="">
                      { user.firstname[0] }
                    </span>
                  </div>
                  <span>{ user.firstname } { user.lastname }</span>
                </div>


              </Menu.Button>
              <SubMenu user={user} logout={logout}/>
            </Menu>
          }
        </>
      )}
    </AuthenticationContext.Consumer>
  )
}

type MenuProps = {
  user: IUser
  logout: any
}
const SubMenu = ({ user, logout }: MenuProps) => {
  return (
    <>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div className="absolute rounded-md right-0 top-16 mt-2 origin-top-left divide-y divide-gray-100 p-2 gap-3 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">

          <div className="py-1">
            <Link to={"/profil"}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-slate-100 text-slate-600 font-medium h-12 w-12 justify-center rounded-full flex text-lg  focus:ring-offset-2 items-center inline-block align-center mx-auto focus:ring-indigo-500">
                     <span className="">
                      { user.firstname[0] }
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span>{ user.firstname} {user.lastname}</span>
                    <span>{ user.email}</span>
                  </div>
                <div>
                  <Cog6ToothIcon className="w-6 h-6" />
                </div>
              </div>
              </div>
            </Link>
          </div>

          <div className="py-1">
            <button
              type="button"
              onClick={logout}
              className={classNames(
                'block w-full px-4 py-2 text-left text-sm'
              )}
            >
              Se déconnecter
            </button>
          </div>
        </div>
      </Transition>
    </>
  )
}