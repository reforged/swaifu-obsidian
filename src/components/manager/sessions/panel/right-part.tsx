import SessionContext from "../../../../contexts/SessionContext";
import {useContext, useEffect, useState} from "react";
import {IQuestion} from "../../../../utils";
import ShowEnonce from "./question/show-enonce";
import AnswersStories from "./question/answers-stories";
import ActionBar from "./action-bar";
import {io} from "socket.io-client";
import RoomContext from "../../../../contexts/RoomContext";
import {ArrowRightCircleIcon} from "@heroicons/react/24/outline";

export default function RightPart () {
  const [room, setRoom] = useContext(RoomContext)
  const socket = io("ws://localhost:3333")

  function nextQuestion () {
    let index = 0
    room.session!.sequence.questions.forEach((item, key) => {
      if (item.id === room.session.question.id) {
        index = key
      }
    })
    if (index < room.session!.sequence.questions.length) {

      setRoom({
        ...room,
        session: {
          ...room.session,
          question: room.session.sequence.questions[index+1]
        }
      })
    }

    socket.emit('new_question', {
      session: room.session,
      question: room.session!.sequence.questions[index+1]
    })
  }



  return (
    <>
      { room.session && room.session.question &&
        <div className="col-span-8 h-full p-4">
          <div className="flex flex-col">
            <div>
              <span>{room.session.question.label}</span>
              <span>{room.session!.sequence.questions.findIndex((item) => item.id === room.session.question.id)}</span>
            </div>


            {room.session.question &&
              <div className="mt-20 flex flex-col gap-4 relative">
                {
                  room.session.sequence.questions.findIndex((item) => item.id === room.session.question.id) < (room.session.sequence.questions.length-1)&&
                  <div className="absolute top-0 right-0 p-4 z-10">
                    <button onClick={nextQuestion} className="relative z-50">
                      <span>
                        <ArrowRightCircleIcon className="w-7" />
                      </span>
                    </button>
                  </div>
                }

                <ShowEnonce question={room.session.question}/>
                <AnswersStories />
              </div>
            }
            <div className="pt-8">
              <ActionBar />
            </div>

          </div>

        </div>
      }
    </>

  )
}