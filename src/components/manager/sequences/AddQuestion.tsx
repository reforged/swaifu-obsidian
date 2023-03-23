import { Menu, Transition } from '@headlessui/react'
import React, {Fragment, useContext, useEffect, useState} from "react";
import {IQuestion, ISequence} from "../../../utils";
import {exist, isEmpty, uid} from "../../../utils/helper";
import useQuestions from "../../../hooks/use-questions";
import SequenceContext from "../../../contexts/SequenceContext";
import {PlusIcon} from "@heroicons/react/24/outline";
import Board from "../board/Board";
import {Option, Options} from "../board/types";
import useEtiquettes from "../../../hooks/use-etiquettes";
import BoardContext from "../../../contexts/BoardContext";
import LogicWrapper from "../board/logic/logic-wrapper";

type Props = {}

export default function AddQuestion ({}: Props) {
  const { fetch } = useQuestions()
  const { fetch: fetchEtiquettes } = useEtiquettes()
  const { data: etiquettes } = fetchEtiquettes()
  const { data: questions } = fetch()
  const [wrapper, setWrapper] = useState()
  const [options, setOptions] = useState<Options<IQuestion>>()
  const [sequence, setSequence] = useContext(SequenceContext)

  useEffect(() => {
    if (questions && !options) {
      setOptions({
        view: 'liste',
        label: 'Questions',
        selectData: {
          permissions: [],
          roles: [],
          etiquettes: etiquettes ? etiquettes : []
        },
        data: questions,
        search: '',
        filter: {
          uid: uid(),
          conjunction: 'and',
          conditions: [],
        },
        option: ['filter'],
        open: false,
        structure: [
          {label: 'Label', key: 'label', input: 'text', default: true, checked: true, filter: true},
          {label: 'Etiquettes', key: 'etiquettes', input: 'select', default: false, checked: true, filter: true},
        ],
        keys: ['label']
      })
    }
  }, [questions])




  return (
    <div className="relative">
      { options &&
        <Board name={'Questions'} options={options}>
          <BoardContext.Consumer>
            {([board]) => {
              const wrapper = new LogicWrapper(board.filter, questions)
              const filtered: IQuestion[] = wrapper.filteredData() as IQuestion[]
              if (!filtered.length) return (
                <div>Pas de données</div>
              )

              return (
                 <>
                  { isEmpty(questions, sequence.questions)
                    ? <div>Plus de questions</div>
                    : <>
                      {filtered.map((question: IQuestion) => {
                        if (!exist(question, sequence.questions)) {
                          return (
                            <Question question={question as IQuestion} key={question.id}/>
                          )
                        }
                      })}
                    </>
                  }

                </>
              )
            }}
          </BoardContext.Consumer>

        </Board>
      }

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