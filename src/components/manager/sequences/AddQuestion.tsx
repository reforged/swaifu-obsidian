import { Menu, Transition } from '@headlessui/react'
import React, {Fragment, useContext} from "react";
import {IQuestion, ISequence} from "../../../utils";
import {exist, isEmpty, uid} from "../../../utils/helper";
import useQuestions from "../../../hooks/use-questions";
import SequenceContext from "../../../contexts/SequenceContext";
import {PlusIcon} from "@heroicons/react/24/outline";
import Board from "../board/Board";
import {Option, Options} from "../board/types";
import useEtiquettes from "../../../hooks/use-etiquettes";

type Props = {}

export default function AddQuestion ({}: Props) {
  const { fetch } = useQuestions()
  const { fetch: fetchEtiquettes } = useEtiquettes()
  const { data: etiquettes } = fetchEtiquettes()
  const { data: questions } = fetch()

  const [sequence, setSequence] = useContext(SequenceContext)
  const options: Options<IQuestion> = {
    view: 'liste',
    label: 'Questions',
    data: {
      questions: questions,
      etiquettes: etiquettes ? etiquettes : []
    },
    search: '',
    filter: {
      uid: uid(),
      conjunction: 'and',
      conditions: [],
    },
    option: ['filter'],
    open: false,
    structure: [
      {label: 'Label', key: 'label', input: 'text', default: true, checked: true},
      {label: 'Etiquettes', key: 'etiquettes', input: 'select', default: false, checked: true}
    ],
    keys: []
  }


  return (
    <div className="relative">
      <Board name={'Questions'} options={options}>
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
      </Board>
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