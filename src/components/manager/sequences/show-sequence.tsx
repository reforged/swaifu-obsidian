import {AnimatePresence, motion} from "framer-motion";
import useComponentVisible from "../../../hooks/useComponentVisible";

export default function ShowSequence () {
  const { ref, toggle, isVisible } = useComponentVisible()
  return (
    <div>
      <AnimatePresence>
        { isVisible &&
          <motion.div
            className="fixed z-[99] inset-0 bg-black bg-opacity-[30%] backdrop-blur-[2px] backdrop-brightness-100"
            animate={{ opacity: 1}}
            transition={{
              duration: 0.2,
              ease: [0.5, 0.71, 1, 1.5]
            }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
          >
            <div className="absolute w-full h-full p-8">
              <div className="bg-white h-full w-full rounded-md">
                team
              </div>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </div>
  )
}