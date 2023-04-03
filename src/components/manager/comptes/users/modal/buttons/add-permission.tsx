import usePermissions from "../../../../../../hooks/use-permissions";
import {Dispatch, Fragment, SetStateAction, useEffect, useState} from "react";
import {IPermission} from "../../../../../../utils";
import {Menu, Transition} from "@headlessui/react";
import {PlusIcon} from "@heroicons/react/20/solid";
import {classNames} from "../../../../../../utils/helper";

type Props = {
  permissions: IPermission[]
  setPermissions: Dispatch<SetStateAction<IPermission[]>>
}
export default function AddPermission ({ permissions, setPermissions }: Props){
  const { index } = usePermissions()
  const { data  } = index()
  const [filtered, setFiltered] = useState<IPermission[]>([])


  useEffect(() => {
    setFiltered(data.filter((permission: IPermission) => {
      const li = permissions.map((item) => item.id)
      return !li.includes(permission.id);
    }))
  },[permissions])

  function add (item: IPermission){
    setPermissions([...permissions, item])
  }

  return(
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button>
          <button className="bg-blue-100 px-4 py-2 font-thin text-lg rounded-md text-blue-500 flex items-center z-50">
            <PlusIcon className="w-6 font-bold" />
            <span>Ajouter Permission</span>
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
        <Menu.Items className="absolute left-0 p-4 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="relative">
            { filtered &&
              <div className="flex flex-col gap-2 w-auto">
                { filtered.map((permission: IPermission) => (
                  <button
                    onClick={() => add(permission)}
                    className={classNames(
                      'inline-flex items-center  rounded-full  px-2.5 py-0.5 text-xs font-medium text-gray-800',
                    )}
                    key={permission.id}
                  >
                    {permission.label}
                  </button>
                ))}
                { !filtered.length &&
                  <span className="text-gray-500">Plus de permissions disponibles</span>
                }
              </div>
            }
          </div>

        </Menu.Items>
      </Transition>
    </Menu>
  )
}