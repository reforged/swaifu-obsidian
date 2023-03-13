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
import Table from "../../../../components/manager/board/Table";
import ImportCsv from "../../../../components/manager/comptes/users/modal/import-csv";
import CreateUser from "../../../../components/manager/comptes/users/modal/create-user";

const navigation: INavigation[] = [
  { label: 'Home', href: '/manager/comptes'},
  { label: 'Users', href: '/manager/comptes/users'},
  { label: 'Roles', href: '/manager/comptes/roles'},
  { label: 'Permissions', href: '/manager/comptes/permissions'}
]

export default function HomeUsers () {
  const { index } = useUsers()
  const { data , isLoading } = index()

  const columns: StructureContract[] = [
    {label: 'Username', key: 'username', checked: true, default: true},
    {label: 'Email', key: 'email', checked: true, default: false},
    {label: 'Numéro étudiant', key: 'numero', checked: true, default: false},
    {label: 'Roles', key: 'roles', checked: true, default: false},
    {label: 'Permissions', key: 'permissions', checked: true, default: false}
  ]

  return (
    <Manager
      layout={{
        label: 'Gestion des comptes utilisateurs',
        location: ['Gestion des comptes', 'Utilisateurs'],
        navigation: navigation
      }}
    >
        <Board name={'Utilisateur'} options={['filter', 'column']} action={<Action />}>
          <Table<IUser>
            columns={columns}
            loading={isLoading}
            data={data as IUser[]}
            keys={['firstname', 'lastname']}
            skeleton={<UserSkeleton />}
          />
          <CreateUser />
        </Board>



    </Manager>
  )
}

function Action () {
  const [board, setBoard] = useContext(BoardContext)
  function toggle () {
    setBoard({
      ...board,
      open: true
    })
  }
  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 border px-3 py-2 rounded-md"
        onClick={toggle}
      >
        <span>
          <PlusIcon className='w-6' />
        </span>
        <span>Utilisateurs</span>
      </button>
    </div>

  )
}
