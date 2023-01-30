import React, {useEffect, useState} from 'react'
import useComponentVisible from '../../../../hooks/useComponentVisible'
import {AnimatePresence, motion} from 'framer-motion'
import { PencilSquareIcon, QueueListIcon, ListBulletIcon} from '@heroicons/react/24/outline'
import { classNames, ReactElement } from '../../../../utils/helper'

type Reponse = {
  name: string
  icon: (...props: any) => JSX.Element
  value: string
}

type Props = {
  type: any
  setType: any
  setReponses: any
}

const types: Reponse[] = [
  {name: 'Réponse libre', icon: PencilSquareIcon, value: 'input'},
  {name: 'Réponse multiple', icon: ListBulletIcon, value: 'checkbox'},
]

export default function SelectType ({ type, setType, setReponses }: Props) {
  const { ref, isVisible, toggle} = useComponentVisible()
  const [data, setData] = useState<Reponse | null>(null)

  useEffect(() => {
    types.map((item) => {
      if (item.value === type) setData(item)
    })
  }, [type])

  return (
    <div className="relative">
      <button
        onClick={() => toggle()}
        className="px-4 py-2 hover:bg-gray-200 duration-100 ease-in-out rounded-md"
      >
        {
          data
            ? <div className="flex items-center gap-2">
              <ReactElement tag={data.icon} className={classNames('w-6 h-6')}/>
              <span className="text-sm">{data.name}</span>
            </div>
            : <span>Choisit le type des réponses</span>
        }
      </button>
      <AnimatePresence>
        { isVisible &&
          <motion.div
            className="absolute top-10 left-0 bg-white border rounded-md w-72"
            ref={ref}
            animate={{ opacity: 1}}
            transition={{
              duration: 0.2,
              ease: [0.5, 0.71, 1, 1.5],
            }}
            exit={{ opacity: 0}}
            initial={{ opacity: 0}}
          >
            <div className="flex flex-col divide-y">
              {types.map((type, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setType(type.value)
                    setReponses([])
                    toggle()
                  }}
                  className="flex items-center gap-2 text-gray-700 p-2 hover:bg-gray-200"
                >
                  <ReactElement tag={type.icon} className={classNames('w-6 h-6')}/>
                  <span>{type.name}</span>
                </button>
                ))}

            </div>
          </motion.div>
        }
      </AnimatePresence>
    </div>
  )
}