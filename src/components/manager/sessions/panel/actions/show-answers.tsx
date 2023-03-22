import {useContext} from "react";
import RoomContext from "../../../../../contexts/RoomContext";
import {classNames} from "../../../../../utils/helper";
import {io} from "socket.io-client";

export default function ShowAnswers () {
  const [room, setRoom] = useContext(RoomContext)
  const socket = io("ws://localhost:3333")

  function handleClick () {
    socket.emit('show_answer', {
      session: room.session
    })
  }

  return (
    <>
      <button
        onClick={handleClick}
        className={classNames(
          'px-6 py-4 rounded-md border',
        )}
      >
        Afficher la réponse
      </button>
    </>
  )

}