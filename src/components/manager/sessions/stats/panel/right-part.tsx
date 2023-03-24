import {Pie} from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ShowEnonce from "../../panel/question/show-enonce";
import AnswerStat from "./AnswerStat";
import {PlusIcon} from "@heroicons/react/24/outline";
import React, {useContext, useEffect, useState} from "react";
import {IQuestion} from "../../../../../utils";
import SessionContext from "../../../../../contexts/SessionContext";
import ReactMarkdown from "react-markdown";
import Fence from "../../../Fence";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import {classNames} from "../../../../../utils/helper";


ChartJS.register(ArcElement, Tooltip, Legend);



type Props = {
  question: IQuestion
}

export default function RightPartStat ( {question} : Props) {
  const [session, setSession] = useContext(SessionContext)
  const responses = question.reponses
  const [data, setData] = useState()

  useEffect(() => {
    const reponses = session.reponses.filter((item) => item.question_id === question.id)
    console.log(reponses)
    const test = question.reponses.map((item) => {
      const li =  reponses.map((reponse) => {
        if (reponse.body === item.body) return reponse
      })
      return li.filter((i) => i)
    })
    console.log(test)
    setData({
      labels: test.map((item, index) => `Question ${index+1}`),
      datasets: [
        {
          label: "Les réponses",
          data: test.map((item) => item.length),
          backgroundColor: [
            "rgb(133, 105, 241)",
            "rgb(164, 101, 241)",
            "rgb(101, 143, 241)",
          ],
          hoverOffset: 4,

        },
      ]

    })
  }, [])

  console.log("GROSSS LOG", question)

  return (
    <>
      <div className="col-span-8 h-full p-4">
        <div className="flex flex-col">
          <div>
            <span>{question.label}</span>
          </div>



          <div className="mt-20 flex flex-col gap-4 relative">
            <div className="absolute top-0 right-0 p-4 z-10">
            </div>

            <div className="flex justify-center items-center mt-6">
              { data && question.type === 'checkbox' &&
                <div className=" w-96 h-96">
                  <Pie  data={data} />
                </div>
              }

            </div>
          </div>
          <div className="pt-8">
            <span>Réponses</span>
            {responses.map((item) => (
              <div className="py-8 px-2 rounded-md relative">
                <div className={classNames(
                  'bg-gray-50 flex flex-col p-3 shadow-sm rounded-md',
                  item.valide ? 'bg-green-200' :''
                )}>
                  <ReactMarkdown
                    children={item.body}
                    components={{
                      code: ({node, ...props}) => Fence({ children: props})
                    }}
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  />


                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </>

  )
}