import React, {useContext} from "react";
import SessionContext from "../../../contexts/SessionContext";
import useComponentVisible from "../../../hooks/useComponentVisible";
import {PlusIcon} from "@heroicons/react/24/outline";
import {AnimatePresence, motion} from "framer-motion";
import SelectSequence from "./select-sequence";
import ShowSession from "./panel/show-session";


export default function CreateSession () {
  const [session] = useContext(SessionContext)

  const { ref, isVisible, toggle } = useComponentVisible()

  return (
    <div className="col-span-1 h-full">
      <button
        type={"button"}
        onClick={toggle}
        className={"flex items-center gap-2 border rounded-md px-2 py-2 text-gray-800"}
      >
        <PlusIcon className={"mx-auto w-6 h-6"} />
        <span>Créer session</span>
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
            {session ?
              <ShowSession reference={ref} toggle={toggle} />
              :
              <div className="absolute left-1/2 -translate-x-1/2 p-8 w-full">
                <div className="relative h-full overflow-hidden rounded-md">
                  <div ref={ref} className="border border-gray-200 h-full bg-white">
                    <SelectSequence />
                  </div>
                </div>
              </div>
            }
          </motion.div>
        }
      </AnimatePresence>
    </div>
  )
}