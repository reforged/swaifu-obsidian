import {useContext, useEffect, useState} from "react";
import ExamenContext from "../../../../contexts/ExamenContext";
import Sujet from "./sujet";
import useQuestions from "../../../../hooks/use-questions";

export default function SujetStories () {
  const [examen, setExamen] = useContext(ExamenContext)
  const [sujets, setSujets] = useState([])
  const { fetch } = useQuestions()
  const { data } = fetch()

  useEffect(() => {
    setSujets(examen.sujets)
  }, [examen])


  return (
    <div className="border p-4 bg-white shadow-sm rounded-md">
      { data &&
        <div className="flex flex-col gap-2">
          { sujets.map((sujet, index) => (
            <Sujet sujet={sujet} questions={data} key={index} index={index} />
          ))}
        </div>
      }

    </div>
  )
}