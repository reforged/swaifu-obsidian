import useComponentVisible from "../../../../../hooks/useComponentVisible";
import {AnimatePresence, motion} from "framer-motion";
import React, {useContext, useEffect, useState} from "react";
import BoardContext from "../../../../../contexts/BoardContext";
import {XMarkIcon} from "@heroicons/react/20/solid";
import useRoles from "../../../../../hooks/use-roles";
import {classNames} from "../../../../../utils/helper";
import RoleSelect from "../../users/modal/role-select";
import {IPermission} from "../../../../../utils";
import usePermissions from "../../../../../hooks/use-permissions";
import {PlusIcon} from "@heroicons/react/24/outline";
import PermissionSelect from "../../../permission-select";


export default function CreateRole () {
  const { ref, isVisible, toggle, setIsVisible } = useComponentVisible()
  const [board, setBoard] = useContext(BoardContext)

  const [label, setLabel] = useState<string>('')
  const [power, setPower] = useState(0)
  const [permissions, setPermissions] = useState<IPermission[]>([])
  const [disabled, setDisabled] = useState<boolean>(true)
  const { index, store } = useRoles()
  const { mutate: createRole } = store()
  const { data: roles} = index()

  useEffect(() => {
    if (label && power && roles) {

      for (let i = 0; i < roles.length; i++) {
        if (roles[i].label === label) setDisabled(true)
        else setDisabled(false)
      }
    } else {
      setDisabled(true)
    }
  }, [label, power])

  useEffect(() => {
    if (board.open) setIsVisible(true)
  }, [board.open])

  useEffect(() => {
    if (!isVisible) setBoard({
      ...board, open: false
    })
  }, [isVisible])

  function onSubmit () {
    createRole({
      label,
      power: Math.round(power),
      permissions: permissions.map((item) => item.id)
    })
    toggle()
  }

  return (
    <div>
      <AnimatePresence>
        { isVisible &&
          <motion.div
            className="fixed z-20 inset-0 bg-black bg-opacity-25"
            animate={{ opacity: 1}}
            transition={{
              duration: 0.2,
              ease: [0.5, 0.71, 1, 1.5]
            }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
          >
            <div ref={ref} className="absolute left-1/2 overflow-hidden top-12 transform -translate-x-1/2 h-auto w-[60%] bg-white border border-gray-200 rounded-md">
              <div className="relative h-full">
                <button
                  className="absolute top-0 right-8 bg-gray-100 rounded-md text-gray-400 p-1 my-4"
                  onClick={toggle}
                >
                <span>
                  <XMarkIcon className="w-6" />
                </span>
                </button>

                <div className="max-h-full h-full">
                  <div className="border-b py-4">
                    <h1 className="font-title  font-medium text-2xl text-gray-700 text-center">Roles</h1>
                  </div>
                  <div className=" h-full">
                      <div className="">
                        <div className="col-span-4">
                          <div className="flex flex-col text-left p-8 gap-2">
                            <div className="">
                              <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                  <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Label
                                  </label>
                                  <input
                                    type="text"
                                    name="first-name"
                                    id="first-name"
                                    onChange={(e) => setLabel(e.currentTarget.value)}
                                    autoComplete="given-name"
                                    className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>


                                <div className="col-span-1">
                                  <label htmlFor="power" className="block text-sm font-medium leading-6 text-gray-900">
                                    Power
                                  </label>
                                  <input
                                    type="number"
                                    name="power"
                                    id="power"
                                    pattern="[0-9]"
                                    onChange={(e) => setPower(e.currentTarget.value)}
                                    className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>
                            </div>
                            <PermissionSelect permissions={permissions} setPermissions={setPermissions} />
                            <div className="mt-8">
                              <button
                                onClick={onSubmit}
                                disabled={disabled}
                                className={classNames(
                                  'rounded-md px-3 py-2 border w-full',
                                  disabled ? 'text-gray-400 bg-gray-50' : 'bg-indigo-500 text-white'
                                )}
                              >
                                Créer votre role
                              </button>
                            </div>
                          </div>

                        </div>
                      </div>


                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </div>
  )
}

