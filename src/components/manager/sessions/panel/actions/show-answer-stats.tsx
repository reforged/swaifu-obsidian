import {useContext} from "react";
import RoomContext from "../../../../../contexts/RoomContext";

export default function ShowAnswerStats () {
  const [room, setRoom] = useContext(RoomContext)

  function handleClick () {}

  return (
    <div className="px-6 py-4 border rounded-md hover:bg-gray-100">
      Afficher Stats Question
    </div>
  )
}