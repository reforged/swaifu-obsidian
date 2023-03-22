import {PlusIcon} from "@heroicons/react/24/outline";
import {useContext, useEffect} from "react";
import BoardContext from "../../../../../../contexts/BoardContext";
import {ConditionContract, ConditionGroupContract, CoupleConditionContract} from "../../types";
import {uid} from "../../../../../../utils/helper";
import {operators} from "../../select-menus/select-operator";

type Props = {
  condition: ConditionGroupContract
}

export default function GroupAddCondition ({ condition }: Props) {
  const [board, setBoard] = useContext(BoardContext)

  function onClick () {
    const newCondition: ConditionContract = {
      uid: uid(),
      value: '',
      field: board.structure[0].key,
      operator: operators
        .filter((operator) => operator.input.includes(board.structure[0].input))[0].name
    }


    const li = board.filter.conditions.map((item) => {
      if (item.uid !== condition.uid) return item
      return {
        ...condition,
        conditions: [...condition.conditions, newCondition]
      }
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
      <PlusIcon className="w-5 text-gray-700" />
    </button>
  )
}