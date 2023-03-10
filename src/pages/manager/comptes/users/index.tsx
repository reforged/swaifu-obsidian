import {INavigation, IUser} from "../../../../utils";
import Hero from "../../../../components/manager/Hero";
import {HomeIcon, ChevronRightIcon} from "@heroicons/react/20/solid";
import {Link} from "react-router-dom";
import useUsers from "../../../../hooks/use-users";
import {
  CloudArrowDownIcon,
  EllipsisVerticalIcon,
  PlusIcon,
  SwatchIcon,
  ViewColumnsIcon
} from "@heroicons/react/24/outline";
import {Fragment, useContext, useEffect, useState} from "react";
import Search from "../../../../components/Search";
import { Menu, Transition } from "@headlessui/react";
import DragIcon from "../../../../components/icons/DragIcon";
import {classNames} from "../../../../utils/helper";
import {InboxArrowDownIcon} from "@heroicons/react/24/solid";
import Board from "../../../../components/manager/board/Board";
import Manager from "../../../../layouts/manager";
import BoardContext, {StructureContract} from "../../../../contexts/BoardContext";
import UserSkeleton from "../../../../skeleton/UserSkeleton";

const navigation: INavigation[] = [
  { label: 'Home', href: '/manager/comptes'},
  { label: 'Users', href: '/manager/comptes/users'},
  { label: 'Roles', href: '/manager/comptes/roles'},
  { label: 'Permissions', href: '/manager/comptes/permissions'}
]

type Structure = {
  label: string,
  key: string,
  checked: boolean,
  default: boolean
}
export default function HomeUsers () {
  const { index } = useUsers()
  const {data } = index()

  const [search, setSearch] = useState<string>('')
  const [structure, setStructure] = useState<Structure[]>([
    {label: 'Username', key: 'username', checked: true, default: true},
    {label: 'Email', key: 'email', checked: true, default: false},
    {label: 'Code INE', key: 'ine', checked: true, default: false},
    {label: 'Roles', key: 'roles', checked: true, default: false},
    {label: 'Permissions', key: 'permissions', checked: true, default: false}
  ])


  return (
    <Manager
      layout={{
        label: 'Gestion des comptes utilisateurs',
        location: ['Gestion des comptes', 'Utilisateurs'],
        navigation: navigation
      }}
    >
      <Board name={'Utilisateur'} options={['filter', 'column']}>
        <Table />
      </Board>
    </Manager>
  )
}


function Table () {
  const [board, setBoard] = useContext(BoardContext)
  const { index } = useUsers()
  const { data, isLoading, isFetched } = index()
  const [loading, setLoading] = useState<boolean>(isFetched)

  const [filtered, setFiltered] = useState([])

  useEffect(() => {
    const filteredData = data.filter(
      (item: any) => {
        const name = item.firstname + " " + item.lastname
        return name.toLowerCase().indexOf(board.search.toLowerCase()) !== -1
      }
    )
    setFiltered(filteredData)
  }, [data])

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setLoading(false)
      }, 2000)
    }
  }, [isFetched])

  const columns: StructureContract[] = [
    {label: 'Username', key: 'username', checked: true, default: true},
    {label: 'Email', key: 'email', checked: true, default: false},
    {label: 'Code INE', key: 'ine', checked: true, default: false},
    {label: 'Roles', key: 'roles', checked: true, default: false},
    {label: 'Permissions', key: 'permissions', checked: true, default: false}
  ]

  useEffect(() => {
    setBoard({
      ...board,
      structure: columns
    })
  }, [])

  return (
    <div>
      <table className="w-full min-w-full divide-y">
        <thead className="border-b border-[#E3E3E3]/2">
        <tr>
          { board.structure.map((item, index) => {
            if (item.checked)
              return (
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
        { loading
          ?
          <tr>
            { board.structure.map((item, index) => {
              if (item.checked)
                return (
                  <td>
                    <UserSkeleton />
                  </td>
                )
            })
            }
          </tr>
          : <>
            {filtered!.map((user: IUser) => (
              <tr key={user.email}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                  {user.firstname} {user.lastname}
                </td>
                { board.structure.map((item, index) => {
                  if (item.checked && index !== 0) {
                    const key: keyof IUser = item.key as keyof IUser
                    if (Array.isArray(user[key])) {
                      return (
                        <DisplayArray data={user[key]} />
                      )
                    }
                    return (
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {user[key]?.toString()}
                      </td>
                    )
                  }
                })}
                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8">
                  <a href="#" className="text-indigo-600 hover:text-indigo-900">
                    <DragIcon />
                  </a>
                </td>
              </tr>
            ))}
          </>
        }
        </tbody>
      </table>
    </div>
  )
}

function DisplayArray ({ data }) {
  return (
    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
      <span>{ data.length }</span>
    </td>
  )
}