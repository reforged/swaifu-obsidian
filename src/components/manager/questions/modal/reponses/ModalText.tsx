import {useContext, useEffect, useState} from "react";
import Fence from "../../../Fence";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import ReactMarkdown from "react-markdown";
import QuestionContext from "../../../../../contexts/QuestionContext";

export default function ModalText () {
  const [question, setQuestion] = useContext(QuestionContext)
  console.log(question)
  const [text, setText] = useState<string>(question.reponses.length ? question.reponses[0].body : '')


  useEffect(() => {
    if (text.length > 1) {
      setQuestion({
        ...question,
        reponses: [
          { valide: true, body: text}
        ]
      })
    }
  }, [text])

  return (
    <div className="p-2 grid grid-cols-2 divide-x">
      <div className="relative">
        <span className="text-xs text-gray-400 absolute top-0 left-0">Énoncé</span>
        <textarea
          value={text}
          onChange={(e) => setText(e.currentTarget.value)}
          placeholder="votre réponse"
          rows={10}
          className="body resize-none border-0 focus:ring-0 border-none focus:border-0 w-full p-4"
        />
      </div>
      <div className="p-4">
        <ReactMarkdown
          children={text}
          components={{
            code: ({node, ...props}) => Fence({ children: props})
          }}
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]}
        />
      </div>
    </div>
  )
}