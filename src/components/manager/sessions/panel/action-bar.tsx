import {io} from "socket.io-client";
import {useContext} from "react";
import RoomContext from "../../../../contexts/RoomContext";

export default function ActionBar () {
  const [room, setRoom] = useContext(RoomContext)

  return (
    <div className="flex items-center justify-between">
      <button className="px-6 py-4 border rounded-md hover:bg-gray-100">
        Affichage réponses en direct
      </button>
      <LockQuestion />
      <button className="px-6 py-4 border rounded-md">
        Affichage réponses
      </button>
      <button className="px-6 py-4 border rounded-md bg-red-100 hover:bg-red-200">
        Quitter
      </button>
    </div>
  )
}

function LockQuestion () {
  const [room, setRoom] = useContext(RoomContext)
  const socket = io("ws://localhost:3333")

  function handleLock () {
    setRoom({
      ...room,
      locked: !room.locked
    })
    socket.emit('lock_answer', {
      locked: !room.locked,
      session: room.session
    })
  }

  return (
    <>
      {room.locked
        ? <button onClick={handleLock}>Lock</button>
        : <button onClick={handleLock}>Libre</button>
      }
    </>
  )
}