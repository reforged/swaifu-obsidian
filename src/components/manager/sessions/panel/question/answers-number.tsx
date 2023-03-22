import {UsersIcon} from "@heroicons/react/24/outline";
import {useContext} from "react";
import RoomContext from "../../../../../contexts/RoomContext";

export default function AnswersNumber () {
  const [room, setRoom] = useContext(RoomContext)

  return (
    <div className="absolute top-0 right-0 p-4">
      <div className="flex items-center gap-2">
        <UsersIcon className="w-6" />
        { room.session.reponses
          ? <span>{room.session.reponses.filter((item) => item.question_id === room.session.question.id).length}</span>
          : <span>0</span>
        }

      </div>
    </div>
  )
}