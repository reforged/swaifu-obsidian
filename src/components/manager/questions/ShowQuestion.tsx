import React, {useEffect, useState} from 'react'
import {IEtiquette, IQuestion} from "@obsidian/type";
import {ListBulletIcon, PencilSquareIcon, PlusIcon, QueueListIcon} from "@heroicons/react/24/outline";
import {classNames, ReactElement} from "../../../utils/helper";
import useComponentVisible from "../../../hooks/useComponentVisible";
import {AnimatePresence, motion} from "framer-motion";
import {ArrowDownRightIcon, XMarkIcon} from "@heroicons/react/20/solid";
import Markdoc from "@markdoc/markdoc";
import Fence from "../Fence";
import {Prose} from "../Prose";
import Markdown from "../Markdown";

type Props = {
  question: IQuestion
}
type ButtonProps = {
  click: () => any
  data: any
}
type EtiquetteProps = {
  data: IEtiquette
}

function TypeQuestion ({ type }: { type: string}) {
  const types = [
    {name: 'Réponse libre', icon: PencilSquareIcon, value: 'input'},
    {name: 'Réponse multiple', icon: ListBulletIcon, value: 'checkbox'},
    {name: 'Réponse unique', icon: QueueListIcon, value: 'radio'},
  ]

  let selection = 0

  types.map((item, index) => {
    if (item.value === type) {
      selection = index

    }
  })

  return (
    <div className="flex items-center gap-2 text-gray-700">
      <ReactElement tag={types[selection].icon} className={classNames('w-6 h-6')} />
      <span>{types[selection].name}</span>
    </div>
  )
}

const Etiquette = ({ data }: EtiquetteProps) => {
  return (
    <div className="bg-white border border-gray-300 text-gray-900 px-2 rounded-full">
      <span>{ data.label }</span>
    </div>
  )
}
const Button = ({ click, data }: ButtonProps) => {
  return (
    <button
      type={"button"}
      onClick={click}
      className={"w-full text-left"}
    >
      <div className="bg-gray-50 rounded-md p-3 duration-100 ease-in-out hover:bg-gray-100">
        <div className="flex flex-col gap-4">
          <div>
            { data.etiquettes
              && <div className="flex items-center gap-3">
                { data.etiquettes.map((etiquette: IEtiquette) => <Etiquette key={etiquette.id} data={etiquette} />)}
              </div>
            }
          </div>
          <div className="flex flex-col">
            <span className="text-gray-900 text-3xl font-bold">{ data.label }</span>
            <TypeQuestion type={data.type}/>
          </div>
        </div>
      </div>
    </button>

  )
}

export default function Question ({ question }: Props) {
  const { ref, isVisible, toggle } = useComponentVisible()
  const [body, setBody] = useState<string>(question.enonce)
  const [bodyMd, setBodyMd] = useState<any>()

  useEffect(() => {
    const ast = Markdoc.parse(body)

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
  }, [body])

  const close = () => {
    toggle()
  }

  return (
    <div>
      <Button click={toggle} data={question} />
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
            <div ref={ref} className="absolute left-1/2 top-12 transform -translate-x-1/2 h-[70%] w-2/3 py-8 bg-white border border-gray-200 rounded-lg shadow-xl">

              <div className="absolute top-0 left-0 p-2">
                <div className="flex items-center gap-3 text-gray-600">
                  <span className="bg-purple-200 text-purple-900 px-1  rounded-md">Questions</span>
                  <span>/</span>
                  <span>{ question.label }</span>
                </div>
              </div>
              <div className="absolute top-0 right-0 p-2">
                <button>
                  <ArrowDownRightIcon className="w-6 h-6 stroke-2"/>
                </button>
                <button onClick={close}>
                  <XMarkIcon className="w-6 h-6 stroke-2" />
                </button>
              </div>

              <div className="flex justify-between border-b p-2 pt-8">
                <div className="w-1/6">
                  <TypeQuestion type={question.type} />
                </div>

                <div className=" text-center">
                  <span className={'font-bold text-2xl'}>{ question.label }</span>
                </div>
                <div className="flex w-1/6 items-center gap-2  justify-between">
                  <div className="isolate flex right-0 ">
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

              <div className="w-full grid grid-cols-2">
                <textarea
                  onChange={(e) => setBody(e.currentTarget.value)}
                  value={body}
                  className="w-full focus:outline-none border-none" name="" id=""  cols={30} rows={10}
                />
                <div>
                  <Markdown data={body} />
                </div>
              </div>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </div>
  )
}