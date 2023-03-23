import RoomContext from "../../../../contexts/RoomContext";
import {io} from "socket.io-client";
import React, {useContext} from "react";
import SessionContext from "../../../../contexts/SessionContext";

export default function StartRoom () {
  const socket = io('ws://localhost:3333')
  const [session, setSession] = useContext(SessionContext)
  const [room, setRoom] = useContext(RoomContext)

  function handleClick () {
    socket.emit('start_session', {
      session
    })
  }

  socket.on('start_session', (data) => {
    setRoom({
      ...room,
      question: data.question,
      session: data.session
    })
  })

  return (
    <RoomContext.Consumer>
      {([room]) => (
        <>
          { room.session!.status === 'wait'
            ?
            <button
              onClick={handleClick}
              className="bg-green-400 border w-full border-green-500 rounded-md text-white text-sm mx-auto justify-center items-center flex h-full"
            >
              <span>Commencer la session</span>
            </button>
            : <div className="bg-gray-100 rounded-md w-full h-full ">
              <span className="text-gray-900 text-sm">Status de la session</span>
              <span className="text-gray-500">En cours</span>
            </div>
          }
        </>
      )}
    </RoomContext.Consumer>
  )
}