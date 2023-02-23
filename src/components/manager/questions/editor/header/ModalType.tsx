import React, {useState, Dispatch, SetStateAction, useEffect, useContext} from 'react'
import { ITypeQuestion } from '../../../../../utils'
import useComponentVisible from '../../../../../hooks/useComponentVisible'
import { ListBulletIcon, PencilSquareIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import { AnimatePresence, motion } from 'framer-motion'
import { ReactElement, classNames } from '../../../../../utils/helper'
import QuestionContext from "../../../../../contexts/QuestionContext"


const types: ITypeQuestion[] = [
  {name: 'Réponse libre', icon: PencilSquareIcon, value: 'input'},
  {name: 'Réponse multiple', icon: ListBulletIcon, value: 'checkbox'},
]

export default function () {
  const [question] = useContext(QuestionContext)
  const [type, setType] = useState(types.find((item) => {
    if (item.value === question.type) return item
  }))

  return (
    <div className="relative z-[51]">
      <Content
          setType={setType}
          type={type}
      />
    </div>
  )
}

type ContentProps = {
    type: ITypeQuestion | undefined
    setType: Dispatch<SetStateAction<ITypeQuestion | undefined>>
}

const Content = ({ type, setType }: ContentProps) => {
  const { ref, isVisible, toggle } = useComponentVisible()
  return (
    <div className='grid grid-cols-12'>
      <div className="text-gray-500 flex items-center gap-2 col-span-4 xl:col-span-2">
        <QuestionMarkCircleIcon className='w-6 h-6' />
        <span className="text-md">Type</span>
      </div>
      <div className='hover:bg-gray-200 relative w-full z-40 col-span-8 xl:col-span-10 p-2 rounded-md duration-100 ease-in-out'>
        <div className="" onClick={toggle}>
          { type ?
            <div className="text-sm flex items-center">
                <div className="bg-orange-100 rounded-md px-2">{ type.name}</div>
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
              <div ref={ref} className="absolute w-full top-0 divide-y left-0 bg-white border rounded-md z-[40]">
                  <Modal type={type} setType={setType} toggle={toggle} />
              </div>
            </motion.div>
          }
        </AnimatePresence>
      </div>
    </div>
  )
}

type ModalProps = {
  type: ITypeQuestion | undefined
  toggle: () => void
  setType: Dispatch<SetStateAction<ITypeQuestion | undefined>>
}
const Modal = ({ type, setType, toggle }: ModalProps) => {
  return (
    <QuestionContext.Consumer>
      {([question, setQuestion]) => (
        <div>
          <div className="bg-gray-100 p-2">
            { type ?
              <div className="flex items-center gap-1 flex-wrap">
                <div className='bg-orange-100 rounded-md px-2 flex items-center gap-1'>
                  <span>{type.name}</span>
                </div>
              </div>
              : <div className='text-gray-600 text-md'>Choissisez un type de question</div>
            }
          </div>
          <div className="bg-white p-2">
            <span className="font-medium text-sm text-gray-600">Select an type</span>
            <div className="flex flex-col">

              { types.map((item: ITypeQuestion, index: number) => (
                <div className="group hover:bg-gray-100 py-1 px-2 rounded-md relative" key={index}>
                  <button
                    onClick={() => {
                      if (item.value !== type?.value) {
                        setType(item)
                        setQuestion({
                          ...question,
                          reponses: [],
                          type: item.value
                        })
                      }

                      toggle()
                    }}
                    className={"flex items-center justify-between w-full"}
                  >
                    <div className="flex items-center gap-2 text-gray-500">
                      <ReactElement tag={item.icon} className={classNames('w-4 h-4')}/>
                      <span className=''>{item.name}</span>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </QuestionContext.Consumer>

  )
}