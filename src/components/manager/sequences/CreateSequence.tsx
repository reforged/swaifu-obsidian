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
import {AnimatePresence, motion} from "framer-motion";
import useComponentVisible from "../../../hooks/useComponentVisible";
import useSequences from "../../../hooks/use-sequences";
import {Option} from "../board/types";

type Props = {

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
    placeholder: 'Untitled',
    onInput: (event: any) => onChange(event.target.innerText)
  }

  return createElement('p', defaultProps as never, textRef.current ? textRef.current : 'Untitled')
}

export default function CreateSequence ({ }: Props) {
  const [sequence, setSequence] = useContext(SequenceContext)
  const { ref, isVisible, toggle } = useComponentVisible()
  const [search, setSearch] = useState<string>('')
  const { fetch } = useQuestions()
  const { data: questions } = fetch()
  const { reorder } = useDragAndDrop()

  useEffect(() => {
    console.log(sequence)
  }, [sequence])

  return (
    <div className="col-span-1 h-full">
      <button
        type={"button"}
        onClick={toggle}
        className={"flex items-center gap-2 border rounded-md px-2 py-2 text-gray-800 "}
      >
        <PlusIcon className="mx-auto h-6 w-6" />
        <span>Créer séquence</span>
      </button>
      <AnimatePresence>
        { isVisible &&
          <motion.div
            className="fixed z-[99] inset-0 bg-black bg-opacity-[30%] backdrop-blur-[2px] backdrop-brightness-100"
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.2,
              ease: [0.5, 0.71, 1, 1.5],
            }}
            exit={{ opacity: 0}}
            initial={{ opacity: 0}}
          >
            <div className="absolute left-1/2 relative top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-full h-full p-8 ">
              <div className="relative h-full overflow-hidden">
                <div ref={ref} className=" border border-gray-200 h-full bg-blue-500 rounded-lg shadow-2xl">
                  <Modal toggle={toggle} />
                </div>
              </div>


            </div>
          </motion.div>
        }
      </AnimatePresence>
    </div>
  )
}

function Modal ({ toggle }) {
  const [sequence, setSequence] = useContext(SequenceContext)
  const [disabled, setDisabled] = useState<boolean>(true)
  const { reorder } = useDragAndDrop()
  const { store } = useSequences()
  const { mutate: create } = store()

  function onCreate () {
    create({
      label: sequence.label,
      questions: sequence.questions.map((question) => question.id)
    })
    toggle()
  }

  useEffect(() => {
    if (sequence.label && sequence.questions.length > 1) setDisabled(false)
    else setDisabled(true)
  }, [sequence])

  function handleDragEnd (result) {
    if (!result.destination) return

    setSequence({
      ...sequence,
      questions: reorder(sequence.questions, result.source.index, result.destination.index) as IQuestion[]
    })
  }

  return (
    <div className="relative h-full">
      <div className="relative border border-gray-200 rounded-lg shadow-xl z-50 h-full h-full">
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
          <div className="col-span-3 border-r h-full p-4 bg-white bg-opacity-75 backdrop-blur-xl">
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

            <div className="bg-gray-100 border border-gray-300 rounded-md p-4 overflow-y-scroll h-72 py-8">
              <Fragment>
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="questions">
                    {( provided ) => (
                        <div className="flex flex-col relative"
                             ref={provided.innerRef}
                             {...provided.droppableProps}
                        >
                          {sequence.questions.map((question: IQuestion, index) => (
                              <Question question={question} index={index} key={index} />
                          ))}
                          {provided.placeholder}
                        </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </Fragment>
            </div>
          </div>
          <div className="col-span-9 p-8 bg-white">
            <div>

            </div>
            <div className="pt-8">
              <AddQuestion />
            </div>

            <div className="flex justify-end pt-8 items-center gap-2">
              <button
                onClick={close}
                className="rounded-md px-3 py-2 border bg-red-200 text-red-500"
              >
                Cancel
              </button>
              <button
                disabled={disabled}
                onClick={onCreate}
                className={classNames(
                  'rounded-md px-3 py-2 border',
                  disabled ? 'text-gray-400 bg-gray-50' : 'bg-indigo-500 text-white'
                )}
              >
                Save
              </button>
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
    <Draggable key={question.id} draggableId={question.id!} index={index}>
      {( provided, snapshot ) => (
        <div
          className="group bg-red-500 hover:bg-gray-100 relative p-4 flex justify-between items-center"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="flex items-center gap-2">
            <div className="">
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