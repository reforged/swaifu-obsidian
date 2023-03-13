import {useContext} from "react";
import BoardContext from "../../../../contexts/BoardContext";
import { QueueListIcon } from "@heroicons/react/24/outline";

export default function Liste() {
  const [board, setBoard] = useContext(BoardContext)
  return (
    <button
      className="flex items-center gap-2 border rounded-md px-3 py-2"
      onClick={() => {
        setBoard({
          ...board,
          view: 'galerie'
        })
      }}
    >
      <span>
        <QueueListIcon className="w-6" />
      </span>
      <span>Liste</span>
    </button>
  )
}
