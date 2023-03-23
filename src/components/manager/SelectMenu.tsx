import React, {Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { classNames } from '../../utils/helper'
import { IColor } from '@obsidian/type'

type Props<T> = {
  data: T[]
  setColor: any
  color: T
}

export default function SelectMenu({ data, color, setColor }: Props<IColor>) {
  
  return (
    <Listbox value={color} onChange={(e) => {
      setColor(e)
    }}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium text-gray-700">Couleur</Listbox.Label>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
              <span className="flex items-center">
                <span
                  className={classNames(
                    color.value,
                    'inline-block h-3 w-3 flex-shrink-0 rounded-[2px] border'
                  )}
                />
                <span className="ml-3 block truncate">{color.label}</span>
              </span>
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
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {data.map((item, index) =>  (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-indigo-500 text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={item}
                  >
                    {({ selected, active}) => (
                      <>
                        <div className="flex items-center gap-3">
                          <span
                            className={classNames(
                              item.value,
                              'inline-block h-3 w-3 flex-shrink-0 rounded-[2px] border'
                            )}
                            aria-hidden="true"
                          />
                          <span>{item.label}</span>
                        </div>
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