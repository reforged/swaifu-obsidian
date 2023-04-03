import {useContext} from "react";
import RoomContext from "../../../../../contexts/RoomContext";
import {classNames} from "../../../../../utils/helper";
import {io} from "socket.io-client";
import useWebsocket from "../../../../../hooks/use-websocket";

export default function ShowAnswers () {
  const [room, setRoom] = useContext(RoomContext)
  const { socket } = useWebsocket()

  function handleClick () {
    socket.emit('ShowAnswer', {
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