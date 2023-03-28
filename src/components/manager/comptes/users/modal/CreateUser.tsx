import React, {Fragment, useEffect, useState} from "react";
import {classNames} from "../../../../../utils/helper";
import useUsers from "../../../../../hooks/use-users";
import useRoles from "../../../../../hooks/use-roles";
import {Listbox, Transition} from "@headlessui/react";
import {CheckIcon, ChevronUpDownIcon} from "@heroicons/react/20/solid";
import usePermissions from "../../../../../hooks/use-permissions";
export default function CreateSimpleUser(){

    const [disabled, setDisabled] = useState<boolean>(true)

    const [firstname, setFirstname] = useState<string>('')
    const [lastname, setLastname] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [numero,setNumero] = useState<string>('')
    const [email, setEmail] = useState<string>('')

    const { index :fetchRoles} = useRoles()
    const { data: roles} = fetchRoles()
    const [selectedrole, setSelectedrole] = useState(roles[0])
    const { index : fetchPerms } = usePermissions()
    const { data: permissions } = fetchPerms()
    const [selectedpermission, setSelectedpermission] = useState(permissions[0])

    const { createonecode,createoneemail } = useUsers()
    const { mutate: createUseremail } = createoneemail()
    const { mutate: createUsercode } = createonecode()


    useEffect(() => {
        console.log({firstname,lastname,password,email,numero})

        if (firstname && lastname && password) {
            if (email != ''){
                if (numero =='' && email.includes('@')){
                    setDisabled(false)
                    }
                else {
                    setDisabled(true)
                }
            }
            else if (numero != '') {
                if (email == '' && numero.length ==8){
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


        console.log({disabled})
    }, [email, firstname, lastname, password, numero, selectedrole ,selectedpermission])


    function submit (){
        if (email==''){
            return emailSubmit()
        }
        else {
            return emailSubmit()
        }
    }

    function emailSubmit () {
        createUseremail({ password, lastname, firstname, email})
        console.log({password, lastname, firstname,email})
    }
    function numeroSubmit () {
        createUsercode({ password, lastname, firstname, numero})
        console.log({password, lastname, firstname,numero})
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
                    <Listbox value={selectedrole} onChange={setSelectedrole}>
                        {({ open }) => (
                            <>
                                <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">Roles</Listbox.Label>
                                <div className="relative mt-2">
                                    <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                        <span className="block truncate">{selectedrole.label}</span>
                                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </span>
                                    </Listbox.Button>

                                    <Transition
                                        show={open}
                                        as={Fragment}
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                            {roles.map((item) => (
                                                <Listbox.Option
                                                    key={item.id}
                                                    className={({ active }) =>
                                                        classNames(
                                                            active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                            'relative cursor-default select-none py-2 pl-8 pr-4'
                                                        )
                                                    }
                                                    value={item}
                                                >
                                                    {({ selected, active }) => (
                                                        <>
                                                            <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                              {item.label}
                                                            </span>

                                                            {selected ? (
                                                                <span
                                                                    className={classNames(
                                                                        active ? 'text-white' : 'text-indigo-600',
                                                                        'absolute inset-y-0 left-0 flex items-center pl-1.5'
                                                                    )}
                                                                >
                                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                </span>
                                                            ) : null}
                                                        </>
                                                    )}
                                                </Listbox.Option>
                                            ))}
                                        </Listbox.Options>
                                    </Transition>
                                </div>
                            </>
                        )}
                    </Listbox>

                </div>
                <div>
                    <Listbox value={selectedpermission} onChange={setSelectedpermission}>
                        {({ open }) => (
                            <>
                                <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">Permissions</Listbox.Label>
                                <div className="relative mt-2">
                                    <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                        <span className="block truncate">{selectedpermission.label}</span>
                                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </span>
                                    </Listbox.Button>

                                    <Transition
                                        show={open}
                                        as={Fragment}
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                            {permissions.map((item) => (
                                                <Listbox.Option
                                                    key={item.id}
                                                    className={({ active }) =>
                                                        classNames(
                                                            active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                            'relative cursor-default select-none py-2 pl-8 pr-4'
                                                        )
                                                    }
                                                    value={item}
                                                >
                                                    {({ selected, active }) => (
                                                        <>
                                                            <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                              {item.label}
                                                            </span>

                                                            {selected ? (
                                                                <span
                                                                    className={classNames(
                                                                        active ? 'text-white' : 'text-indigo-600',
                                                                        'absolute inset-y-0 left-0 flex items-center pl-1.5'
                                                                    )}
                                                                >
                                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                </span>
                                                            ) : null}
                                                        </>
                                                    )}
                                                </Listbox.Option>
                                            ))}
                                        </Listbox.Options>
                                    </Transition>
                                </div>
                            </>
                        )}
                    </Listbox>

                </div>

                <div className="mt-8">
                    <button
                        onClick={submit}
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