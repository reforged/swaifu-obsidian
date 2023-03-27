import useComponentVisible from '../../../hooks/useComponentVisible'
import {PlusIcon} from '@heroicons/react/24/outline'
import React, {useState} from 'react'
import {AnimatePresence, motion} from 'framer-motion'
import {XMarkIcon} from '@heroicons/react/20/solid'
import ExamenContext from '../../../contexts/ExamenContext'
import {IExamen} from "./types";

export default function CreateExamen () {
  const {ref, isVisible, toggle} = useComponentVisible()
  const [examen, setExamen] = useState<IExamen>({
    label: 'Untitled',
    options: []
  })

  return (
    <ExamenContext.Provider value={[examen, setExamen]}>
      <div>
        <button
          type={"button"}
          onClick={toggle}
          className={"flex items-center gap-2 border rounded-md px-2 py-2 text-gray-800 "}
        >
          <PlusIcon className="mx-auto h-6 w-6" />
          <span>Créer examen</span>
        </button>

        <AnimatePresence>
          { isVisible &&
            <motion.div
              className="fixed z-[99] inset-0 bg-black bg-opacity-[30%] backdrop-blur-[2px] backdrop-brightness-100"
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.2,
                ease: [0.5, 0.71, 1, 1.5],
              }}
              exit={{ opacity: 0}}
              initial={{ opacity: 0}}
            >
              <div className="absolute w-full h-full p-8">
                <div className="bg-white h-full rounded-md border relative overflow-hidden" ref={ref}>
                  <Modal toggle={toggle} />
                </div>
              </div>
            </motion.div>
          }
        </AnimatePresence>
      </div>
    </ExamenContext.Provider>
  )
}

function Modal ({ toggle }) {
  return (
    <div>
      <div className="w-full bg-gray-100 flex border-b justify-between items-center p-4 relative">
        <div className="text-center w-full">
          <span className="font-title uppercase">Créer examen</span>
        </div>
        <div>
          <button
            onClick={toggle}
            className="hover:bg-gray-200 p-1 rounded-md"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
      <div className="p-4">
        {/* HEADER */}
        <div></div>
        {/* BOARD */}
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-8 bg-red-500">

            test 1
          </div>
          <div className="col-span-4 relative">

            <div className="p-4 rounded-md border bg-white shadow-sm">
              <span className="text-md text-gray-900 font-semibold">Notifications</span>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}