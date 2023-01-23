import React, {useEffect, useState} from 'react'
import useComponentVisible from "../../../../hooks/useComponentVisible";
import {AnimatePresence, motion} from "framer-motion";
import {classNames} from "../../../../utils/helper";

type Props = {
  addData: any
}

export default function CreateReponse ({ addData }: Props) {
  const { ref, isVisible, toggle } = useComponentVisible()
  const [body, setBody] = useState<string>('')
  const [disabled, setDisabled] = useState<boolean>(true)

  useEffect(() => {
    if (body) setDisabled(false)
    else setDisabled(true)
  }, [body])

  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggle}
        className="border rounded-md bg-gray-50 px-2 py-1 mt-4"
      >
        Ajouter une réponse
      </button>

      <AnimatePresence>
        { isVisible &&
          <motion.div
            className=""
            animate={{opacity: 1}}
            transition={{
              duration: 0.2,
              ease: [0.5, 0.71, 1, 1.5],
            }}
            exit={{opacity: 0}}
            initial={{opacity: 0}}
          >
            <div ref={ref} className="absolute w-full top-16 left-0 bg-white border shadow-xl rounded-md overflow-hidden">
              <div className="bg-gray-50 border-b">
                <div className="p-2">
                  <span>Proposition de réponse</span>
                </div>
              </div>
              <div className="relative m-4">
                <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                  <label htmlFor="comment" className="sr-only">
                    Add your comment
                  </label>
                  <textarea
                    rows={3}
                    name="comment"
                    id="comment"
                    className="block w-full resize-none border-0 py-3 focus:ring-0 sm:text-sm"
                    placeholder="Add your comment..."
                    value={body}
                    onChange={(e) => setBody(e.currentTarget.value)}
                  />

                  <div className="py-2" aria-hidden="true">
                    <div className="py-px">
                      <div className="h-9" />
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 p-2">
                  <div className="">
                    <button
                      type="button"
                      onClick={() => {
                        addData(body)
                        toggle()
                      }} disabled={disabled}
                      className={classNames('border rounded-md px-2 py-1', disabled ? 'bg-gray-200' : 'bg-green-200' )}
                    >
                      Créer réponse
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