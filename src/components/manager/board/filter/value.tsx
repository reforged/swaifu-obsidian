import { ConditionContract, SelectTypeContract, TypeInputContract } from './types'
import { Fragment, useContext, useEffect, useState } from 'react'
import BoardContext from '../../../../contexts/BoardContext'
import { UpdateRow } from './utils'
import { Listbox, Transition } from '@headlessui/react'
import { IEtiquette, IPermission, IRole } from '../../../../utils'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { classNames } from '../../../../utils/helper'

type Props = {
  condition: ConditionContract
}

export default function ValueRow ({ condition }: Props) {
  const [board, setBoard] = useContext(BoardContext)
  const [value, setValue] = useState()
  const [type, setType] = useState<TypeInputContract>(
    board.structure.find((item) => {
      if (item.key === condition.field) return item
    })!.input
  )

  useEffect(() => {
    const typeData = board.structure.find((item) => {
      if (item.key === condition.field) return item
    })
    if (!typeData) return

    if (typeData.input !== type) {
      setType(typeData.input)
      const data: ConditionContract = {
        uid: condition.uid,
        value: typeData.input === 'select' ? [] : '',
        operator: condition.operator,
        field: condition.field
      }
      const li = UpdateRow(board.filter.conditions, condition, data)
      setValue(
        typeData.input === 'select' ?
        board.data[condition.field as SelectTypeContract][0] : '')

      setBoard({
        ...board,
        filter: {
          uid: board.filter.uid,
          conjunction: board.filter.conjunction,
          conditions: li
        }
      })
      return
    } else {
      if (typeData.input === 'select') {
        const data = board.data[condition.field].find((item) => item.id === condition.value[0])
        if (data) {
          setValue(data)
        }
      }


    }
  }, [condition])

  useEffect(() => {
    if (value && !condition.value.includes(value.id)) {

      const data: ConditionContract = {
        ...condition,
        value: type === 'select' ? [value.id] : value
      }
      const li = UpdateRow(board.filter.conditions, condition, data)
      setBoard({
        ...board,
        filter: {
          uid: board.filter.uid,
          conjunction: board.filter.conjunction,
          conditions: li
        }
      })
    }
  }, [value])

  return (
    <div>
      { type === 'text'
        ?
        <div className="w-56 bg-blue-500 h-full">
          <input
            type="text"
            name="value"
            value={value}
            onChange={(e) => {
              setValue(e.currentTarget.value)
            }}
            className="block h-full w-full py-1.5 text-gray-900 border-none outline-0 placeholder:text-gray-400  sm:text-sm focus:outline-0"
            placeholder="Enter a value"
          />
        </div>


        :
        <div>
          <Listbox value={value} onChange={setValue}>
            {({ open}) => (
              <>
                {
                  board.data && board.data[condition.field as SelectTypeContract] && value &&
                  <div className="relative">
                    <Listbox.Button className="relative w-full cursor-default bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-smsm:text-sm sm:leading-6">
                      <span className="block truncate">{value.label}</span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
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
                        {board.data[condition.field as SelectTypeContract].map((item) => (
                          <Listbox.Option
                            key={item.id}
                            className={({active}) =>
                              classNames(
                                active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                'relative cursor-default select-none py-2 pl-3 pr-9'
                              )
                            }
                            value={item}
                          >
                            {({selected, active}) => (
                              <>
                                <span
                                  className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                  {item.label}
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
        </div>
      }

    </div>
  )
}