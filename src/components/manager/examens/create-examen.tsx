import useComponentVisible from "../../../hooks/useComponentVisible";
import {PlusIcon} from "@heroicons/react/24/outline";
import React from "react";
import {AnimatePresence, motion} from "framer-motion";

export default function CreateExamen () {
  const {ref, isVisible, toggle} = useComponentVisible()

  return (
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
             <div className="bg-white h-full" ref={ref}>
               dza
             </div>
           </div>
          </motion.div>
        }
      </AnimatePresence>
    </div>
  )
}