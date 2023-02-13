import QuestionContext from '../../../../contexts/QuestionContext'
import React, {
  createElement,
  useRef,
} from 'react'
import {AnimatePresence, motion} from 'framer-motion'
import {PlusIcon} from '@heroicons/react/24/outline'
import useComponentVisible from '../../../../hooks/useComponentVisible'
import {classNames} from '../../../../utils/helper'
import ModalEtiquettes from '../editor/header/ModalEtiquettes'
import useEtiquettes from '../../../../hooks/use-etiquettes'
import ModalType from '../editor/header/ModalType'
import ModalReponses from '../editor/header/ModalReponses'
import BlockEditor from '../../block-editor/BlockEditor'
import {
  BlockquoteBlock, CodeBlock,
  DivideBlock,
  ParagraphBlock,
  TitleBlock
} from '../../block-editor/builders'
import { BlockContextContract } from '../../block-editor/contexts/BlocksContext'

type Props = {}

export default function ModalEditor ({ }: Props) {
  const { ref, isVisible, toggle } = useComponentVisible()
  const { fetch } = useEtiquettes()
  const { data: listEtiquettes} = fetch()

  const structure = [
    ParagraphBlock().structure,
    TitleBlock().structure
  ]

  const blocks: { [key: string]: () => BlockContextContract} = {
    title: TitleBlock,
    paragraph: ParagraphBlock,
    divide: DivideBlock,
    blockquote: BlockquoteBlock,
    code: CodeBlock,
  }

  function handleChange (value: any) {
    //console.log(value)
  }


  return (
    <QuestionContext.Consumer>
      {([question, setQuestion]) => (
        <div>
          <button
            type={"button"}
            onClick={toggle}
            className={"flex items-center gap-2 border rounded-md px-2 py-2 text-gray-800 "}
          >
            <PlusIcon className="mx-auto h-6 w-6" />
            <span>Créer questions</span>
          </button>
          <AnimatePresence>
            { isVisible &&
              <motion.div
                className="fixed z-20 inset-0 bg-black bg-opacity-25"
                animate={{ opacity: 1}}
                transition={{
                  duration: 0.2,
                  ease: [0.5, 0.71, 1, 1.5]
                }}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
              >
                <div ref={ref} className="absolute left-1/2 top-12 transform -translate-x-1/2 h-[90%] w-[60%] py-8 bg-white border border-gray-200 rounded-md">
                  <div className="fixed top-0 left-0 p-2 z-10">
                    <div className="flex items-center gap-3 text-gray-600">
                      <span className="bg-purple-200 text-purple-900 px-1  rounded-md">Questions</span>
                      <span>/</span>
                      <span>{ question.label ? question.label : 'Untitled' }</span>
                    </div>
                  </div>
                  <Header />
                  <div className="pt-20">
                    <BlockEditor
                      blocks={blocks}
                      settings={{
                        mode: 'editor'
                      }}
                      value={structure}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </motion.div>
            }

          </AnimatePresence>
        </div>
      )}


    </QuestionContext.Consumer>
  )
}

type TitleProps = {
  onChange: (value: string) => void
  className?: string
  value: string
  placeholder: string
  id?: string
}
function Title ({ onChange, className, value, placeholder, id }: TitleProps) {
  const textRef = useRef(value)
  const defaultProps = {
    id: id,
    className: classNames(className ? className : '', 'focus:outline-none'),
    contentEditable: true,
    suppressContentEditableWarning: true,
    placeholder: placeholder,
    onInput: (event: any) => onChange(event.target.innerText)
  }

  return createElement('h1', defaultProps as never, textRef.current ? textRef.current : 'Untitled')
}

const Header = () => {
  return (
    <QuestionContext.Consumer>
      {([question, setQuestion]) => (
        <div className="relative w-4/5 border-b pb-8 pt-20  mx-auto">
          <div>
            <Title
              value={question.label}
              placeholder={"Untitled"}
              onChange={(e) => {
                console.log(e)
                setQuestion({
                  ...question,
                  label: e
                })
              }}
              className={classNames(
                'block w-full py-1 focus:outline-none focus:border-none border-none font-bold text-3xl'
              )}
            />
          </div>
          <div className="pt-8 flex flex-col">
            <ModalEtiquettes  />
            <ModalType />
            <ModalReponses />
          </div>
        </div>
      )}
    </QuestionContext.Consumer>
  )
}