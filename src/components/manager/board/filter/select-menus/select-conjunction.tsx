import {Listbox, Transition} from "@headlessui/react";
import {Fragment, useContext, useEffect, useState} from "react";
import {ConjuctionContract, CoupleConditionContract} from "../types";
import {CheckIcon, ChevronUpDownIcon} from "@heroicons/react/20/solid";
import {classNames} from "../../../../../utils/helper";
import BoardContext from "../../../../../contexts/BoardContext";
import {UpdateConjunction} from "../utils";

type Props = {
  condition: CoupleConditionContract
}
export const conjunctions = [
  { id: 1, name: 'And', key: 'and'},
  { id: 2, name: 'Or', key: 'or'}
]


export default function SelectConjunction ({ condition }: Props) {
  const [board, setBoard] = useContext(BoardContext)
  const [selected, setSelected] = useState(
    conjunctions[0]
  )


  useEffect(() => {
    console.log(condition)
    const li = UpdateConjunction(board.filter, condition.uid, selected.key as ConjuctionContract)
    setBoard({
      ...board,
      filter: li
    })
  }, [selected])


  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <div className="relative">
            <Listbox.Button className="relative w-full cursor-default border bg-white py-1.5 pl-3 text-left text-gray-900 shadow-smsm:text-sm sm:leading-6">
              <span className="block truncate">{selected.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-auto overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                { conjunctions.map((conjunction) => (
                  <Listbox.Option
                    key={conjunction.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={conjunction}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                          {conjunction.name}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}