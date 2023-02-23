import useComponentVisible from "../../../../hooks/useComponentVisible";
import {useContext, useEffect} from "react";
import ShowQuestionContext from "../../../../contexts/ShowQuestionContext";
import {AnimatePresence, motion} from "framer-motion";

export default function ModalQuestionView () {
  const { ref, isVisible, toggle , setIsVisible} = useComponentVisible()
  const [showQuestion, setShowQuestion] = useContext(ShowQuestionContext)

  useEffect(() => {
    if (showQuestion) setIsVisible(true)
    else setIsVisible(false)
  }, [showQuestion])

  return (
    <ShowQuestionContext.Consumer>
      {([showQuestion, setShowQuestion]) => (
        <div>
          { showQuestion &&
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
                    { showQuestion.label}
                  </div>
                </motion.div>
              }
            </AnimatePresence>
          }
        </div>
      )}
    </ShowQuestionContext.Consumer>
  )
}