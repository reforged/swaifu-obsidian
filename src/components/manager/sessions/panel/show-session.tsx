import {XMarkIcon} from "@heroicons/react/20/solid";
import SessionContext from "../../../../contexts/SessionContext";
import React, {useContext, useEffect, useState} from "react";
import LeftPart from "./left-part";
import RightPart from "./right-part";
import {io} from "socket.io-client";
import {IRoom} from "../../../../utils/room";
import RoomContext from "../../../../contexts/RoomContext";

export default function ShowSession ({ reference, toggle }) {
  const [session, setSession] = useContext(SessionContext)
  console.log(session)
  const [room, setRoom] = useState<IRoom>({
    session: session,
    locked: false,
    wainting: false
  })
  const socket = io('ws://localhost:3333')

  socket.on('new_user', async (data) => {
    console.log(data)
    setSession(data.session)
  })

  useEffect(() => {
    console.log(session)
    setRoom({
      ...room,
      session
    })
  }, [session])
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
