import {Pie} from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import React, {useContext, useEffect, useState} from "react";
import {IQuestion, IReponse} from "../../../../../utils";
import SessionContext from "../../../../../contexts/SessionContext";
import ReactMarkdown from "react-markdown";
import Fence from "../../../Fence";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import {classNames, GroupedWords, groupSimilarStrings} from "../../../../../utils/helper";
import PieChart from "../../../charts/pie";
import ReactWordcloud from "react-wordcloud";
import { WordCloud } from '../../../../../utils/room'


ChartJS.register(ArcElement, Tooltip, Legend);



type Props = {
  question: IQuestion
}

export default function RightPartStat ( {question} : Props) {
  const [session, setSession] = useContext(SessionContext)
  const responses = question.reponses
  const [data, setData] = useState<any[]>([])
  const [words, setWords] = useState< {text: string, size: number}[]>()

  useEffect(() => {
    const reponses = session.reponses.filter((item) => item.question_id === question.id)

    const test = question.reponses.map((item) => {
      const li =  reponses.map((reponse) => {
        if (reponse.body === item.body) return reponse
      })
      return li.filter((i) => i)
    })


    const res = test.map((item, index) => {
      return {
        id: `Réponse ${index+1}`,
        label: `Réponse ${index+1}`,
        value: item.length,
      }
    })
    if (question.type === 'checkbox') {
      setData(res)
    }

    if (question.type === 'input') {
      const res: number = reponses.reduce(
        (acc: number, current: IReponse) => {
          if (current.valide) {
            return acc + 1
          }
        }, 0
      )
      setData([
        {
          id: `Bonne réponse`,
          label: `Bonne réponse`,
          value: res,
        },
        {
          id: `Mauvaise réponse`,
          label: `Mauvaise réponse`,
          value: reponses.length - res,
        },
      ])
    }

    if (question.type === 'libre') {
      const result = groupSimilarStrings(reponses.map((item) => item.body))
      console.log(result)
      const li: {text: string, size: number}[] = []
      for (const groupedWordsKey in result) {
        li.push({
          text: groupedWordsKey,
          value: result[groupedWordsKey].count
        })
      }
      setWords(li)
    }



    /*setData({
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

    })*/
  }, [])

  return (
    <>
      <div className="col-span-8 h-full p-4 overflow-y-scroll">
        <div className="flex flex-col">
          <div className="mt-20 flex flex-col gap-4 relative">
            <div className="absolute top-0 right-0 p-4 z-10">
            </div>
            { data && question.type !== 'libre' &&
              <div className="w-full h-96 relative">
                <PieChart data={
                  data
                } />
              </div>
            }
            { words && question.type === 'libre' &&
              <div id="world-cloud" className="border rounded-md shadow-sm">
                <ReactWordcloud
                  words={words}
                  options={{
                    fontSizes: [20, 60],
                    fontFamily: "sans-serif",
                    margin: "8px",
                    rotations: 0,
                    rotationAngles: [0, 0],
                    enableTooltip: false,
                    colors: [
                      "#475569",
                      "#b91c1c",
                      "#ea580c",
                      "#b45309",
                      "#eab308",
                      "#84cc16",
                      "#15803d",
                      "#0891b2",
                      "#1d4ed8",
                      "#7e22ce",
                      "#f43f5e"
                    ]
                  }}
                />
              </div>
            }


            {/*<div className="flex justify-center items-center mt-6">
              { data && question.type === 'checkbox' &&
                <div className=" w-96 h-96">
                  <Pie  data={data} />
                </div>
              }

            </div>
            */}
          </div>
          {question.type !== 'libre' &&
            <div className="py-8">
              <span>Réponses</span>
              <div className="flex flex-col">
                {responses.map((item, index) => (
                  <div className="py-2 rounded-md relative" key={index}>
                    <div className={classNames(
                      'bg-gray-50 flex flex-col p-3 shadow-md rounded-md',
                      item.valide ? 'bg-green-200' : ''
                    )}>
                      <ReactMarkdown
                        children={item.body}
                        components={{
                          code: ({node, ...props}) => Fence({children: props})
                        }}
                        remarkPlugins={[remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                      />


                    </div>
                  </div>
                ))}
              </div>

            </div>
          }
        </div>

      </div>
    </>

  )
}