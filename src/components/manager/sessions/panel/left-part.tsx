import React, {useContext, useEffect, useState} from "react";
import StartRoom from "./start-room";
import RoomContext from "../../../../contexts/RoomContext";
import {Pie} from "react-chartjs-2";

export default function LeftPart () {
  const [room, setRoom] = useContext(RoomContext)
  const [data, setData] = useState()

  useEffect(() => {
    if (room.session.reponses && room.session.reponses.length) {
      const reponses = room.session.reponses.filter((item) => item.question_id === room.session.question.id)
      const test = room.session.question.reponses.map((item) => {
        const li = reponses.map((reponse) => {
          if (reponse.body === item.body) return reponse
        })
        return li.filter((i) => i)
      })
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
    }

  }, [room])


  return (
    <RoomContext.Consumer>
      {([room, setRoom]) => (
        <>
          { room.session &&
            <div className="col-span-4 border-r h-full p-4">
              <div className="flex flex-col">
                <h1>{room.session.sequence.label}</h1>
                <div className="grid grid-cols-2 gap-6 pt-4">
                  <div className="flex flex-col p-3 bg-gray-100 rounded-md">
                    <span className="text-gray-900 text-sm">Code de la session</span>
                    <span className="text-gray-500">{room.session!.code}</span>
                  </div>
                  <div>
                    <StartRoom />
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
                    <span className="text-gray-900">Nombre de questions</span>
                    <span className="text-gray-800 text-7xl">{room.session!.sequence.questions.length}</span>
                  </div>
                  {room.session.users &&
                    <div className="flex flex-col p-3 gap-3 bg-gray-100 rounded-md aspect-video">
                      <span className="text-gray-900 text-sm">Nombre de participants</span>
                      <span className="text-gray-800 text-7xl">{room.session!.users.length}</span>
                    </div>
                  }
                </div>
              </div>

              { data && room.session.question.type === 'checkbox' &&
                <div className=" w-96 h-96">
                  <Pie  data={data} />
                </div>
              }
            </div>
          }
        </>

      )}
    </RoomContext.Consumer>
  )
}