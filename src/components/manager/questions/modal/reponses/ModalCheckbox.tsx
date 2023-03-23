import QuestionContext from "../../../../../contexts/QuestionContext";
import React, {Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import { Switch } from "@headlessui/react";
import {IQuestion, IReponse} from "../../../../../utils";
import {Prose} from "../../../Prose";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import Fence from "../../../Fence";
import {classNames} from "../../../../../utils/helper";
import {CheckIcon, TrashIcon, XMarkIcon} from "@heroicons/react/24/outline";
import Toggle from "../../../Toggle";
import ShowQuestionContext from "../../../../../contexts/ShowQuestionContext";

type Props = {
  context: typeof ShowQuestionContext | typeof QuestionContext
}

export default function ModalCheckbox ({ context }: Props) {
  const [question, setQuestion] = useContext(context)
  const [data, setData] = useState<string>('')
  const [valide, setValide] = useState<boolean>(false)
  const [disabled, setDisabled] = useState<boolean>(true)
  const [selected, setSelected] = useState<IReponse | null>(null)

  useEffect(() => {
    if (data.length) setDisabled(false)
    else setDisabled(true)
  }, [data])

  function submit () {
    const objet: IReponse = {
      body: data,
      valide: valide
    }

    setData('')
    setValide(false)
    setSelected(null)

    setQuestion({
      ...question!,
      reponses: [...question!.reponses, objet]
    })

  }
  return (
    <div>
        <div>
          <div className="bg-[#F2F1EE] p-2">
            <span className="text-gray-700 text-md">Créer tes réponses</span>
          </div>
          <div className="divide-x grid grid-cols-4">
            <div className="p-2">
              <span className="text-gray-600 text-sm">Réponses</span>
              <div>
                { question!.reponses.length >= 1
                  && <div>
                    <TodoReponses setSelected={setSelected} context={context}/>
                  </div>
                }
                <div>
                  <button
                    onClick={() => setSelected(null)}
                    className="group hover:bg-gray-100 rounded-md p-2 w-full text-left"
                  >
                    Créer une réponse
                  </button>
                </div>
              </div>
            </div>
            <div className="col-span-3">
              { selected
                ? <ShowReponse reponse={selected} />
                :
                <div>
                  <div className="p-2 grid grid-cols-2 divide-x overflow-y-scroll">
                    <textarea
                      rows={3}
                      name={"body"}
                      id={"body"}
                      className="body w-full resize-none border-0 py-3 focus:ring-0 sm:text-sm"
                      placeholder="Ecrivez votre réponse"
                      value={data}
                      onChange={(e) => setData(e.currentTarget.value)}
                    />
                    <div className="p-2">
                      <ReactMarkdown
                        children={data}
                        components={{
                          code: ({node, ...props}) => Fence({ children: props})
                        }}
                        remarkPlugins={[remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end p-4">
                    <div>
                      <Switch
                        checked={valide}
                        onChange={() => {
                          setValide(!valide)
                        }}
                        className={classNames(
                          valide ? 'bg-indigo-600' : 'bg-gray-200',
                          'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                        )}
                      >
                        <span className="sr-only">Use setting</span>
                        <span
                          className={classNames(
                            valide ? 'translate-x-5' : 'translate-x-0',
                            'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                          )}
                        >
                          <span
                            className={classNames(
                              valide ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200',
                              'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
                            )}
                            aria-hidden="true"
                          >
                            <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                              <path
                                d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          <span
                            className={classNames(
                              valide ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100',
                              'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
                            )}
                            aria-hidden="true"
                          >
                            <svg className="h-3 w-3 text-indigo-600" fill="currentColor" viewBox="0 0 12 12">
                              <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                            </svg>
                          </span>
                        </span>

                      </Switch>
                    </div>
                    <div className="">
                      <button
                        type="button" onClick={submit}
                        disabled={disabled}
                        className={classNames(
                          'rounded-md px-2 py-1 border ',
                          disabled ? 'bg-gray-100' : 'bg-green-100'
                        )}
                      >
                        Créer réponse
                      </button>
                    </div>

                  </div>
                </div>
              }



            </div>
          </div>
        </div>
    </div>
  )
}

type ShowType = {
  reponse: IReponse
}
const ShowReponse = ({ reponse }: ShowType) => {
  return (
    <div className="p-2">
      <div className="relative">
        <span className="text-xs text-gray-400 absolute top-0 left-0">Énoncé</span>
        <div className="pt-6">
          <ReactMarkdown
            children={reponse.body}
            components={{
              code: ({node, ...props}) => Fence({ children: props})
            }}
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex]}
          />
        </div>
      </div>
    </div>
  )
}

type TodoReponsesProps = {
  setSelected: Dispatch<SetStateAction<IReponse | null>>
  context: typeof ShowQuestionContext | typeof QuestionContext
}
const TodoReponses = ({ setSelected, context }: TodoReponsesProps) => {
  return (
    <context.Consumer>
      {([question, setQuestion]) => (
        <div className="pt-4">
          { question!.reponses.map((reponse: IReponse, index: number) => (
            <div>
              <button
                key={index}
                className={classNames(
                  "group  rounded-md p-2 w-full text-left",
                  reponse.valide ? 'hover:bg-green-100 text-green-500' : 'hover:bg-red-100 text-red-500'
                )}
                onClick={(e) => {
                  setSelected(reponse)
                }}
              >
                <div className="flex justify-between items-center">
                  <div>
                    { reponse.valide ?
                      <CheckIcon className="h-4 w-4" />
                      : <XMarkIcon className="h-4 w-4" />
                    }

                  </div>
                  <span>Réponse {index+1}</span>
                  <span className="invisible group-hover:visible">
                    <button
                      type="button"
                      onClick={() => {
                        const list = question!.reponses
                        list.splice(index, 1)
                        setQuestion({
                          ...question!,
                          reponses: [...list]
                        })
                        setSelected(null)
                      }}
                    >
                      <TrashIcon className="h-6 w-6" />
                    </button>

                  </span>
                </div>

              </button>
            </div>

          ))}
        </div>
      )}
    </context.Consumer>
  )
}

