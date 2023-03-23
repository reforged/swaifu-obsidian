import { Transition, Menu } from '@headlessui/react'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import { Fragment } from 'react'
import { useBlock } from '../utils'


type Props = {
  uid: string
}

export default function BlockDropdown (props: Props): JSX.Element {
  const { removeBlock } = useBlock(props.uid)
  const options = [
    { label: 'Supprimer', action: () => removeComponent()}
  ]

  function removeComponent () {
    removeBlock()
  }

  return (
    <div>
      <Menu as="div" className="inline-block text-left">
        <div>
          <Menu.Button className="h-8 w-8 hover:bg-gray-100 flex items-center justify-center p-1 rounded-md text-gray-500">
            <Cog6ToothIcon className="w-5 h-5" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-[99] mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {options.map((item) => (
              <div key={item.label} className="py-1 px-2">
                <Menu.Item>
                  {({ active }) => (
                    <div onClick={item.action} className="cursor-pointer">{item.label}</div>
                  )}
                </Menu.Item>
              </div>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
