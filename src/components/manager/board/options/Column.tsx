import {Fragment, useContext} from "react";
import { Menu, Transition} from "@headlessui/react";
import { ViewColumnsIcon} from "@heroicons/react/24/outline";
import BoardContext from "../../../../contexts/BoardContext";
import {classNames} from "../../../../utils/helper";
import DragIcon from "../../../icons/DragIcon";

export default function Column() {
  const [board, setBoard] = useContext(BoardContext)
  return (
    <div className="relative">
      <Menu>
        <Menu.Button>
          <div className="flex items-center gap-2 border rounded-md px-3 py-2">
            <span>
              <ViewColumnsIcon className="w-6" />
            </span>
            <span>Columns</span>
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
          <Menu.Items className="absolute right-0 p-4 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50 focus:outline-none">
            <div className="flex flex-col gap-4">
              {board.structure.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      name="show"
                      onClick={(e) => {
                        const newStructure = board.structure
                        newStructure[index].checked = e.currentTarget.checked
                        setBoard({
                          ...board,
                          structure: [...newStructure]
                        })
                      }}
                      type="checkbox"
                      defaultChecked={item.checked}
                      disabled={item.default}
                      className={classNames(
                        'h-4 w-4 rounded border-gray-300',
                        item.default ? 'bg-red-300 text-indigo-600' : 'text-indigo-600 focus:ring-indigo-600'
                      )}
                    />
                    <span>{item.label}</span>
                  </div>
                  {
                    !item.default &&
                    <div className="flex items-center">
                      <DragIcon />
                    </div>
                  }
                </div>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
