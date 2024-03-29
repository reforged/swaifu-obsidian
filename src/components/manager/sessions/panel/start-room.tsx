import RoomContext from "../../../../contexts/RoomContext";
import {io} from "socket.io-client";
import React, {useContext, useEffect} from "react";
import SessionContext from "../../../../contexts/SessionContext";
import useWebsocket from "../../../../hooks/use-websocket";

export default function StartRoom () {
  const [session, setSession] = useContext(SessionContext)
  const [room, setRoom] = useContext(RoomContext)
  const { socket } = useWebsocket()

  function handleClick () {
    socket.emit('StartSession', {
      session
    })
  }

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
            : <div className="bg-gray-100 rounded-md w-full h-full flex flex-col gap-2">
              <span className="text-gray-900 text-sm">Status de la session</span>
              <span className="text-gray-500">En cours</span>
            </div>
          }
        </>
      )}
    </RoomContext.Consumer>
  )
}