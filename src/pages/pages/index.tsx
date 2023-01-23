import React, {useContext, useEffect, useState} from 'react'
import questionsUser from "../../hooks/questions/questions-user";
import {AuthenticationContext} from "../../contexts/AuthenticationContext";
import ShowQuestion from "../../components/pages/ShowQuestion";
import useComponentVisible from "../../hooks/useComponentVisible";
import {AnimatePresence, motion} from "framer-motion";
import {ArrowDownRightIcon, MinusIcon, XMarkIcon} from "@heroicons/react/20/solid";
import {IQuestion, IReponse} from "@obsidian/type";
import {Prose} from "../../components/Prose";
import MarkDownRender from "../../components/questions/editor/MarkDownRender";
import {classNames} from "../../utils/helper";


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
            <span className="absolute top-0 left-0 p-2 text-gray-600">{index}</span>
            <div className="pt-4">
              <MarkDownRender data={item.body} />
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default function HomePage () {
  const { ref, isVisible, toggle } = useComponentVisible()
  const context = useContext(AuthenticationContext)
  const [selected, setSelected] = useState<number[]>([])
  const [questions, setQuestions] = useState<IQuestion[]>([])
  console.log(context.user)
  const { data } = questionsUser({ user: context.user!})

  useEffect(() => {
    const list = selected.map((item) => {
      return data[item]
    })
    setQuestions([...list])
  }, [selected])

  console.log(data)
  return (
    <div className="relative">
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <h1>Title</h1>
        </div>

        <div>
          <button onClick={toggle}>Créer la page</button>
          <AnimatePresence>
            { isVisible &&
              <motion.div
                className="fixed z-[99] inset-0 bg-black bg-opacity-75"
                animate={{opacity: 1}}
                transition={{
                  duration: 0.2,
                  ease: [0.5, 0.71, 1, 1.5],
                }}
                exit={{opacity: 0}}
                initial={{opacity: 0}}
              >
                <div ref={ref} className="absolute overflow-y-scroll left-1/2 top-12 transform  -translate-x-1/2 h-[70%] w-2/3 py-8 bg-white border border-gray-200 rounded-lg shadow-xl">
                  <div className="absolute top-0 right-0 p-2">
                    <div className="flex items-center gap-3 text-gray-600">
                      <button onClick={toggle}>
                        <XMarkIcon className="w-6 h-6 stroke-2" />
                      </button>
                    </div>
                  </div>
                  <div className="absolute top-0 left-0 p-2">
                    <span className="font-medium text-gray-900">Le questionnaire</span>
                  </div>

                  <div className="relative h-full flex flex-col gap-6 divide-y p-4">
                    { questions.map((question) => (
                      <div className="flex flex-col pt-6">
                        <div className="border rounded-md p-6 relative">
                          <span className="text-xs absolute top-0 left-0 p-2 text-gray-400">Énoncé</span>
                          <Prose>
                            <MarkDownRender data={question.enonce} />
                          </Prose>
                        </div>
                        { question.reponses.length ?
                          <div className="pt-4  mt-4">
                            { question.type === 'checkbox' && <ReponsesPreview data={question.reponses} /> }
                            { question.type === 'input' && <div className="py-20 border rounded-md relative">
                              <span className="text-xs absolute top-0 left-0 p-2 text-gray-400">Votre réponse</span>
                            </div> }
                          </div>

                          : <div className="pt-6">
                            <span className="text-sm text-gray-600 ">Pas de réponses générés</span>
                          </div>
                        }
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            }
          </AnimatePresence>
        </div>
      </div>
      <div>
        { data ?
          <ShowQuestion data={data} selected={selected} setSelected={setSelected} />
          : <div>
              <span>
                Vous n'avez pas de questions crées
              </span>
            </div>
        }
      </div>
    </div>
  )
}