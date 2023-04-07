import React, {Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import StateContext from "../../../../../contexts/StateContext";
import useComponentVisible from "../../../../../hooks/useComponentVisible";
import {PlusIcon} from "@heroicons/react/24/outline";
import useRoles from "../../../../../hooks/use-roles";
import {AnimatePresence, motion} from "framer-motion";
import {IRole, IUser} from "../../../../../utils";

type State = [
  user: IUser,
  setUser: Dispatch<SetStateAction<IUser>>
]
export default function RoleSelect () {
  const [user, setUser] = useContext<State>(StateContext)
  const { ref, toggle, isVisible } = useComponentVisible()
  const [filtered, setFiltered] = useState<IRole[]>([])
  const [value, setValue] = useState<string>('')
  const { index } = useRoles()
  const { data: roles } = index()

  useEffect(() => {
    setFiltered(roles.filter((role: IRole) => {
      if (!user.roles.map((item) => item.id).includes(role.id)) return role
    }))
  }, [user])

  function addRole (role: IRole) {
    setUser({
      ...user,
      roles: [...user.roles, role]
    })
  }

  function removeRole (index: number) {
    const li = user.roles
    li.splice(index, 1)
    setUser({
      ...user,
      roles: [...li]
    })
  }

  return (
    <div className="pt-4 relative">
      <h3>Roles</h3>
      <div className="flex items-center gap-2 flex-wrap relative pt-2">
        { user.roles.map((role, index) => (
          <button onClick={() => removeRole(index)} key={role.id}>
            <span className="inline-flex items-center rounded-md bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800">
              {role.label}
            </span>
          </button>
        ))}

        <div className="relative z-50">
          <button
            onClick={toggle}
            className="flex items-center border rounded-md px-1.5 text-sm relative"
          >
            <PlusIcon className="w-4" />
            <span>Ajouter un rôle</span>


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
                <div ref={ref} className="absolute top-0 left-0 bg-white border rounded-md w-56 z-50">
                  <div className="bg-gray-100 p-2 rela">
                    <input
                      type="text" placeholder={"Search for an roles"}
                      value={value}
                      className="border-none bg-transparent text-sm !ring-0 !outline-0 w-full"
                      onChange={(e) => setValue(e.currentTarget.value)}
                    />
                  </div>
                  <div className="bg-white p-2">
                    <span className="font-medium text-sm text-gray-600">Select an role</span>
                    <div className="flex flex-col gap-1 overflow-y-scroll max-h-36">
                      { filtered.map((role) => (
                        <button onClick={() => addRole(role)} key={role.id} className="inline-flex items-center rounded-md bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800">
                          {role.label}
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