import {useContext} from "react";
import RoomContext from "../../../../../contexts/RoomContext";
import {io} from "socket.io-client";
import {classNames} from "../../../../../utils/helper";
import {LockClosedIcon, LockOpenIcon} from "@heroicons/react/24/outline";

export default function LockButton () {
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
      <button
        onClick={handleLock}
        className={classNames(
          'px-6 py-4 rounded-md border',
          room.locked ? 'bg-red-200' : 'bg-green-200'
        )}
      >
        { room.locked
          ? <div className="flex items-center gap-2">
              <LockClosedIcon className="w-6" />
              <span>Question verrouillée</span>
          </div>
          : <div className="flex items-center gap-2">
            <LockOpenIcon className="w-6" />
            <span>Question open</span>
          </div>
        }
      </button>
    </>
  )
}