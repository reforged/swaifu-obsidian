import {Fragment, useContext, useEffect, useState} from "react"
import { Listbox, Transition } from '@headlessui/react'
import {CheckIcon, ChevronUpDownIcon} from "@heroicons/react/20/solid";
import {classNames} from "../../../../../utils/helper";
import {ConditionContract} from "../types";
import BoardContext from "../../../../../contexts/BoardContext";

type Props = {
  condition: ConditionContract
}
export const operators = [
  { id: 1, name: 'contains', input: ['text']},
  { id: 2, name: 'is', input: ['text', 'select'] },
  { id: 3, name: 'is not', input: ['text', 'select'] },
  { id: 4, name: 'is any of', input: ['select']},
  { id: 5, name: 'is none of', input: ['select']}
]

export default function SelectOperator ({ condition }: Props) {
  const [board, setBoard] = useContext(BoardContext)

  const [selected, setSelected] = useState(operators.filter((item) => item.input.includes(
    board.structure.filter((structure) => structure.key === condition.field)[0].input
  ))[0])


  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <div className="relative">
            <Listbox.Button className="relative w-full cursor-default bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-smsm:text-sm sm:leading-6">
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
                { operators.filter((operator) => operator.input.includes(
                  board.structure.filter((structure) => structure.key === condition.field)[0].input
                )).map((operator) => (
                  <Listbox.Option
                    key={operator.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={operator}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                          {operator.name}
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