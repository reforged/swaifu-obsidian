import {IReponse} from "@obsidian/type";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import useComponentVisible from "../../../hooks/useComponentVisible";
import {AnimatePresence, motion} from "framer-motion";
import Toggle from '../../Toggle'
import {classNames} from "../../../utils/helper";

type Props = {
  type: string | undefined
  reponses: IReponse[]
  setReponses: Dispatch<SetStateAction<IReponse[]>>
}

export default function TodoQuestionsCheckbox ({ type, reponses, setReponses }: Props) {
  function addData (body: string) {
    setReponses([...reponses, { body: body, valide: false}])
  }

  function toggle (index: number) {
    const newList = reponses
    newList[index].valide = !newList[index].valide
    setReponses([...newList])
  }

  const removeData = (index: number)  => {
    console.log(index)
    if (reponses.length === 1) setReponses([])
    else {
      const list: IReponse[] = reponses
      list.splice(index, 1)
      setReponses([...list])
    }
  }

  return (
    <div className="mt-8">
        <div>
          { reponses &&

          <div>
            {reponses.map((item: any, index: number) => (
              <div className="flex gap-2 items-center justify-between" key={index}>
                <Toggle enabled={item.valide} toggle={toggle} index={index}/>
                <div>
                  {item.body}
                </div>

                <div>
                  <button onClick={() => removeData(index)}>Delete</button>
                </div>
              </div>
            ))}
          </div>


          }
        </div>

      <div>
        <CreateReponse addData={addData} />
      </div>
    </div>
  )
}

type CreateProps = {
  addData: any
}
const CreateReponse = ({ addData }: CreateProps) => {
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
        className=""
      >
        Add réponse
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
            <div ref={ref} className="absolute w-full top-10 left-0 bg-white border shadow-xl rounded-md overflow-hidden">
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
                      type="button" onClick={() => addData(body)} disabled={disabled}
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
