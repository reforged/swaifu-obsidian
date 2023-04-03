import React, {useContext} from "react";
import {IQuestion} from "../../../../../utils";
import SessionContext from "../../../../../contexts/SessionContext";


const Question = { id:"1", label: "salut", type :"yes",enonce:[],
        etiquettes: [
            {id: '2',label: 'Test 2', color: 'blue'},
            {id: '3',label: 'Java', color: 'gray'}
        ],
        reponses: [
            {body: "test", valide: true}
        ]
    };

type Props = {
    question: IQuestion
}
export default function LeftPartStat ({ question } : Props ) {
  const etiquettes = question.etiquettes
  const [session, setSession] = useContext(SessionContext)

  return (
      <>
          <div className="col-span-4 border-r h-full p-4">
              <div className="flex flex-col">
                  <h1>{question.label}</h1>
                  <div className="grid grid-cols-2 gap-6 pt-4">
                      <div className="flex flex-col p-3 bg-gray-100 rounded-md">
                          <span className="text-gray-900 text-sm">Type de Question</span>
                          <span className="text-gray-500">{question.type}</span>
                      </div>
                  </div>

                  <div className="relative py-4">
                      <div className="absolute inset-0 flex items-center" aria-hidden="true">
                          <div className="w-full border-t border-gray-300" />
                      </div>
                      <div className="relative flex justify-center">
                          <span className="bg-white px-2 text-sm font-title text-gray-500 uppercase">Overview</span>
                      </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                      <div className="flex flex-col p-3 gap-3 bg-gray-100 rounded-md aspect-video">
                          <span className="text-gray-900">Nombre de participants</span>
                          <span className="text-gray-800 text-7xl">{session.reponses.filter((item) => item.question_id === question.id).length}</span>
                      </div>
                      <div className="flex flex-col p-3 gap-3 bg-gray-100 rounded-md aspect-video">
                          <span className="text-gray-900 text-sm">Nombre de reponses</span>
                          <span className="text-gray-800 text-7xl">{question.reponses.length}</span>
                      </div>
                    <div className="flex flex-1 gap-2 items-center">
                      {etiquettes.map((item) => (
                        <div className="px-3 py-1 rounded-full bg-gray-200">
                          {item.label}
                        </div>
                      ))}
                    </div>

                  </div>
              </div>
          </div>
      </>
  )
}