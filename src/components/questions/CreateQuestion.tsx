import React, {ReactNode, useEffect, useState} from 'react'
import {AnimatePresence, motion} from 'framer-motion'
import useComponentVisible from '../../hooks/useComponentVisible'
import {PlusIcon} from '@heroicons/react/24/outline'
import { XMarkIcon, ArrowDownRightIcon, MinusIcon} from "@heroicons/react/20/solid";
import {classNames} from '../../utils/helper'
import Markdoc from '@markdoc/markdoc'
import {Prose} from '../Prose'
import Fence from '../Fence'
import SelectType from './editor/SelectType'
import { Tab } from '@headlessui/react'
import {IReponse} from '@obsidian/type'
import TodoQuestionsCheckbox from '../questions/editor/TodoQuestionCheckbox'
import Render from "./editor/Render";
import TodoQuestions from "./editor/TodoQuestions";


type Props = {
}
type ButtonProps = {
  click: () => any
}

const Button = ({ click }: ButtonProps) => {
  return (
    <button
      type={"button"}
      onClick={click}
      className={"flex items-center gap-2 border rounded-md px-2 py-2 text-gray-800 "}
    >
      <PlusIcon className="mx-auto h-6 w-6" />
      <span>Créer questions</span>
    </button>
  )
}

export default function CreateQuestion ({ }: Props) {
  const { ref, isVisible, toggle } = useComponentVisible()
  const [label, setLabel] = useState<string>('')
  const [body, setBody] = useState<string>('')
  const [bodyMd, setBodyMd] = useState<ReactNode>()
  const [disable, setDisable] = useState<boolean>(true)
  const [reponses, setReponses] = useState<IReponse[]>([])
  const [type, setType] = useState()

  const submit = () => {
    console.log({
      label,
      body,
      reponses,
      type
    })
  }

  useEffect(() => {
    console.log(reponses)
  }, [reponses])

  const close = () => {
    setBody('')
    setLabel('')
    setReponses([])

    toggle()
  }

  const minimaze = () => {
    toggle()
  }

  useEffect(() => {
    const ast = Markdoc.parse(body);

    const content = Markdoc.transform(ast, {
      nodes: {
        fence: {
          render: 'Fence',
          attributes: {
            content: { type: String },
            language: { type: String}
          }
        }
      }
    })

    const children = Markdoc.renderers.react(content, React, {
      components: {
        Fence: Fence
      }
    })
    setBodyMd(children)

    if (label.length >= 4 && body.length >= 5 && reponses.length >= 1) {
      const valide = reponses.some(item => item.valide)
      if (valide) setDisable(false)
      else setDisable(true)
    } else {
      setDisable(true)
    }

  }, [label, body, reponses])
  return (
    <div>
        <Button click={toggle} />
        <AnimatePresence>
          {isVisible &&
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
              <div ref={ref} className="absolute left-1/2 top-12 transform  -translate-x-1/2 h-[70%] w-2/3 py-8 bg-white border border-gray-200 rounded-lg shadow-xl">
                <div className="absolute top-0 left-0 p-2">
                  <div className="flex items-center gap-3 text-gray-600">
                    <span className="bg-purple-200 text-purple-900 px-1  rounded-md">Questions</span>
                    <span>/</span>
                    <span>{ label }</span>
                  </div>
                </div>
                <div className="absolute top-0 right-0 p-2">
                  <div className="flex items-center gap-3 text-gray-600">
                    <button onClick={minimaze}>
                      <MinusIcon className="w-6 h-6 font-bold stroke-2" />
                    </button>
                    <button>
                      <ArrowDownRightIcon className="w-6 h-6 stroke-2"/>
                    </button>
                    <button onClick={close}>
                      <XMarkIcon className="w-6 h-6 stroke-2" />
                    </button>
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 p-2">
                  <button
                    disabled={disable} onClick={submit}
                    className={classNames('border rounded-md px-2 py-1', disable ? 'bg-gray-200' : 'bg-green-200')}
                  >
                    Créer question
                  </button>
                </div>
                <div className="flex justify-between items-center border-b p-4">
                  <div className="w-1/6">
                    <SelectType type={type} setType={setType} />
                  </div>

                  <div className="">
                    <button className="w-full">
                      <div className="p-5 w-full text-center">
                        <input
                          id="content"
                          maxLength={70}
                          defaultValue={label}
                          placeholder={"Title of question"}
                          onChange={(e) => setLabel(e.currentTarget.value)}
                          className={classNames(
                            'block w-full px-2 py-1 text-center focus:outline-none font-bold text-2xl',
                          )}
                        />
                      </div>
                    </button>
                  </div>
                  <div className="flex items-center gap-2 w-1/6">
                    <div className="isolate flex -space-x-1 ">
                      <img
                        className="relative z-30 inline-block h-8 w-8 rounded-full ring-2 ring-green-500 p-[2px] bg-white"
                        src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                      <img
                        className="relative z-20 inline-block h-8 w-8 rounded-full ring-2 ring-amber-500 p-[2px] bg-white"
                        src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                      <img
                        className="relative z-10 inline-block h-8 w-8 rounded-full ring-2 ring-blue-500 p-[2px] bg-white"
                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                        alt=""
                      />
                      <img
                        className="relative z-0 inline-block h-8 w-8 rounded-full ring-2 ring-fuchsia-500 p-[2px] bg-white"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </div>
                    <div>
                      <button
                        type="button"
                        className="inline-flex items-center rounded-full border border-transparent bg-indigo-600 p-1 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        <PlusIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <Tab.Group>
                    <Tab.List className="w-full flex grid grid-cols-3">
                      <Tab className="text-lg font-medium text-gray-500 ui-selected:bg-gray-100 ui-selected:text-gray-900 p-2 rounded-md">Enoncé</Tab>
                      <Tab className="text-lg font-medium text-gray-500 ui-selected:bg-gray-100 ui-selected:text-gray-900 p-2 rounded-md">Réponses</Tab>
                      <Tab className="text-lg font-medium text-gray-500 ui-selected:bg-gray-100 ui-selected:text-gray-900 p-2 rounded-md">Rendu</Tab>
                    </Tab.List>
                    <Tab.Panels>
                      <Tab.Panel>
                        <div className="w-full grid grid-cols-2">
                          <textarea
                            onChange={(e) => setBody(e.currentTarget.value)}
                            value={body}
                            className="w-full focus:outline-none border-none" name="" id=""  cols={30} rows={10}
                          />
                          <div>
                            <Prose>
                              {bodyMd}
                            </Prose>
                          </div>

                        </div>
                      </Tab.Panel>
                      <Tab.Panel>
                        <div>
                          <TodoQuestions type={type} reponses={reponses} setReponses={setReponses} />
                        </div>
                      </Tab.Panel>
                      <Tab.Panel>
                        <Render body={bodyMd} reponses={reponses} />
                      </Tab.Panel>
                    </Tab.Panels>
                  </Tab.Group>
                </div>

              </div>
            </motion.div>
          }
        </AnimatePresence>
    </div>
  )
}