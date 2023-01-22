import {classNames} from "../utils/helper";
import {Switch} from "@headlessui/react";
import React, {useState} from "react";

type Props = {
  enabled: boolean
  toggle: any
  index: number
}

export default function Toggle ({ enabled, toggle, index}: Props) {
  const [data, setData] = useState<boolean>(enabled)
  return (
    <Switch
      checked={data}
      onChange={() => {
        toggle(index)
        setData(!data)
      }}
      className={classNames(
        data ? 'bg-indigo-600' : 'bg-gray-200',
        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
      )}
    >
      <span className="sr-only">Use setting</span>
      <span
        className={classNames(
          data ? 'translate-x-5' : 'translate-x-0',
          'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
        )}
      >
        <span
          className={classNames(
            data ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200',
            'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
          )}
          aria-hidden="true"
        >
          <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
            <path
              d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span
          className={classNames(
            data ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100',
            'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
          )}
          aria-hidden="true"
        >
          <svg className="h-3 w-3 text-indigo-600" fill="currentColor" viewBox="0 0 12 12">
            <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
          </svg>
        </span>
      </span>
    </Switch>
  )
}