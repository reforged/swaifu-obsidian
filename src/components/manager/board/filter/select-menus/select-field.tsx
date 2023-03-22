import {Fragment, useContext, useEffect, useState} from 'react'
import BoardContext, {StructureContract} from '../../../../../contexts/BoardContext'
import {ConditionContract, ConditionGroupContract, CoupleConditionContract} from '../types'
import {Listbox, Transition} from '@headlessui/react'
import {CheckIcon, ChevronUpDownIcon} from '@heroicons/react/20/solid'
import {classNames, uid} from '../../../../../utils/helper'

type Props = {
  condition: ConditionContract,
}

export default function SelectField ({ condition }: Props) {
  const [board, setBoard] = useContext(BoardContext)
  const [selected, setSelected] = useState<StructureContract | null>(null)

  function isGroup (item: CoupleConditionContract) {
    return !!(item as ConditionGroupContract).conjunction;
  }

  useEffect(() => {
    if (condition) {
      const value = board.structure.find((item) => item.key === condition.field)
      if (!selected && value) {
        setSelected(value)
      }
    }

  }, [condition, selected])

  useEffect(() => {
    const li = [] as CoupleConditionContract[]
    if (selected) {
      board.filter.conditions.forEach((item) => {
        if (isGroup(item)) {
          const sub = (item as ConditionGroupContract).conditions.map((subitem) => {
            if (subitem.uid !== condition.uid) return subitem
              const newItem: ConditionContract = {
                uid: uid(),
                value: condition.value,
                operator: condition.operator,
                field: selected.key
              }
              return newItem
          })
          const group: ConditionGroupContract = {
            ...(item as ConditionGroupContract),
            conditions: sub
          }

          li.push(group)
        } else {
          if (item.uid !== condition.uid) li.push(item)
          else {
            const newItem: ConditionContract = {
              ...(item as ConditionContract),
              field: selected.key
            }
            li.push(newItem)
          }
        }
      })
      const value = board.structure.find((item) => item.key === condition.field)

      if (value && selected.key !== value.key) {
        setBoard({
          ...board,
          filter: {
            uid: board.filter.uid,
            conjunction: board.filter.conjunction,
            conditions: li
          }
        })
      }
    }



  }, [selected])

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          {
           selected && <div className="relative">
              <Listbox.Button
                className="relative w-full cursor-default bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-smsm:text-sm sm:leading-6">
                <span className="block truncate">{selected.label}</span>
                <span
                  className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
              </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options
                  className="absolute z-[99] mt-1 max-h-60 w-auto overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {board.structure.map((field) => (
                    <Listbox.Option
                      key={field.key}
                      className={({active}) =>
                        classNames(
                          active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                          'relative cursor-default select-none py-2 pl-3 pr-9'
                        )
                      }
                      value={field}
                    >
                      {({selected, active}) => (
                        <>
                        <span
                          className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                          {field.label}
                        </span>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? 'text-white' : 'text-indigo-600',
                                'absolute inset-y-0 right-0 flex items-center pr-4'
                              )}
                            >
                            <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                          </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          }
        </>
      )}
    </Listbox>
  )
}