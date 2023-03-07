import { Menu, Transition } from '@headlessui/react'
import React, {Fragment, useContext} from "react";
import {IQuestion} from "../../../utils";
import { exist, isEmpty } from "../../../utils/helper";
import useQuestions from "../../../hooks/use-questions";
import SequenceContext from "../../../contexts/SequenceContext";
import {PlusIcon} from "@heroicons/react/24/outline";

type Props = {}

export default function AddQuestion ({}: Props) {
  const { fetch } = useQuestions()
  const { data: questions } = fetch()
  const [sequence, setSequence] = useContext(SequenceContext)

  return (
    <div className="relative">
      <Menu>
        <Menu.Button className="w-full">
          <button
            type="button"
            className="relative bg-gray-100 block w-full rounded-lg border border-gray-300 p-4 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span className="mt-2 block text-sm font-semibold text-gray-900">Ajouter une question</span>
          </button>
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute top-0 left-0 w-full h-50 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50 focus:outline-none">
            <div className="flex flex-col">
              <div className="bg-gray-50">
                <input
                  type="text"
                  placeholder={"Search for an question..."}
                  className="bg-none border-none bg-transparent outline-0 w-full focus:ring-0"
                />
              </div>

              <div className="flex flex-col p-4">
                { questions
                  && <>
                    { isEmpty(questions, sequence.questions)
                      ? <div>Plus de questions</div>
                      : <>
                        {questions.map((question: IQuestion) => {
                          if (!exist(question, sequence.questions)) {
                            return (
                              <Question question={question} key={question.id}/>
                            )
                          }
                        })}
                      </>
                    }

                  </>
                }
              </div>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

type QuestionProps = {
  question: IQuestion
}
function Question ({ question }: QuestionProps) {
  const [sequence, setSequence] = useContext(SequenceContext)

  function addQuestion () {
    setSequence({
      ...sequence,
      questions: [...sequence.questions, question]
    })
  }

  return (
    <button
      className="group hover:bg-gray-100 p-2 justify-between flex items-center"
      onClick={addQuestion}
    >
      <div>
         <span>
        { question.label }
      </span>
      </div>

      <div>
        <span className="hidden group-hover:flex">
          <PlusIcon className="w-6 text-gray-500" />
        </span>
      </div>


    </button>
  )
}