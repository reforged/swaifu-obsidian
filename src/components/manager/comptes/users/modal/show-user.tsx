import React, {
  Dispatch,
  Fragment,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import StateContext from '../../../../../contexts/StateContext'
import { Transition, Dialog } from '@headlessui/react'
import {PlusIcon, XMarkIcon} from "@heroicons/react/24/outline";
import {EnvelopeIcon} from "@heroicons/react/20/solid";
import {classNames} from "../../../../../utils/helper";
import useRoles from "../../../../../hooks/use-roles";
import RoleSelect from "./role-select";
import useUsers from "../../../../../hooks/use-users";
import {IUser} from "../../../../../utils";
import PermissionSelect from "./permission-select";

type State = [
  user: IUser,
  setUser: Dispatch<SetStateAction<IUser>>
]

interface User {
  id: string
  email: string | undefined
  firstname: string
  lastname: string
  numero: string | undefined
  roles: string[]
  permissions: string[]
  password: string | undefined
}

type Props = {
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>
}
export default function ShowUser ({ open, setOpen }: Props) {
  const [user, setUser] = useContext<State>(StateContext)
  const [currentUser, setCurrentUser] = useState<IUser | null>(user)
  const [disabled, setDisabled] = useState<boolean>(true)
  const cancelButtonRef = useRef(null)
  const [password, setPassword] = useState<string>('')
  const { update } = useUsers()
  const { mutate: updateUser } = update()


  function handlerUpdate () {
    console.log(user.password)
    const newUser: User = {
      id: user.id!,
      email: user.email !== currentUser.email ? user.email : undefined,
      numero: user.numero !== currentUser.numero ? user.numero : undefined,
      firstname: user.firstname,
      lastname: user.lastname,
      password: user.password.length ? user.password : undefined,
      roles: user.roles.map((item) => item.id!),
      permissions: user.permissions.map((item) => item.id!),
    }

    Object.keys(newUser).forEach((key: string) => {
      if (newUser[key as keyof User] === undefined || newUser[key as keyof User] === null) {
        delete newUser[key as keyof User]
      }
    })

    console.log(newUser)

    updateUser(newUser)
    setOpen(false)
    setCurrentUser(null)
  }

  function sameListe (a: string[], b: string[]) {
    if (a.length !== b.length) return false
    for (const string of a) {
      if (!b.includes(string)) return false
    }
    return true
  }

  useEffect(() => {
    if (!currentUser) {
      setCurrentUser(user)
      return
    }
    console.log(user)
    if (
      user.lastname !== currentUser.lastname ||
      user.firstname !== currentUser.firstname ||
      user.email !== currentUser.email ||
      user.numero !== currentUser.numero ||
      user.password.length > 4 ||
      !sameListe(user.roles, currentUser.roles) ||
      !sameListe(user.permissions, currentUser.permissions)
    ) {
      console.log(user.firstname.length, user.lastname.length)
      if (user.firstname.length && user.lastname.length) {
        console.log("test")
        if (user.email.length || user.numero.length === 8) {
          setDisabled(false)
        } else {
          setDisabled(true)
        }
      } else {
        setDisabled(true)
      }


    } else {
      setDisabled(true)
    }
  }, [user])

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        onClose={setOpen}
        className="relative z-50"
        initialFocus={cancelButtonRef}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform  rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="flex items-center justify-between border-b pb-4">
                  <span>Account Settings</span>
                  <div className="hover:bg-gray-100 rounded-md p-1" onClick={() => setOpen(false)}>
                    <XMarkIcon className="w-5 h-5 text-gray-600" />
                  </div>
                </div>

                <div>
                  <div className="flex flex-col gap-2 pt-12">
                    <h2>User Information</h2>

                    <p className="text-sm text-gray-500">
                      Here you can edit public information about yourself. The changes will be displayed for oheter users within 5 minutes.
                    </p>

                  </div>

                  <div className="py-8 border-b">
                    <div>
                      <label htmlFor="email" className="block text-sm  leading-12 text-gray-900">
                        Adresse email
                      </label>
                      <div className="relative mt-2 rounded-md shadow-sm">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={user.email}
                          onChange={(e) => setUser({
                            ...user,
                            email: e.currentTarget.value
                          })}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>

                    <div className="pt-4">
                      <label htmlFor="numero" className="block text-sm  leading-12 text-gray-900">
                        Numéro étudiant
                      </label>
                      <div className="relative mt-2 rounded-md shadow-sm">
                        <input
                          type="text"
                          name="numero"
                          id="numero"
                          value={user.numero}
                          onChange={(e) => setUser({
                            ...user,
                            numero: e.currentTarget.value
                          })}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder="Numéro étudiant"
                        />
                      </div>
                    </div>

                    <div className="pt-4">
                      <span className="block text-sm font-medium leading-6 text-gray-900">Full name</span>

                      <div className="grid grid-cols-2 gap-5">

                        <div className="mt-2">
                          <input
                            type="text"
                            name="firstname"
                            id="firstname"
                            value={user.firstname}
                            onChange={(e) => setUser({
                              ...user,
                             firstname: e.currentTarget.value
                            })}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Nathaël"
                          />
                        </div>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="lastname"
                            id="lastname"
                            value={user.lastname}
                            onChange={(e) => setUser({
                              ...user,
                              lastname: e.currentTarget.value
                            })}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Bonnal"
                          />
                        </div>
                      </div>




                      <div className="pt-4">
                        <div className="flex justify-between">
                          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Password
                          </label>
                          <span className="text-sm leading-6 text-gray-500" id="email-optional">
                            Optional
                          </span>
                        </div>
                        <div className="mt-2">
                          <input
                            type="password"
                            name="password"
                            id="password"
                            value={user.password}
                            onChange={(e) => setUser({
                              ...user,
                              password: e.currentTarget.value
                            })}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Mot de passe"
                            aria-describedby="password-optional"
                          />
                        </div>
                      </div>
                    </div>

                  </div>
                  <RoleSelect />
                  <PermissionSelect />
                </div>
                <div className="flex justify-end pt-6">
                  <button
                    onClick={handlerUpdate} disabled={disabled} type="button"
                    className={classNames(
                      'rounded-md px-3 py-2 border',
                      disabled ? 'text-gray-400 bg-gray-50' : 'bg-indigo-500 text-white'
                    )}
                  >
                    Sauvegarder
                  </button>
                </div>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}