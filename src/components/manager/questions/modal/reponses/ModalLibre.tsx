import {useContext, useEffect, useState} from "react";
import QuestionContext from "../../../../../contexts/QuestionContext";

export default function ModalLibre () {
  const [question, setQuestion] = useContext(QuestionContext)
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
        <span className="text-xs text-gray-400 absolute top-0 left-0">Pas de Question requis</span>
      </div>
      <div className="p-2">
      </div>
    </div>
  )
}