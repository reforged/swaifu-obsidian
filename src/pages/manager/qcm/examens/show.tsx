import {useContext, useEffect, useState} from "react";
import ExamenContext from "../../../../contexts/ExamenContext";
import useAuthentication from "../../../../hooks/use-authentication";
import {ISujet} from "../../../../components/manager/examens/types";
import {IQuestion} from "../../../../utils";
import useQuestions from "../../../../hooks/use-questions";
import BlockEditor from "../../../../components/manager/block-editor/BlockEditor";
import QuestionContext from "../../../../contexts/QuestionContext";
import {
  BlockContextContract
} from "../../../../components/manager/block-editor/contexts/BlocksContext";
import {
  BlockquoteBlock, CodeBlock,
  DivideBlock, MermaidBlock,
  ParagraphBlock,
  TitleBlock
} from "../../../../components/manager/block-editor/builders";
import ReactMarkdown from "react-markdown";
import Fence from "../../../../components/manager/Fence";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export default function ShowExamen () {
  const [examen, setExamen] = useContext(ExamenContext)
  const { me } = useAuthentication()
  const { } = me()

  return (
    <div className="overflow-y-scroll py-20">
      <div className="py-4">
        <h1 className="text-4xl font-bold text-center">{examen.label}</h1>
      </div>



      {examen.sujets.map((sujet, index) => (
        <Sujet sujet={sujet} index={index} key={index} />
      ))}


    </div>
  )
}

function Public () {
  return (
    <div className="flex items-center gap-4 mt-4">
      <div>
        <label htmlFor="nom" className="block text-sm font-medium leading-6 text-gray-900">
          Nom
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="nom"
            id="nom"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <label htmlFor="prenom" className="block text-sm font-medium leading-6 text-gray-900">
          Prénom
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="prenom"
            id="prenom"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
          Numéro étudiant
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="code"
            id="code"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    </div>
  )
}
function Anonyme () {
  return (
    <div className="flex flex-col gap-1">
      {[0, 1, 2, 3, 4, 5].map((item) => (
        <div className="flex flex-row gap-1">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
            <div key={item}>
              <input type="checkbox"/>
            </div>
          ))}

        </div>
      ))}
    </div>

  )
}

type PropsSujet = {
  sujet: string[]
  index: number
}

function Sujet ({ sujet, index }: PropsSujet) {
  const [filtered, setFiltered] = useState<IQuestion[]>([])
  const [examen, setExamen] = useContext(ExamenContext)
  const { fetch } = useQuestions()
  const { data: questions } = fetch()

  useEffect(() => {
    setFiltered(questions.filter((question: IQuestion) => {
      return !!sujet.includes(question.id!)
    }))
  }, [questions])

  return (
    <div>
      {/* HEADER */}

      <div className="flex flex-col mx-auto text-center py-4">
        <h2 className="text-xl">Sujet {index+1}</h2>
        <div className="mx-auto">
          { examen.anonymat
            ? <Anonyme />
            : <Public />
          }
        </div>

      </div>
      {filtered.length
        ? <div className="flex flex-col max-w-7xl mx-auto gap-4">
          {filtered.map((question) => (
            <Question question={question} key={question.id} />
          ))}
        </div>
        : <span className="text-sm text-gray-500">Pas de questions</span>
      }

      <div className="retour--ligne"></div>

    </div>
  )
}

type QuestionProps = {
  question: IQuestion
}
function Question ({ question }: QuestionProps) {
  const [state, setState] = useState<IQuestion>(question)

  const blocks: { [key: string]: () => BlockContextContract} = {
    title: TitleBlock,
    paragraph: ParagraphBlock,
    divide: DivideBlock,
    mermaid: MermaidBlock,
    blockquote: BlockquoteBlock,
    code: CodeBlock,
  }

  function handleChange () {}

  return (
    <div>
      <QuestionContext.Provider value={[state, setState]}>
        <div className="border p-8 rounded-md relative">
          <span className="text-xs absolute top-0 left-0 m-2 p-2 rounded-md bg-gray-50">Énoncé</span>

          <div className="pt-4">
            <BlockEditor
              blocks={blocks}
              settings={{
                mode: 'preview'
              }}
              value={question.enonce}
              onChange={handleChange}
            />
          </div>
          { question.type === 'checkbox'

          ?  <div className="mt-4 flex flex-col gap-4">
              { question.reponses.map((reponse, index) => (
                <Answer answer={reponse} key={index} />
              ))}
            </div>
            : <div className="border rounded-md h-24 mt-4 max-w-5xl mx-auto">

            </div>
          }


        </div>
      </QuestionContext.Provider>
    </div>
  )
}

function Answer ({ answer }) {
  return (
    <div className="bg-gray-50 flex flex-col p-3 shadow-sm rounded-md">
      <ReactMarkdown
        children={answer.body}
        components={{
          code: ({node, ...props}) => Fence({ children: props})
        }}
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
      />


    </div>
  )
}