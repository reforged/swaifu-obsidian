import {TrashIcon} from "@heroicons/react/24/outline";
import {ConditionContract, ConditionGroupContract, CoupleConditionContract} from "../types";
import {useContext} from "react";
import BoardContext from "../../../../../contexts/BoardContext";

type Props = {
  condition: ConditionContract
}

export default function DeleteRow ({ condition }: Props) {
  const [board, setBoard] = useContext(BoardContext)

  function isGroup (item: CoupleConditionContract) {
    return !!(item as ConditionGroupContract).conjunction;
  }

  function onClick () {
    const li = [] as CoupleConditionContract[]

    board.filter.conditions.forEach((item) => {
      if (isGroup(item)) {
        const sub = (item as ConditionGroupContract).conditions.filter((subitem) => {
          if (subitem.uid !== condition.uid) return item
        })

        li.push({
          uid: item.uid,
          conjunction: (item as ConditionGroupContract).conjunction,
          conditions: sub,
        })
      } else {
        if (item.uid !== condition.uid) li.push(item)
      }
    })


    /*const li = board.filter.conditions.filter((item, index) => {
      if (isGroup(item)) {

        const subli = (item as ConditionGroupContract).conditions.filter((subitem) => {
          if (subitem.uid !== condition.uid) return item
        })
        console.log(subli)
        const test = {
          uid: item.uid,
          conjunction: (item as ConditionGroupContract).conjunction,
          conditions: subli
        } as CoupleConditionContract
        console.log(test)
        return test
      } else {
        if (item.uid !== condition.uid) return item
      }

    })*/


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
    <button onClick={onClick} className="h-full hover:bg-gray-200 p-2  w-full relative">
      <TrashIcon className="w-6 text-gray-700" />
    </button>
  )
}