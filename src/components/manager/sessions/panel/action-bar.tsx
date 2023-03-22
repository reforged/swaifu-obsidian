import {io} from "socket.io-client";
import {useContext} from "react";
import RoomContext from "../../../../contexts/RoomContext";
import LockButton from "./actions/lock-button";

export default function ActionBar () {
  const [room, setRoom] = useContext(RoomContext)

  return (
    <div className="flex items-center justify-between">
      <button className="px-6 py-4 border rounded-md hover:bg-gray-100">
        Affichage réponses en direct
      </button>
      <LockButton />
      <button className="px-6 py-4 border rounded-md">
        Affichage réponses
      </button>
      <button className="px-6 py-4 border rounded-md bg-red-100 hover:bg-red-200">
        Quitter
      </button>
    </div>
  )
}