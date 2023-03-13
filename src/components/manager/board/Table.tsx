import {Fragment, ReactNode, useContext, useEffect, useState} from "react";
import BoardContext, {StructureContract} from '../../../contexts/BoardContext'
import {classNames} from '../../../utils/helper'
import {tr} from '@markdoc/markdoc/dist/src/schema'
import UserSkeleton from '../../../skeleton/UserSkeleton'
import DragIcon from '../../icons/DragIcon'
import { Menu, Transition } from '@headlessui/react'

type key<T> = keyof T
type Props<T> = {
  columns: StructureContract[]
  loading: boolean
  data: T[],
  keys: key<T>[]
  skeleton: ReactNode
}

export default function Table<T> ({ data, skeleton, keys, columns, loading }: Props<T>) {
  const [board, setBoard] = useContext(BoardContext)
  const [filtered, setFiltered] = useState<T[]>([])

  useEffect(() => {
    if (data) {
      const filteredData: T[] = data.filter(
        (item: T) => {
          const value = keys.map((key) => item[key]).join(' ')
          return value.toLowerCase().indexOf(board.search.toLowerCase()) !== -1
        }
      )
      setFiltered(filteredData)
    }
  }, [data, board.search])


  useEffect(() => {
    setBoard({
      ...board,
      structure: columns,
      keys: keys as string[]
    })
  }, [columns, keys])


  return (
    <div>
      <table className="w-full min-w-full divide-y">
        <thead className="border-b border-[#E3E3E3]/2">
          <tr>
            { board.structure.map((item, index) => {
              if (item.checked) return (
                <th
                  key={index}
                  className={classNames(
                    'px-3 py-3.5 text-left text-sm font-normal uppercase text-theme-blue lg:table-cell',
                    index === 0 ? 'pl-4 sm:pl-8' : ''
                  )}
                >
                  {item.label}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
        { filtered
          ? <ShowData<T> data={filtered} />
          : <DataSkeleton skeleton={skeleton} />
        }
        </tbody>
      </table>
    </div>
  )
}

function ShowData<T> ({ data }: { data: T[] }) {
  const [board, setBoard] = useContext(BoardContext)

  function selectValue (item: T): string {
    let value: string = ''
    board.keys.forEach((key) => {
      value += item[key as keyof T] + ' '
    })

    return value
  }

  return (
    <>
      {data.map((item: T, index: number) => (
        <tr key={index}>
          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
            { selectValue(item)}
          </td>
          { board.structure.map((struct: StructureContract, index) => {
            if (struct.checked && index !== 0) {
              const key: keyof T = struct.key as keyof T
              if (Array.isArray(item[key])) return (
                <DisplayArray data={item[key] as []} key={index}/>
              )
              return (
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500" key={index}>
                  {item[key] ? item[key].toString() as string : '-'}
                </td>
              )
            }
          })}
          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8">
            <Menu>
              <Menu.Button>
                <DragIcon />
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
                  <div>
                    lorem
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

          </td>
        </tr>
      ))}
    </>
  )
}

function DisplayArray ({ data }: { data: any[]}) {
  return (
    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
      <span>{ data.length }</span>
    </td>
  )
}

function DataSkeleton ({ skeleton }: { skeleton: ReactNode}) {
  const [board, setBoard] = useContext(BoardContext)

  return (
    <tr>
      { board.structure.map((item, index) => {
        if (item.checked) return (
          <td key={index}>
            { skeleton }
          </td>
        )
      })}
    </tr>
  )
}