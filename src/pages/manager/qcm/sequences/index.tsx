import React, {useContext, useEffect, useState} from 'react'
import {AuthenticationContext} from "../../../contexts/AuthenticationContext";
import ShowQuestion from "../../../components/manager/pages/ShowQuestion";
import useComponentVisible from "../../../hooks/useComponentVisible";
import {AnimatePresence, motion} from "framer-motion";
import {ArrowDownRightIcon, MinusIcon, XMarkIcon} from "@heroicons/react/20/solid";
import {IQuestion, IReponse} from "@obsidian/type";
import {Prose} from "../../../components/manager/Prose";
import MarkDownRender from "../../../components/manager/questions/editor/MarkDownRender";
import {classNames} from "../../../utils/helper";
import useQuestions from "../../../hooks/use-questions";
import useSequences from "../../../hooks/use-sequences";
import {useQuery} from "react-query";
import CreateSequence from "../../../components/manager/sequences/CreateSequence";


type ReponsesPreviewProps = {
  data: IReponse[]
}

const ReponsesPreview = ({ data }: ReponsesPreviewProps) => {
  return (
    <div>
      <span className="text-gray-600 text-medium">Les différentes réponses</span>

      <div className="grid grid-cols-3 gap-3">
        { data.map((item, index) => (
          <div
            className={classNames(
              'border p-4 rounded-md relative bg-gray-50'
            )}
            key={index}
          >
            <span className="absolute top-0 m-2 left-0 p-2 text-gray-600 border bg-white rounded-sm"></span>
            <div className="pt-4">
              <MarkDownRender data={item.body} />
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default function HomeSequence () {
  const { ref, isVisible, toggle } = useComponentVisible()
  const [selected, setSelected] = useState<number[]>([])
  const [questions, setQuestions] = useState<IQuestion[]>([])
  const { fetchByUser } = useQuestions()
  const { getAll } = useSequences()
  const { data } = useQuery('sequences', getAll)


  return (
    <div className="relative p-4 w-full z-0 h-screen">
      <div className="flex justify-between items-center border-b">
        <div>
          <h1>Title</h1>
        </div>

        <div>
          <button onClick={toggle}>Créer la page</button>

        </div>
      </div>
      <div>
        <div className="grid grid-cols-4 gap-3 pt-4 relative z-none">
          { data && <span>Existe</span>
          }
          <div>
            <button
              type="button"
              onClick={toggle}
              className="relative w-full h-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-0"
            >
              <span className="mt-2 block text-sm font-medium text-gray-900">Créer une séquence</span>
            </button>
          </div>
        </div>
      </div>

      <div>
        <AnimatePresence>
          { isVisible &&
            <motion.div
              className=""
              animate={{opacity: 1}}
              transition={{
                duration: 0.2,
                ease: [0.5, 0.71, 1, 1.5],
              }}
              exit={{opacity: 0}}
              initial={{opacity: 0}}
            >
              <CreateSequence toggle={toggle} />
            </motion.div>
          }
        </AnimatePresence>
      </div>
    </div>
  )
}