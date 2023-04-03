import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import {Dispatch, SetStateAction} from "react";

type Props = {
  state: number,
  setState: Dispatch<SetStateAction<number>>
  max: number
}

export default function SwitchNumberInterval ({ state, setState, max }: Props) {

  function before () {
    if (state === 0) return
    setState(state-1)
  }

  function next () {
    if (max && state < max) {
      setState(state+1)
    }

  }

  return (
    <span className="isolate inline-flex rounded-md shadow-sm">
      <button
        type="button"
        onClick={before}
        className="relative inline-flex items-center rounded-l-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
      >
        <span className="sr-only">Previous</span>
        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
      </button>
      <span className="relative inline-flex items-center  bg-white px-3 py-2 text-gray-400 border-y border-gray-300">
        { state }
      </span>
      <button
        type="button"
        onClick={next}
        className="relative -ml-px inline-flex items-center rounded-r-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
      >
        <span className="sr-only">Next</span>
        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    </span>
  )
}