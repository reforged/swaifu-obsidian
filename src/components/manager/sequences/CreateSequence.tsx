import {XMarkIcon} from "@heroicons/react/20/solid";
import React, {
  createElement,
  Fragment,
  LegacyRef,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import {classNames} from "../../../utils/helper";
import {Menu, Transition} from "@headlessui/react";
import SequenceContext from "../../../contexts/SequenceContext";
import {PlusIcon, TrashIcon, WalletIcon} from "@heroicons/react/24/outline";
import useQuestions from "../../../hooks/use-questions";
import {IQuestion} from "../../../utils";
import AddQuestion from "./AddQuestion";
import {useDragAndDrop} from "../block-editor/utils";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";

type Props = {
  toggle: () => void
}
type TitleProps = {
  value: string
  className?: string,
  onChange: (value: string) => void
}
function Title ({ value, className, onChange }: TitleProps) {
  const textRef = useRef(value)
  const defaultProps = {
    className: classNames(className ? className : '', 'focus:outline-none'),
    contentEditable: true,
    suppressContentEditableWarning: true,
    placeholder: 'Titre',
    onInput: (event: any) => onChange(event.target.innerText)
  }

  return createElement('p', defaultProps as never, textRef.current ? textRef.current : 'Titre')
}

export default function CreateSequence ({ toggle }: Props) {
  const [sequence, setSequence] = useContext(SequenceContext)
  const [search, setSearch] = useState<string>('')
  const { fetch } = useQuestions()
  const { data: questions } = fetch()
  const { reorder } = useDragAndDrop()

  useEffect(() => {
    console.log(sequence)
  }, [sequence])

  function handleDragEnd (result) {
    if (!result.destination) return

    setSequence({
      ...sequence,
      questions: reorder(sequence.questions, result.source.index, result.destination.index) as IQuestion[]
    })
  }

  return (
    <div className="absolute top-0 left-0 h-full w-full p-4 z-50">
      <div className="relative border border-gray-200 rounded-lg shadow-xl z-50 h-full bg-gray-50 h-full">
        <div className="w-full bg-gray-100 flex justify-between items-center p-4 relative">
          <div className="text-center w-full">
            <span className="font-title uppercase">Créer séquence</span>
          </div>
          <div>
            <button
              onClick={toggle}
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12 h-full">
          <div className="col-span-4 border-r h-full">
            <div>
              <span>Nom de la séquence</span>
              <div>
                <Title
                  value={sequence.label}
                  onChange={(e) => {
                    setSequence({
                      ...sequence,
                      label: e
                    })
                  }}
                  className={classNames(
                    'block w-full py-1 focus:outline-none focus:border-none border-none font-bold text-3xl'
                  )}
                />
              </div>
            </div>
          </div>
          <div className="col-span-8 p-8">
            { sequence.questions.length
              ? <Fragment>
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="body">
                    {( provided ) => (
                      <div {...provided.droppableProps} ref={provided.innerRef as LegacyRef<HTMLDivElement>} className="relative">
                        <div className="flex flex-col">
                          {sequence.questions.map((question: IQuestion, index) => (
                            <Question question={question} key={question.id} index={index} />
                          ))}
                        </div>
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </Fragment>
              : <></>
            }
            <div className="pt-8">
              <AddQuestion />
            </div>


          </div>
        </div>
      </div>
    </div>
  )
}

type QuestionProps = {
  question: IQuestion
  index: number
}
function Question ({ question, index }: QuestionProps) {
  const [sequence, setSequence] = useContext(SequenceContext)

  function onDelete () {
    const list = sequence.questions
    list.splice(index, 1)
    setSequence({
      ...sequence,
      questions: [...list]
    })
  }

  return (
    <Draggable draggableId={question.id!} index={index}>
      {( provided, snapshot ) => (
        <div
          className="group hover:bg-gray-100 relative p-4 flex justify-between items-center"
          ref={provided.innerRef as LegacyRef<HTMLDivElement>} {...provided.draggableProps} {...provided.dragHandleProps}
        >
          <div className="flex items-center gap-2">
            <div className="" {...provided.dragHandleProps}>
               <div className="dnd-button" />
            </div>
            <span>{question.label}</span>
          </div>
          <div className="">
            <button
              onClick={onDelete}
            >
              <TrashIcon className="w-6 invisible group-hover:visible text-gray-500" />
            </button>
          </div>
        </div>
      )}
    </Draggable>
  )
}