import {useContext, useEffect, useState} from "react";
import useComponentVisible from "../../../../../hooks/useComponentVisible";
import {AnimatePresence, motion} from "framer-motion";
import BoardContext from "../../../../../contexts/BoardContext";
import {XMarkIcon} from "@heroicons/react/20/solid";

export default function ImportCsv () {
  const [csvFile, setCsvFile] = useState(null)
  const { ref, isVisible, toggle, setIsVisible } = useComponentVisible()
  const [board, setBoard] = useContext(BoardContext)

  useEffect(() => {
    setIsVisible(board.open)
  }, [board])

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
            <div ref={ref} className="absolute left-1/2 top-12 transform -translate-x-1/2 h-[90%] w-[60%] py-8 bg-white border border-gray-200 rounded-md">
              <div className="absolute top-0 right-0">
                <span>
                  <XMarkIcon className="w-6" />
                </span>
              </div>
              <div className="border-b">
                <span className="font-title font-medium text-2xl text-gray-700">Utilisateurs</span>
              </div>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </div>
  )
}