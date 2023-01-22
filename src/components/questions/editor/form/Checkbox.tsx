import React, {Dispatch, SetStateAction, useEffect, useState} from 'react'
import { Switch } from '@headlessui/react'
import {classNames} from "../../../../utils/helper";
import {IReponse} from "@obsidian/type";
import useComponentVisible from "../../../../hooks/useComponentVisible";
import {AnimatePresence, motion} from "framer-motion";

type Props = {
  reponses: IReponse[]
  setReponses: Dispatch<SetStateAction<IReponse[]>>
}

export default function Checkbox ({ reponses, setReponses }: Props) {
  function addData (body: string) {
    setReponses([...reponses, {
      body: body, valide: false
    }])
  }

  function toggle (index: number) {
    const newList = reponses
    newList[index].valide = !newList[index].valide
    setReponses([...newList])
  }

  function removeData (index: number) {
    const list: IReponse[] = reponses
    list.splice(index, 1)
    setReponses([...list])
  }

  return (
    <div>
      {reponses &&
        <div>
          {reponses.map((item, index) => (
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

type ToggleProps = {
  enabled: boolean
  toggle: any
  index: number
}

const Toggle = ({ enabled, toggle, index }: ToggleProps) => {
  const [a, setA] = useState<boolean>(enabled)

  useEffect(() => {
    console.log("a " ,a)
  }, [a])

  return (
    <Switch
      checked={a}
      onChange={() => {
        toggle(index)
        setA(!a)
      }}
      className={classNames(
        a ? 'bg-indigo-600' : 'bg-gray-200',
        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
      )}
    >
      <span className="sr-only">Use setting</span>
      <span
        className={classNames(
          a ? 'translate-x-5' : 'translate-x-0',
          'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
        )}
      >
        <span
          className={classNames(
            a ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200',
            'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
          )}
          aria-hidden="true"
        >
          <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
            <path
              d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span
          className={classNames(
            a ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100',
            'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
          )}
          aria-hidden="true"
        >
          <svg className="h-3 w-3 text-indigo-600" fill="currentColor" viewBox="0 0 12 12">
            <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
          </svg>
        </span>
      </span>
    </Switch>
  )
}