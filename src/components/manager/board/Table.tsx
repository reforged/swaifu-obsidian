import {Fragment, ReactNode, useContext, useEffect, useRef, useState} from "react";
import BoardContext, {StructureContract} from '../../../contexts/BoardContext'
import {classNames} from '../../../utils/helper'
import {tr} from '@markdoc/markdoc/dist/src/schema'
import DragIcon from '../../icons/DragIcon'
import { ExclamationTriangleIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Menu, Transition, Dialog } from '@headlessui/react'
import {Link} from "react-router-dom";
import LogicWrapper from "./logic/logic-wrapper";

type key<T> = keyof T
type Props<T> = {
  columns: StructureContract[]
  loading: boolean
  data: T[],
  keys: key<T>[]
  skeleton: ReactNode
  onDelete: any
}

export default function Table<T> ({ data, skeleton, keys, columns, loading, onDelete }: Props<T>) {
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
  }, [])


  return (
    <div className="overflow-x-scroll lg:overflow-x-visible">
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
        <BoardContext.Consumer>
          {([board]) => {
            const wrapper = new LogicWrapper(board.filter, data)
            const result = wrapper.filteredData()
            return (
              <>
                { result.length
                  ? <ShowData<T> data={result} onDelete={onDelete}/>
                  : <DataSkeleton skeleton={skeleton} />
                }
              </>
            )
          }}
        </BoardContext.Consumer>

        </tbody>
      </table>
    </div>
  )
}

function ShowData<T> ({ data, onDelete }: { data: T[], onDelete: any  }) {
  const [board, setBoard] = useContext(BoardContext)
  const [activeDeleteModal, setActiveDeleteModal] = useState<unknown>(null)
  function selectValue (item: T): string {
    let value: string = ''
    board.keys.forEach((key) => {
      value += item[key as keyof T] + ' '
    })

    return value
  }

  if (!data.length) {
    return (
      <tr className="">
        <td
          className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">Aucune
          donnée n'a été trouvé
        </td>
      </tr>
    )
  }

  return (
    <>
      {data.map((item: T, index: number) => (
        <Fragment>
          <tr key={index} className="group hover:bg-[#E2E9F3]">
            <Row<T> item={item} selectValue={selectValue} setActiveDeleteModal={setActiveDeleteModal} />
          </tr>
          { board.label &&
            <ConfirmDeleteModal<T>
              item={item}
              label={`Supprimer l'${board.label.toLowerCase()}`}
              open={activeDeleteModal === item['id' as keyof T]}
              close={() => setActiveDeleteModal(null)}
              onDelete={() => onDelete(item)}
            />
          }

        </Fragment>
      ))}
    </>
  )
}

function Row<T> ({ item, selectValue, setActiveDeleteModal}) {
  const [board, setBoard] = useContext(BoardContext)
  return (
    <>
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
            <DragIcon className="w-4" />
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
            <Menu.Items className="absolute right-0 py-2 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-30 focus:outline-none">
              { board.rowAction &&
                <Menu.Item>
                  <button
                    className="flex py-2 gap-x-3 px-4 hover:bg-gray-100 w-full"
                    onClick={() => board.rowAction!(item)}
                  >
                    <PencilSquareIcon className="h-5 w-5 text-cyan-600" />
                    <span>Visualiser</span>
                  </button>
                </Menu.Item>
              }

              <Menu.Item>
                {({ close }) => (
                  <button
                    onClick={
                      () => {
                        setActiveDeleteModal(item['id' as keyof T])
                        close()
                      }
                    }
                    className="flex w-full py-2 gap-x-3 px-4 hover:bg-gray-100"
                  >
                    <TrashIcon className="h-5 w-5 text-red-600" />
                    <span>Supprimer</span>
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>

      </td>
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

type ConfirmDeleteModalProps<T> = {
  label: string
  item: T
  open: boolean
  close: () => void
  onDelete: any
}

function ConfirmDeleteModal<T> (props: ConfirmDeleteModalProps<T>): JSX.Element {
  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={cancelButtonRef}
        onClose={props.close}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      {props.label}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Êtes-vous sûr de vouloir supprimer l'élément ? Toutes vos données seront définitivement supprimées
                        de nos serveurs pour toujours. Cette action ne peut être annulée une fois exécutée.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={() => {
                      props.onDelete(props.item)
                    }}
                  >
                    Supprimer
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={props.close}
                    ref={cancelButtonRef}
                  >
                    Annuler
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}