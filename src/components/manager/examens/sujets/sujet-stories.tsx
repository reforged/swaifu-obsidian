import {useContext, useEffect, useState} from "react";
import ExamenContext from "../../../../contexts/ExamenContext";
import Sujet from "./sujet";
import useQuestions from "../../../../hooks/use-questions";
import {useNavigate} from "react-router";

export default function SujetStories () {
  const [examen, setExamen] = useContext(ExamenContext)
  const [sujets, setSujets] = useState([])
  const { fetch } = useQuestions()
  const { data } = fetch()
  const router = useNavigate()

  useEffect(() => {
    setSujets(examen.sujets)
  }, [examen])

  function onClick () {
    router('/manager/qcm/examen')
  }


  return (
    <div className="border p-4 bg-white shadow-sm rounded-md">
      { data &&
        <div className="flex flex-col gap-2">
          { sujets.map((sujet, index) => (
            <Sujet sujet={sujet} questions={data} key={index} index={index} />
          ))}
        </div>
      }

      <div className="border-t pt-4 mt-4">

        <div className="flex justify-end">
          <button
            onClick={onClick}
            className="px-4 py-2 rounded-md bg-indigo-600 text-white"
          >
            Visualiser les sujets
          </button>
        </div>
      </div>

    </div>
  )
}