import {Fragment, useContext, useEffect} from 'react'
import { Menu, Transition } from '@headlessui/react'
import {PlusIcon, SwatchIcon} from '@heroicons/react/24/outline'
import Condition from "../filter/condition";
import GroupCondition from "../filter/group-condition";
import BoardContext from "../../../../contexts/BoardContext";
import {ConditionContract, ConditionGroupContract, CoupleConditionContract} from "../filter/types";
import {operators} from "../filter/select-menus/select-operator";
import {uid} from "../../../../utils/helper";
import SelectConjunction from "../filter/select-menus/select-conjunction";

export default function Filter () {
  const [board, setBoard] = useContext(BoardContext)

  function addCondition () {
    const condition: ConditionContract = {
      uid: uid(),
      value: '',
      field: board.structure[0].key,
      operator: operators
        .filter((operator) => operator.input.includes(board.structure[0].input))[0].name
    }

    setBoard({
      ...board,
      filter: {
        uid: board.filter.uid,
        conjunction: board.filter.conjunction,
        conditions: [
          ...board.filter.conditions,
          condition
        ]
      }
    })
  }

  function addGroup () {
    const group: ConditionGroupContract = {
      uid: uid(),
      conjunction: 'and',
      conditions: []
    }

    setBoard({
      ...board,
      filter: {
        uid: board.filter.uid,
        conjunction: board.filter.conjunction,
        conditions: [
          ...board.filter.conditions,
          group
        ]
      }
    })
  }

  function isGroup (item: CoupleConditionContract) {
    return !!(item as ConditionGroupContract).conjunction;
  }

  return (
    <div className="relative">
      <Menu>
        <Menu.Button>
          <div className="flex items-center gap-2 border rounded-md px-3 py-2">
            <span>
              <SwatchIcon className="w-6" />
            </span>
            <span>Filter</span>
          </div>
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 p-4 mt-2  w-auto origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50 focus:outline-none">
            <div className="flex flex-col flex-1">
              <div className="">
                { board.filter.conditions.length
                  ?
                  <div>
                    <div>

                    </div>
                    <div className="flex flex-col gap-2">
                      { board.filter.conditions.map((condition, index) => (
                        <div key={condition.uid}>
                          <div className="flex items-start gap-2">
                            <div className="w-24">
                              { index === 0
                                ? <div className="pl-3">Where</div>
                                : index === 1
                                  ? <div>
                                    <SelectConjunction condition={board.filter} />
                                  </div>
                                  : <div className="text-gray-600 pl-3">

                                    {board.filter.conjunction === 'and'
                                      ? <span>And</span>
                                      : <span>
                                        Or
                                      </span>
                                    }
                                  </div>

                              }
                            </div>
                            <div className="w-full">
                              { !isGroup(condition) && <Condition condition={condition as ConditionContract} />}
                              { isGroup(condition) && <GroupCondition condition={condition as ConditionGroupContract}/>}
                            </div>

                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                  : <span className="text-gray-400">No filter conditions are applied to this view</span>
                }
              </div>

              <div className="flex items-center gap-2 pt-4">
                <button
                  className="flex flex-1 items-center gap-2 w-56 text-gray-700 hover:bg-gray-100 rounded-sm px-2 py-1"
                  onClick={addCondition}
                >
                  <PlusIcon className="w-4" />
                  <span className="w-auto flex">Add condition</span>
                </button>

                <button
                  className="flex items-center gap-2 text-gray-700 hover:bg-gray-100 rounded-sm px-2 py-1"
                  onClick={addGroup}
                >
                  <PlusIcon className="w-4" />
                  <span>Add condition group</span>
                </button>
              </div>
            </div>

          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
