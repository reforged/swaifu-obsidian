import React, {Dispatch, SetStateAction, useContext, useEffect, useState} from 'react'
import useComponentVisible from '../../../../../hooks/useComponentVisible'
import { AnimatePresence, motion } from 'framer-motion'
import useEtiquettes from '../../../../../hooks/use-etiquettes'
import { ListBulletIcon, XMarkIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline'
import { classNames } from '../../../../../utils/helper'
import { IEtiquette } from '../../../../../utils'
import {EtiquettesContext} from "../../../../../contexts/EtiquettesContext";
import QuestionContext from "../../../../../contexts/QuestionContext";

type Props = {
}

export default function ModalEtiquettes ({ }: Props) {
  const [value, setValue] = useState<string>('')
  const [question, setQuestion] = useContext(QuestionContext)

  function addEtiquette (etiquette: IEtiquette) {
    const id = question.etiquettes.map((etiquette) => etiquette.label)

    if (id.includes(etiquette.label)) return
    setQuestion({
      ...question,
      etiquettes: [...question.etiquettes, etiquette]
    })
  }

  function removeEtiquette (etiquette: IEtiquette) {
    const id = question.etiquettes.map((etiquette) => etiquette.id)
    if (!id.includes(etiquette.id)) return

    const index: number = id.indexOf(etiquette.id)
    const list = question.etiquettes
    list.splice(index, 1)
    setQuestion({
      ...question,
      etiquettes: [...list]
    })
  }

  return (
    <div className="relative z-[52]">
      <Content
        etiquettes={question.etiquettes}
        addEtiquette={addEtiquette}
        removeEtiquette={removeEtiquette}
        setValue={setValue}
        value={value}
      />
    </div>
  )
}

type ContentProps = {
  etiquettes: IEtiquette[]
  addEtiquette: (etiquette: IEtiquette) => void
  removeEtiquette: (etiquette: IEtiquette) => void
  value: string
  setValue: Dispatch<SetStateAction<string>>
}
const Content = ({ etiquettes, addEtiquette, removeEtiquette, value, setValue }: ContentProps) => {
  const { ref, isVisible, toggle, setIsVisible } = useComponentVisible()
  return (
    <div className="grid grid-cols-12">
      <div className="text-gray-500 flex items-center gap-2 col-span-4 xl:col-span-2">
        <ListBulletIcon className="w-6 h-6" />
        <span className="text-md">Étiquettes</span>
      </div>
      <div className="hover:bg-gray-200 relative w-full col-span-8 z-50 xl:col-span-10 p-2 rounded-md duration-100 ease-in-out">
        <div className="" onClick={toggle}>
          { etiquettes.length ?
            <div>
              <div className="text-sm flex items-center gap-1">
                { etiquettes.map((item: IEtiquette, index: number) => (
                  <div className="bg-orange-100 rounded-md px-2 " key={index}>{item.label}</div>
                ))}
              </div>

            </div>
            : <div className="text-gray-500">Empty</div>
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

              <div ref={ref} className="absolute w-full top-0 divide-y left-0 bg-white border rounded-md z-50">
                <Modal
                  addEtiquette={addEtiquette}
                  etiquettes={etiquettes}
                  removeEtiquette={removeEtiquette}
                  setValue={setValue}
                  value={value}
                />
              </div>
            </motion.div>
          }
        </AnimatePresence>

      </div>
    </div>
  )
}

type ModalProps = {
  addEtiquette: (etiquette: IEtiquette) => void
  removeEtiquette: (etiquette: IEtiquette) => void
  etiquettes: IEtiquette[]
  value: string
  setValue: Dispatch<SetStateAction<string>>
}

const Modal = ({ addEtiquette, etiquettes, removeEtiquette, value, setValue }: ModalProps) => {
  const { fetch, create } = useEtiquettes()
  const { data: listEtiquettes } = fetch()
  const mutation = create()
  const { etiquette } = useContext(EtiquettesContext)

  useEffect(() => {
    console.log(etiquette)
  }, [etiquettes])

  console.log(listEtiquettes)

  const filteredItems: IEtiquette[] = listEtiquettes.filter(
    (item: IEtiquette) =>
      JSON.stringify(item)
        .toLowerCase()
        .indexOf(value.toLowerCase()) !== -1
  )

  function keyExist (key: string) {
    const keys = listEtiquettes.map((item: IEtiquette) => item.label)
    return !!keys.includes(key)
  }

  function onKey (e: any) {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (!keyExist(value)) {
        const newEtiquette: IEtiquette = {
          label: value,
          color: 'bg-red-200'
        }
        setValue('')

        mutation.mutate(newEtiquette)
      }
    }
  }

  return (
    <div className="">
      <div className="bg-gray-100 p-2">
        <div className="flex items-center gap-1 flex-wrap">
          { etiquettes.map((item: IEtiquette) => (
            <div className="bg-orange-100 rounded-md px-2 flex items-center gap-1" key={item.id}>
              <span>{item.label}</span>
              <div>
                <XMarkIcon
                  className="h-4 w-4"
                  onClick={() => {
                    removeEtiquette(item)
                  }}
                />
              </div>
            </div>
          ))}
          <div className="w-auto flex-1">
            { etiquettes.length
              ? <input
                type="text"
                value={value}
                className="bg-none border-none bg-transparent outline-0 w-full"
                onChange={(e) => setValue(e.currentTarget.value)}
                onKeyDown={onKey}
              />
              : <input
                type="text" placeholder={"Search for an etiquette"}
                value={value}
                className="bg-none border-none bg-transparent outline-0 w-full"
                onChange={(e) => setValue(e.currentTarget.value)}
                onKeyDown={onKey}
              />
            }
          </div>
        </div>
      </div>
      <div className="bg-white p-2">
        <span className="font-medium text-sm text-gray-600">Select an etiquette or create one</span>
        <div className="flex flex-col">
          {filteredItems.map((item: IEtiquette) => (
            <div className="group hover:bg-gray-100 py-1 px-2 rounded-md relative" key={item.id}>
              <button
                key={item.id}
                onClick={() => {
                  addEtiquette(item)
                }}
                className={"flex items-center justify-between w-full"}
              >
                <div>
                  <span className={classNames(
                    'bg-green-200',
                    "px-1 rounded-md"
                  )}>{item.label}</span>
                </div>


              </button>
              <div className={"invisible group-hover:visible absolute top-0 right-2  top-[2px]  z-50"} onClick={() => console.log("Params")}>
                <div className="p-1 hover:bg-gray-200 rounded-md">
                  <EllipsisHorizontalIcon className="w-5 h-5" />
                </div>
              </div>
            </div>

          ))}
          { keyExist(value) || !value.length
            ? <></>
            : <div className="hover:bg-gray-100 flex items-center gap-2">
              <span>Create</span>
              <span className="bg-cyan-200 px-1 rounded-md">{value}</span>
            </div>
          }

        </div>
      </div>
    </div>
  )

}


type EtiquetteProps = {
  data: any
}
const Etiquette = ({data}: EtiquetteProps) => {
  return (
    <div className="relative">
      <div className={classNames(
        data.color
      )}>
        {data.label}
      </div>

    </div>
  )
}