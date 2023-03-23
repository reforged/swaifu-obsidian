import {TrashIcon} from "@heroicons/react/24/outline";
import {useContext} from "react";
import BoardContext from "../../../../../../contexts/BoardContext";
import {ConditionGroupContract, CoupleConditionContract} from "../../types";

type Props = {
  condition: ConditionGroupContract
}

export default function DeleteGroup ({ condition }: Props) {
  const [board, setBoard] = useContext(BoardContext)

  function onClick () {
    const li = board.filter.conditions.filter((item) => {
      if (item.uid !== condition.uid) return item
    })

    setBoard({
      ...board,
      filter: {
        uid: board.filter.uid,
        conjunction: board.filter.conjunction,
        conditions: li as CoupleConditionContract[]
      }
    })
  }

  return (
    <button onClick={onClick} className="h-full w-full hover:bg-gray-200 p-2 rounded-sm relative">
      <TrashIcon className="w-5 text-gray-700" />
    </button>
  )
}