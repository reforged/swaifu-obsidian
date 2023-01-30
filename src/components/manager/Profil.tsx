import React, { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { AuthenticationContext } from '../../contexts/AuthenticationContext'
import { IUser } from '@obsidian/type'
import { classNames } from '../../utils/helper'
import userLogout from '../../hooks/user-logout'

type Props = {}

export default function Profil ({ }: Props) {
  const { mutate: logout } = userLogout()

  return (
    <AuthenticationContext.Consumer>
      { ({ user }) => (
        <>
          { user &&
            <Menu>
              <Menu.Button>
                <span className="px-2 py-2 border rounded-md bg-gray-50 shadow-sm">
                  { user.email }
                </span>
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
              onClick={() => logout()}
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