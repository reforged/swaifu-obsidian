import React, {useState} from 'react'
import useComponentVisible from '../../../hooks/useComponentVisible'
import {AnimatePresence, motion} from 'framer-motion'
import { PencilSquareIcon, QueueListIcon, ListBulletIcon} from '@heroicons/react/24/outline'
import { classNames, ReactElement } from '../../../utils/helper'

type IReponse = {
  name: string
  icon: (...props: any) => JSX.Element
  value: string
}

const types: IReponse[] = [
  {name: 'Réponse libre', icon: PencilSquareIcon, value: 'input'},
  {name: 'Réponse multiple', icon: ListBulletIcon, value: 'checkbox'},
  {name: 'Réponse unique', icon: QueueListIcon, value: 'radio'},
]

export default function SelectType () {
  const { ref, isVisible, toggle} = useComponentVisible()
  const [type, setType] = useState<IReponse>(types[0])
  return (
    <div className="relative">
      <button
        onClick={() => toggle()}
        className="px-4 py-2 hover:bg-gray-200 duration-100 ease-in-out rounded-md"
      >
        Asign test
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
              {types.map((type) => (
                <button className="flex items-center gap-2 text-gray-700 p-2 hover:bg-gray-200">
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