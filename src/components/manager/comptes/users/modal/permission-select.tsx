import {IPermission, IUser} from "../../../../../utils";
import React, {Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import StateContext from "../../../../../contexts/StateContext";
import useComponentVisible from "../../../../../hooks/useComponentVisible";
import usePermissions from "../../../../../hooks/use-permissions";
import {PlusIcon} from "@heroicons/react/24/outline";
import {AnimatePresence, motion} from "framer-motion";

type State = [
  user: IUser,
  setUser: Dispatch<SetStateAction<IUser>>
]

export default function PermissionSelect () {
  const [user, setUser] = useContext<State>(StateContext)
  const { ref, toggle, isVisible } = useComponentVisible()
  const [filtered, setFiltered] = useState<IPermission[]>([])
  const [value, setValue] = useState<string>('')

  const { index } = usePermissions()
  const { data: permissions } = index()

  useEffect(() => {
    setFiltered(permissions.filter((permission: IPermission) => {
      if (!user.permissions.map((item) => item.id).includes(permission.id)) return permission
    }))
  }, [user])

  function addPermission (permission: IPermission) {
    setUser({
      ...user,
      permissions: [...user.permissions, permission]
    })
  }

  function removePermission (index: number) {
    const li = user.permissions
    li.splice(index, 1)

    setUser({
      ...user,
      permissions: [...li]
    })
  }

  return (
    <div className="pt-4 relative z-0">
      <h3>Permissions</h3>

      <div className="flex items-center gap-2 flex-wrap relative pt-2">
        { user.permissions.map((permission, index) => (
          <button onClick={() => removePermission(index)} key={permission.id}>
            <span className="inline-flex items-center rounded-md bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800">
              {permission.key}
            </span>
          </button>
        ))}

        <div className="relative z-50">
          <button
            onClick={toggle}
            className="flex items-center border rounded-md px-1.5 text-sm relative"
          >
            <PlusIcon className="w-4" />
            <span>Ajouter une permission</span>
          </button>

          <AnimatePresence>
            { isVisible &&
              <motion.div
                animate={{opacity: 1}}
                transition={{
                  duration: 0.2,
                  ease: [0.5, 0.71, 1, 1.5],
                }}
                exit={{opacity: 0}}
                initial={{opacity: 0}}
              >
                <div ref={ref} className="absolute top-0 left-0 bg-white border rounded-md w-56  z-50">
                  <div className="bg-gray-100 p-2">
                    <input
                      type="text" placeholder={"Search for an permissions"}
                      value={value}
                      className="border-none bg-transparent text-sm !ring-0 !outline-0 w-full"
                      onChange={(e) => setValue(e.currentTarget.value)}
                    />
                  </div>
                  <div className="bg-white p-2">
                    <span className="font-medium text-sm text-gray-600">Select an permission</span>
                    <div className="flex flex-col gap-1 overflow-y-scroll max-h-36">
                      { filtered.map((permission) => (
                        <button onClick={() => addPermission(permission)} key={permission.id} className="inline-flex items-center rounded-md bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800">
                          {permission.key}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            }
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}