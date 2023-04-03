import {useContext, useEffect, useState} from "react";
import ExamenContext from "../../../../contexts/ExamenContext";
import {IQuestion} from "../../../../utils";

type Props = {
  sujet: string[]
  questions: IQuestion[]
  index: number
}

export default function Sujet ({ sujet,questions, index }: Props) {
  const [examen, setExamen] = useContext(ExamenContext)
  const [filtered, setFiltered] = useState<IQuestion[]>([])

  useEffect(() => {
    setFiltered(questions.filter((question: IQuestion) => {
      return !!sujet.includes(question.id!)
    }))
  }, [questions])

  return (
    <div className="rounded-md hover:bg-gray-100 p-2">
      <span>Sujet {index+1}</span>
      { filtered.length

        ? <div className="flex flex-1 gap-2 truncate">
          { filtered.map((question) => (
            <div key={question.id} className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800" >
              { question.label }
            </div>
          ))}
        </div>
        : <span className="text-sm text-gray-500">Pas de questions</span>
      }

    </div>
  )
}