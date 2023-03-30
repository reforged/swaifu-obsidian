import {Fragment, useEffect, useState} from "react";
import {IPermission, IRole} from "../../../../../../utils";
import {Menu, Transition} from "@headlessui/react";
import {PlusIcon} from "@heroicons/react/20/solid";
import {classNames} from "../../../../../../utils/helper";
import useRoles from "../../../../../../hooks/use-roles";
import usePermissions from "../../../../../../hooks/use-permissions";


export default function AddRole ({selectedRol , setSelectedRol }){
    const { index : fetch } = useRoles()
    const { data: roles } = fetch()
    const  [filtered, setFiltered] =useState<IRole[]>([])

    useEffect(() => {
        if(selectedRol == 0){
            setFiltered(roles)
        }
        const data = roles.filter((role : IRole) => {
            const li = selectedRol.map((item : IRole) => item.id)
            return !li.includes(role.id)
        })
        console.log(selectedRol,roles)
        setFiltered(data)


    },[selectedRol,roles])

    function add (role: IRole){
        setSelectedRol(currentSelected => [...currentSelected,role])
    }
    return(
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button>
                    <button className="bg-blue-100 px-4 py-2 font-thin text-lg rounded-md text-blue-500 flex items-center">
                        <PlusIcon className="w-6 font-bold" />
                        <span>Ajouter Role</span>
                    </button>
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
                <Menu.Items className="absolute right-0 p-4 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                    <div className="relative">
                        { filtered &&
                            <div className="flex flex-col gap-2 w-auto">
                                { filtered.map((role: IRole) => (
                                    <button
                                        onClick={() => add(role)}
                                        className={classNames(
                                            'inline-flex items-center  rounded-full  px-2.5 py-0.5 text-xs font-medium text-gray-800',
                                        )}
                                        key={role.id}
                                    >
                                        {role.label}
                                    </button>
                                ))}
                                { !filtered.length &&
                                    <span className="text-gray-500">Plus de roles disponibles</span>
                                }
                            </div>
                        }
                    </div>

                </Menu.Items>
            </Transition>
        </Menu>
    )
}