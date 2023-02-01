import React, {ReactNode, useEffect, useState} from 'react'
import {AnimatePresence, motion} from 'framer-motion'
import useComponentVisible from '../../../hooks/useComponentVisible'
import { PlusIcon } from '@heroicons/react/24/outline'
import { XMarkIcon, ArrowDownRightIcon, MinusIcon } from '@heroicons/react/20/solid'
import { classNames } from '../../../utils/helper'
import Markdoc from '@markdoc/markdoc'
import { Prose } from '../Prose'
import Fence from '../Fence'
import SelectType from './editor/SelectType'
import { Tab } from '@headlessui/react'
import {IEtiquette, IQuestion, IReponse, ITypeQuestion} from '@obsidian/type'
import Render from './editor/Render'
import TodoQuestions from './editor/TodoQuestions'
import TodoEtiquettes from './editor/TodoEtiquettes'
import useEtiquettes from '../../../hooks/use-etiquettes'
import useQuestions from '../../../hooks/use-questions'
import Markdown from '../Markdown'
import ModalEtiquettes from "./editor/header/ModalEtiquettes";
import Header from "./editor/header/Header";

type Props = {}
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

  const [etiquettes, setEtiquettes] = useState<IEtiquette[]>([])
  const [type, setType] = useState<ITypeQuestion | null>(null)

  const { create } = useQuestions()
  const { fetch } = useEtiquettes()

  const { mutate: InitQuestion } = create()
  const { data: listEtiquettes} = fetch()

  const submit = () => {
    const data = {
      label: label,
      enonce: body,
      type: type?.value,
      etiquettes: etiquettes.map(item => item.id),
      reponses: reponses
    }
    InitQuestion(data)
    close()
  }

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

    if (label.length >= 4 && body.length >= 5 && reponses.length >= 1 && etiquettes.length >= 1) {
      const valide = reponses.some(item => item.valide)
      if (valide) setDisable(false)
      else setDisable(true)
    } else {
      setDisable(true)
    }

  }, [label, body, reponses, etiquettes])

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
              <div ref={ref} className="absolute left-1/2 top-12 transform  -translate-x-1/2 h-[70%] w-1/2 py-8 bg-white border border-gray-200 rounded-lg shadow-xl">

                <div className="absolute top-0 left-0 p-2">
                  <div className="flex items-center gap-3 text-gray-600">
                    <span className="bg-purple-200 text-purple-900 px-1  rounded-md">Questions</span>
                    <span>/</span>
                    <span>{ label ? label : 'Untitled' }</span>
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
                <div className="absolute bottom-0 right-0 p-2 z-50">
                  <button
                    disabled={disable} onClick={submit}
                    className={classNames('border rounded-md px-2 py-1', disable ? 'bg-gray-200' : 'bg-green-200')}
                  >
                    Créer question
                  </button>
                </div>
                <div className="relative h-full">
                  <Header 
                    label={label} setLabel={setLabel}
                    type={type} setType={setType}
                    etiquettes={etiquettes} setEtiquettes={setEtiquettes}
                  />
                  <div className="p-4 h-2/3 ">
                    <Tab.Group>
                      <Tab.List className="w-full flex grid grid-cols-3">
                        <Tab className="text-lg font-medium text-gray-500 ui-selected:bg-gray-100 ui-selected:text-gray-900 p-2 rounded-md">Enoncé</Tab>
                        <Tab className="text-lg font-medium text-gray-500 ui-selected:bg-gray-100 ui-selected:text-gray-900 p-2 rounded-md">Réponses</Tab>
                        <Tab className="text-lg font-medium text-gray-500 ui-selected:bg-gray-100 ui-selected:text-gray-900 p-2 rounded-md">Rendu</Tab>
                      </Tab.List>
                      <Tab.Panels className="h-full">
                        <Tab.Panel className=" h-full">
                          <div className="w-full grid grid-cols-2 divide-x h-full">
                            <textarea
                              onChange={(e) => setBody(e.currentTarget.value)}
                              value={body}
                              className="block w-full resize-none border-0 py-3 focus:ring-0 sm:text-sm h-full"
                              placeholder="Add your comment..."
                            />
                            <div className="overflow-hidden">
                             <Markdown data={body} />
                            </div>

                          </div>
                        </Tab.Panel>
                        <Tab.Panel>
                          <div>
                            <TodoQuestions type={type} reponses={reponses} setReponses={setReponses} />
                          </div>
                        </Tab.Panel>
                        <Tab.Panel>
                          <Render body={bodyMd} reponses={reponses} type={type} />
                        </Tab.Panel>
                      </Tab.Panels>
                    </Tab.Group>
                  </div>
                </div>
              </div>
            </motion.div>
          }
        </AnimatePresence>
    </div>
  )
}