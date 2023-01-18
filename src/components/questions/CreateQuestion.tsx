import React, {MutableRefObject, useState} from 'react'
import {AnimatePresence, motion} from 'framer-motion'
import useComponentVisible from "../../hooks/useComponentVisible";
import {PlusIcon} from "@heroicons/react/24/outline";
import {classNames} from "../../utils/helper";

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
  const submit = () => {}
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
              <div ref={ref} className="absolute left-1/2 top-1/3 transform -translate-y-1/2 -translate-x-1/2 w-2/3 py-8 bg-white border border-gray-200 rounded-lg shadow-xl">
                <div className="flex justify-between items-center border-b p-4">
                  <div>
                    <span>Link a collection</span>
                  </div>
                  <div>
                    <button className="w-full">
                      <div className="p-5 w-full">
                        <input
                          id="content"
                          defaultValue={label}
                          onChange={(e) => setLabel(e.currentTarget.value)}
                          className={classNames(
                            'block w-full px-2 py-1 focus:outline-none',
                          )}
                        />
                      </div>
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
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
              </div>
            </motion.div>
          }
        </AnimatePresence>
    </div>
  )
}