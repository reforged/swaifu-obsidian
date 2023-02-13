import useComponentVisible from "../../../../../hooks/useComponentVisible";
import {InboxStackIcon} from "@heroicons/react/24/outline";
import QuestionContext from "../../../../../contexts/QuestionContext";
import {AnimatePresence, motion} from "framer-motion";
import ModalCheckbox from "../../modal/reponses/ModalCheckbox";
import ModalText from "../../modal/reponses/ModalText";
type Props = {

}

export default function ModalReponses ({}: Props) {

  return (
    <div className="relative z-50">
      <Content />
    </div>
  )
}


const Content = () => {
  const { ref, isVisible, toggle, setIsVisible } = useComponentVisible()

  return (
    <QuestionContext.Consumer>
      {([question]) => (
        <div className="grid grid-cols-12">
          <div className="text-gray-500 flex items-center gap-2 col-span-4 xl:col-span-2">
            <InboxStackIcon className="w-6 h-6" />
            <span className="text-md">Questions</span>
          </div>
          <div className="hover:bg-gray-200 relative w-full col-span-8 xl:col-span-10 p-2 rounded-md duration-100 ease-in-out">
            <div onClick={toggle}>
              { question.reponses.length
                ? <div className="flex items-center gap-2">
                  <span className="px-2 bg-gray-100 rounded-sm flex">{question.reponses.length}</span>
                  <span>réponse{ question.reponses.length > 1 && "s"}</span>
                </div>
                : <span className="text-gray-500">Empty</span>
              }
            </div>

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
                  <div ref={ref} className="absolute w-full top-0 divide-y left-0 bg-white border rounded-md z-[100]">
                    { question.type
                      ? <div>
                        { question.type === 'checkbox' && <ModalCheckbox /> }
                        { question.type === 'input' && <ModalText /> }
                      </div>
                      : <div className="p-2">
                        <span className="text-gray-500">Veuillez sélectionner un type de question</span>
                      </div>

                    }
                  </div>
                </motion.div>
              }
            </AnimatePresence>
          </div>
        </div>
      )}
    </QuestionContext.Consumer>

  )
}