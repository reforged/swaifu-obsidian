import QuestionContext from '../../../../contexts/QuestionContext'
import React, {
   useContext, useEffect,
   useState,
} from 'react'
import {AnimatePresence, motion} from 'framer-motion'
import {PlusIcon, XMarkIcon} from '@heroicons/react/24/outline'
import useComponentVisible from '../../../../hooks/useComponentVisible'
import {classNames} from '../../../../utils/helper'
import ModalEtiquettes from '../editor/header/ModalEtiquettes'
import useEtiquettes from '../../../../hooks/use-etiquettes'
import ModalType from '../editor/header/ModalType'
import ModalReponses from '../editor/header/ModalReponses'
import BlockEditor from '../../block-editor/BlockEditor'
import {
  BlockquoteBlock, CodeBlock,
  DivideBlock, MermaidBlock,
  ParagraphBlock,
  TitleBlock
} from '../../block-editor/builders'
import { BlockContextContract } from '../../block-editor/contexts/BlocksContext'
import useQuestions from "../../../../hooks/use-questions";
import {Title} from "../editor/header/Title";
import {IQuestion} from "../../../../utils";

type Props = {
  data: IQuestion[]
}

export default function ModalEditor ({ data }: Props) {
  const { ref, isVisible, toggle } = useComponentVisible()
  const { fetch } = useEtiquettes()
  const { create } = useQuestions()
  const [disabled, setDisabled] = useState<boolean>(true)
  const { data: listEtiquettes} = fetch()
  const { mutate: createQuestion} = create()
  const [question, setQuestion] = useContext(QuestionContext)

  const structure = [
    ParagraphBlock().structure,
    TitleBlock().structure
  ]

  useEffect(() => {
    if (data) {
      if (verifData()) {
        setDisabled(false)
      } else {
        setDisabled(true)
      }
    }
    console.log("QUESTION", question)

  }, [question])

  const blocks: { [key: string]: () => BlockContextContract} = {
    title: TitleBlock,
    paragraph: ParagraphBlock,
    divide: DivideBlock,
    mermaid: MermaidBlock,
    blockquote: BlockquoteBlock,
    code: CodeBlock,
  }

  function verifData () {
    if (data
      .map((item) => item.label.toLowerCase())
      .includes(question.label.toLowerCase())
    ) return false

    if (
      !question.etiquettes.length
      || !question.label
      || !question.enonce.length
      || !question.type
    ) return false

    if (question.type === 'input' && !question.reponses.length) return false
    if (question.type === 'checkbox') {
      const responses = question.reponses.map((item) => item.valide)
      if (!responses.includes(true) || question.reponses.length < 2) return false
    }


    return true
  }

  function handleChange (value: any) {
    //console.log(value)
  }

  function handleClick () {
    const objet = {
      ...question,
      etiquettes: question.etiquettes.map((etiquette) => etiquette.id)
    }
    createQuestion(objet)
    toggle()
    setQuestion({
      ...question,
      type: '',
      label: 'Untitled',
      etiquettes: [],
      reponses: [],
    })

  }

  function close () {
    toggle()
    setQuestion({
      ...question,
      type: '',
      label: 'Untitled',
      etiquettes: [],
      reponses: [],
    })
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
                <div ref={ref} className="absolute left-1/2 top-12 transform -translate-x-1/2 h-[90%] w-[60%] py-8 bg-white border border-gray-200 rounded-md overflow-y-scroll">
                  <div className="fixed top-0 left-0 p-2 z-10">
                    <div className="flex items-center gap-3 text-gray-600">
                      <span className="bg-purple-200 text-purple-900 px-1  rounded-md">Questions</span>
                      <span>/</span>
                      <span>{ question.label ? question.label : 'Untitled' }</span>
                    </div>
                  </div>
                  <div className="absolute top-2 right-4 z-10">
                    <div className="relative w-6 h-6">
                      <button onClick={close} className="hover:bg-gray-100 p-1 rounded-md">
                        <XMarkIcon className="w-6 text-gray-600" />
                      </button>
                    </div>

                  </div>
                  <div className="absolute bottom-0 right-0 p-2 z-50">
                    <button
                      disabled={disabled}
                      onClick={handleClick}
                      className={classNames(
                        'rounded-md px-3 py-2 border',
                        disabled ? 'text-gray-400 bg-gray-50' : 'bg-indigo-500 text-white'
                      )}
                    >
                      Créer question
                    </button>
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
            <ModalEtiquettes context={QuestionContext}  />
            <ModalType context={QuestionContext} />
            <ModalReponses context={QuestionContext} />
          </div>
        </div>
      )}
    </QuestionContext.Consumer>
  )
}