import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { SwatchIcon } from '@heroicons/react/24/outline'

export default function Filter () {
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
          <Menu.Items className="absolute right-0 p-4 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50 focus:outline-none">
            filter
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
