import useComponentVisible from "../../../../../hooks/useComponentVisible";
import { Tab } from "@headlessui/react";
import {AnimatePresence, motion} from "framer-motion";
import { useContext, useEffect} from "react";
import BoardContext from "../../../../../contexts/BoardContext";
import {XMarkIcon} from "@heroicons/react/20/solid";
import { InboxArrowDownIcon, UserPlusIcon} from "@heroicons/react/24/outline";
import ImportCsv from "./import-csv";
import CreateSimpleUser from "./create-user-simple";

export default function CreateUser () {
  const { ref, isVisible, toggle, setIsVisible } = useComponentVisible()
  const [board, setBoard] = useContext(BoardContext)

  useEffect(() => {
    if (board.open) setIsVisible(true)
  }, [board.open])

  useEffect(() => {
    if (!isVisible) setBoard({
      ...board, open: false
    })
  }, [isVisible])

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
            <div ref={ref} className="absolute left-1/2 overflow-hidden top-12 transform -translate-x-1/2 h-[90%] w-[60%] bg-white border border-gray-200 rounded-md">
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
                    <h1 className="font-title  font-medium text-2xl text-gray-700 text-center">Utilisateurs</h1>
                  </div>
                  <div className=" h-full">
                    <Tab.Group>
                      <div className="grid grid-cols-12 divide-x h-full">
                        <div className="col-span-4 z-0 relative">
                          <Tab.List>
                            <div className="flex flex-col text-left p-8 gap-2">
                              <Tab className="ui-selected:bg-gray-100 rounded-md p-3 group hover:bg-gray-50">
                                <div className="flex gap-3 items-center">
                                  <span>
                                    <UserPlusIcon className="w-6" />
                                  </span>
                                  <span className="text-left">Créer un utilisateur</span>
                                </div>
                              </Tab>
                              <Tab className="ui-selected:bg-gray-100 rounded-md p-3 group hover:bg-gray-50">
                                <div className="flex gap-3 items-center">
                                  <span>
                                    <InboxArrowDownIcon className="w-6" />
                                  </span>
                                  <span className="text-left">Importer un CSV</span>
                                </div>
                              </Tab>
                            </div>

                          </Tab.List>
                        </div>
                        <div className="col-span-8 h-full overflow-y-scroll pb-12">
                          <Tab.Panels>
                            <div className="flex-1 h-full w-full flex-col">
                              <Tab.Panel>
                                <CreateSimpleUser toggle={toggle} />
                              </Tab.Panel>
                              <Tab.Panel>
                                <ImportCsv toggle={toggle} />
                              </Tab.Panel>
                            </div>

                          </Tab.Panels>
                        </div>
                      </div>
                    </Tab.Group>
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

