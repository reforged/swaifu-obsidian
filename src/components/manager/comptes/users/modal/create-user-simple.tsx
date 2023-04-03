import React, { useEffect, useState} from "react";
import {classNames} from "../../../../../utils/helper";
import useUsers from "../../../../../hooks/use-users";
import AddPermission from "./buttons/add-permission";
import {IPermission, IRole} from "../../../../../utils";
import {PlusIcon} from "@heroicons/react/24/outline";
import AddRole from "./buttons/add-role";
export default function CreateSimpleUser({ toggle }){
  const [disabled, setDisabled] = useState<boolean>(true)
  const { store } = useUsers()
  const { mutate: createUser } = store()

  const [firstname, setFirstname] = useState<string>('')
  const [lastname, setLastname] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [numero,setNumero] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [roles, setRoles] = useState<IRole[]>([])
  const [permissions, setPermissions] = useState<IPermission[]>([])

  useEffect(() => {
    if (firstname && lastname && password && (numero || email)) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [email, firstname, lastname, password, numero])


  function onSubmit () {
    createUser({
      password, lastname, firstname, email,numero,
      roles: roles.map((role) => role.id),
      permissions: permissions.map((permission) => permission.id)
    })
    toggle()
  }

  function deleteRole(index : number) {
    const list = roles

    list.splice(index, 1)

    setRoles([...list])
  }

  function deletePermission(index: number){
    const list = permissions
    list.splice(index, 1)
    setPermissions([...list])
  }

  return(
    <div className="p-8 flex flex-col h-full justify-between">
      <div>
        <h3 className="font-title text-2xl font-medium">Créer un Utilisateur</h3>

        <div className="col-span-6 sm:col-span-3">
          <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
            First name
          </label>
          <input
            type="text"
            name="first-name"
            id="first-name"
            maxLength={30}
            minLength={1}
            onChange={(e) => setFirstname(e.currentTarget.value)}
            required
            className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="col-span-6 sm:col-span-3">
          <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
            Last name
          </label>
          <input
            type="text"
            name="last-name"
            id="last-name"
            maxLength={30}
            minLength={1}
            onChange={(e) => setLastname(e.currentTarget.value)}
            required
            className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label htmlFor="num" className="block text-sm font-medium leading-6 text-gray-900">
            Numéro Étudiant
          </label>
          <input
            type="text"
            name="num"
            id="num"
            maxLength={8}
            minLength={8}
            step={1}
            onChange={(e) => setNumero(e.currentTarget.value)}
            className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="col-span-6 sm:col-span-3">
          <label htmlFor="email-address" className="block text-sm font-medium leading-6 text-gray-900">
            Email address
          </label>
          <input
            type="email"
            name="email-address"
            id="email-address"
            onChange={(e) => setEmail(e.currentTarget.value)}
            className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="col-span-6 sm:col-span-3">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.currentTarget.value)}
            required
            className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div>
          <div className="relative mt-2">
            <span className="block truncate text-sm font-medium leading-6 text-gray-900">Roles</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"></span>
          </div>
          {roles.length &&
            <>
              {roles.map((role : IRole, index) => (
                <div className="relative">
                  <button
                    className="flex items-center gap-2 border px-3 py-2 rounded-md"
                    onClick={() => deleteRole(index)}
                  >
                    <span>{role.label}</span>
                    <span><PlusIcon className='w-6' /></span>
                  </button>
                </div>
              ))}
            </>
          }
          <AddRole roles={roles}  setRoles={setRoles}/>
        </div>
        <div>
          <div className="relative mt-2">
            <span className="block truncate text-sm font-medium leading-6 text-gray-900">Permissions</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"></span>
          </div>
          {permissions.length &&
            <>
              {permissions.map((permission : IPermission, index) => (
                <div className="relative">
                  <button
                    className="flex items-center gap-2 border px-3 py-2 rounded-md"
                    onClick={() => deletePermission(index)}

                  >
                    <span>{permission.label}</span>
                    <span><PlusIcon className='w-6' /></span>
                  </button>
                </div>
              ))}
            </>
          }
          <AddPermission permissions={permissions} setPermissions={setPermissions} />
        </div>


        <div className="mt-8">
          <button
            onClick={onSubmit}
            disabled={disabled}
            className={classNames(
              'rounded-md px-3 py-2 border w-full',
              disabled ? 'text-gray-400 bg-gray-50' : 'bg-indigo-500 text-white'
            )}
          >
            Créer votre Utilisateur
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 p-12">
        <div className="flex items-center gap-2">

        </div>

      </div>
    </div>
  )
}