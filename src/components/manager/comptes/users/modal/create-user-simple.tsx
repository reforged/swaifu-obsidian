import React, { useEffect, useState} from "react";
import {classNames} from "../../../../../utils/helper";
import useUsers from "../../../../../hooks/use-users";
import useRoles from "../../../../../hooks/use-roles";
import usePermissions from "../../../../../hooks/use-permissions";
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
    const [selectedroles, setSelectedrole] = useState([])
    const [ selectedpermissions , setSelectedpermission] = useState<IPermission[]>([])

    useEffect(() => {
        if (firstname && lastname && password) {
            if (email != ''){
                if (email.includes('@')){
                    setDisabled(false)
                    }
                else {
                    setDisabled(true)
                }
            }
            else if (numero != '') {
                if (numero.length ==8){
                    setDisabled(false)
                }
                else {
                    setDisabled(true)
                }
            }
            else {
                setDisabled(true)
            }
        }else {
            setDisabled(true)
        }

        const rolesid = Idroles()
        const permissionsid = Idpermissions()
        console.log({firstname,lastname,password,email,numero,rolesid,permissionsid})

    }, [email, firstname, lastname, password, numero, selectedroles ,selectedpermissions])



    function Idroles(){
        const rolesid = selectedroles.map((item : IRole) => item.id)
        return rolesid
    }
    function Idpermissions(){
        const permissionsid = selectedpermissions.map((item : IPermission) => item.id)
        return permissionsid
    }
    function OnSubmit () {
        const roles = Idroles()
        const permissions = Idpermissions()
        createUser({ password, lastname, firstname, email,numero,roles,permissions})
        console.log({password, lastname, firstname,email})
        toggle()
    }

    function deleterol(role : IRole){
        const data = selectedroles.filter(
            selectedItem => selectedItem !== role)
        setSelectedrole(data)

    }
    function deleteper(permission : IPermission){
        const data = selectedpermissions.filter(
            selectedItem => selectedItem !== permission)
        setSelectedpermission(data)
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
                    {selectedroles.length !=0 ? (
                        <>
                            {selectedroles.map((role : IRole) => (
                                <div className="relative">
                                    <button
                                        className="flex items-center gap-2 border px-3 py-2 rounded-md"
                                        onClick={() => deleterol(role)}

                                    >
                                        <span>{role.label}</span>
                                        <span><PlusIcon className='w-6' /></span>
                                    </button>
                                </div>
                            ))}
                        </>
                    ) : <div></div>
                    }
                    <AddRole selectedRol={selectedroles} setSelectedRol={setSelectedrole} />
                </div>
                <div>
                    <div className="relative mt-2">
                        <span className="block truncate text-sm font-medium leading-6 text-gray-900">Permissions</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"></span>
                    </div>
                    {selectedpermissions.length !=0 ? (
                        <>
                            {selectedpermissions.map((permission : IPermission) => (
                                <div className="relative">
                                    <button
                                        className="flex items-center gap-2 border px-3 py-2 rounded-md"
                                         onClick={() => deleteper(permission)}

                                    >
                                        <span>{permission.label}</span>
                                        <span><PlusIcon className='w-6' /></span>
                                    </button>
                                </div>
                            ))}
                        </>
                    ) : <div></div>
                    }
                    <AddPermission selectedPer={selectedpermissions} setSelectedPer={setSelectedpermission} />
                </div>




                <div className="mt-8">
                    <button
                        onClick={OnSubmit}
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