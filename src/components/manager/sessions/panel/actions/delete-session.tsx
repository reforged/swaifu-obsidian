import {useContext} from "react";
import RoomContext from "../../../../../contexts/RoomContext";
import {classNames} from "../../../../../utils/helper";
import {LockClosedIcon, LockOpenIcon} from "@heroicons/react/24/outline";
import {io} from "socket.io-client";
import AuthenticationContext from "../../../../../contexts/AuthenticationContext";
import {useNavigate} from "react-router";
import useWebsocket from "../../../../../hooks/use-websocket";

export default function DeleteSession () {
  const [room, setRoom] = useContext(RoomContext)
  const [user, setUser] = useContext(AuthenticationContext)
  const { socket } = useWebsocket()
  const router = useNavigate()

  function handleClick () {
    socket.emit('StopSession', {
      session: room.session,
      user: user
    })
    router('/manager/qcm/home')
  }

  return (
    <>
      <button
        onClick={handleClick}
        className={classNames(
          'px-6 py-4 rounded-md border bg-red-200',
        )}
      >
        Quitter
      </button>
    </>
  )
}