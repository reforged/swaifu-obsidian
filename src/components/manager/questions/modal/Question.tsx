import useComponentVisible from "../../../../hooks/useComponentVisible";
import React, {useContext, useEffect,useState} from "react";
import ShowQuestionContext from "../../../../contexts/ShowQuestionContext";
import {AnimatePresence, motion} from "framer-motion";
import {classNames} from "../../../../utils/helper";
import BlockEditor from "../../block-editor/BlockEditor";
import {BlockContextContract} from "../../block-editor/contexts/BlocksContext";
import {
  BlockquoteBlock, CodeBlock,
  DivideBlock,
  ParagraphBlock,
  TitleBlock
} from "../../block-editor/builders";
import {Title} from "../editor/header/Title";
import ModalEtiquettes from "../editor/header/ModalEtiquettes";
import ModalType from "../editor/header/ModalType";
import ModalReponses from "../editor/header/ModalReponses";
import {IQuestion} from "../../../../utils";
import useQuestions from "../../../../hooks/use-questions";


export default function ModalQuestionView ({ questions }) {
  const { ref, isVisible, toggle , setIsVisible} = useComponentVisible()
  const [showQuestion, setShowQuestion] = useContext(ShowQuestionContext)
  const [disabled, setDisabled] = useState<boolean>(true)
  const {} = useQuestions()

  function verifData () {
    const question = showQuestion!
    const original: IQuestion = questions
      .filter((item: IQuestion) => item.id === question.id)[0]
    const data: IQuestion[] = questions.filter((item: IQuestion) => item.id !== question.id)

    if (data
      .map((item) => item.label.toLowerCase())
      .includes(question.label.toLowerCase())
    ) return false
    console.log(!!question.etiquettes.length)
    console.log(!!question.label)
    if (
      !question.etiquettes.length
      || !question.label
      || !question.enonce.length
      || !question.type
    ) return false

    if (question.type === 'input' && !question.reponses.length) return false
    if (question.type === 'checkbox') {
      const responses = question.reponses.map((item) => item.valide)
      if (!responses.includes(true)) return false
    }

    if (
      original.label === question.label &&
      original.type === question.type &&
      original.enonce === question.enonce &&
      original.etiquettes === question.etiquettes &&
      original.reponses === question.reponses
    )

    return true
  }

  useEffect(() => {
    if (showQuestion) {
      if (verifData()) setDisabled(false)
      else setDisabled(true)
    }



  }, [showQuestion])

  useEffect(() => {
    if (showQuestion) setIsVisible(true)
    else setIsVisible(false)
  }, [showQuestion])

  useEffect(() => {
    if (isVisible) setShowQuestion(showQuestion)
    else setShowQuestion(null)
  }, [isVisible])

  const blocks: { [key: string]: () => BlockContextContract} = {
    title: TitleBlock,
    paragraph: ParagraphBlock,
    divide: DivideBlock,
    blockquote: BlockquoteBlock,
    code: CodeBlock,
  }

  function handleChange () {}

  function handleClick () {

  }

  return (
    <ShowQuestionContext.Consumer>
      {([showQuestion, setShowQuestion]) => (
        <div>
          { showQuestion &&
            <AnimatePresence>
              { isVisible && showQuestion &&
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
                        <span>{ showQuestion.label ? showQuestion.label : 'Untitled' }</span>
                      </div>
                    </div>
                    <div className="fixed bottom-0 right-0 p-2 z-50">
                      <button
                        disabled={disabled}
                        onClick={handleClick}
                        className={classNames(
                          'rounded-md px-3 py-2 border',
                          disabled ? 'text-gray-400 bg-gray-50' : 'bg-indigo-500 text-white'
                        )}
                      >
                        Update
                      </button>
                    </div>
                    <Header />

                    <div className="pt-20">
                      <BlockEditor
                        blocks={blocks}
                        settings={{ mode: 'editor' }}
                        value={showQuestion.enonce}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </motion.div>
              }
            </AnimatePresence>
          }
        </div>
      )}
    </ShowQuestionContext.Consumer>
  )
}


function Header () {
  return (
    <ShowQuestionContext.Consumer>
      {([ question, setQuestion]) => (
        <>
          { question &&
            <div className="relative w-4/5 border-b pb-8 pt-20 mx-auto">
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
                <ModalEtiquettes context={ShowQuestionContext}/>
                <ModalType context={ShowQuestionContext} />
                <ModalReponses context={ShowQuestionContext} />
              </div>
            </div>
          }
        </>

      )}
    </ShowQuestionContext.Consumer>
  )
}