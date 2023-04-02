import {XMarkIcon} from "@heroicons/react/20/solid";
import SessionContext from "../../../../contexts/SessionContext";
import React, {useContext, useEffect, useState} from "react";
import LeftPart from "./left-part";
import RightPart from "./right-part";
import {io} from "socket.io-client";
import {IRoom} from "../../../../utils/room";
import RoomContext from "../../../../contexts/RoomContext";
import useWebsocket from "../../../../hooks/use-websocket";
import {NewAnswerEvent} from "../types/events";

export default function ShowSession ({ reference, toggle }) {
  const [session, setSession] = useContext(SessionContext)
  const [room, setRoom] = useState<IRoom>({
    session: session,
    locked: false,
    waiting: false
  })
  const { socket } = useWebsocket()

  function newUser (data) {
    if (!room.session) return
    if (room.session.id === data.session.id) {
      setRoom({
        ...room,
        session: data.session
      })
    }
  }

  function newAnswer (data: NewAnswerEvent) {
    if (!room.session) return
    if (room.session.id === data.session.id) {
      setRoom({
        ...room,
        session: data.session
      })
    }
  }



  useEffect(() => {
    socket.on('NewUser', newUser)
    socket.on('NewAnswer', newAnswer)
    return () => {
      socket.off('NewUser', newUser)
      socket.off('NewAnswer', newAnswer)
    }
  }, [])


  function closeLive () {}

  return (
    <RoomContext.Provider value={[room, setRoom]}>
      <SessionContext.Consumer>
        {([session, setSession]) => (
          <div className="absolute w-full h-full p-8">
            <div className="relative h-full overflow-hidden rounded-md">
              <div ref={reference} className="border border-gray-200 h-full bg-white">
                <div className="relative border h-full">
                  <div className="w-full bg-gray-100 flex justify-between items-center p-4 relative">
                    <div className="text-center w-full">
                      <span className="font-title">SESSION : <span className="underline">{session!.code}</span></span>
                    </div>
                    <div>
                      <button
                        onClick={closeLive}
                      >
                        <XMarkIcon className="w-6 h-6" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 h-full">
                    <LeftPart />
                    <RightPart />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </SessionContext.Consumer>
    </RoomContext.Provider>
  )
}
