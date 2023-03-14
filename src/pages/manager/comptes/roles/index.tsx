import {INavigation, IRole} from "../../../../utils";
import Hero from "../../../../components/manager/Hero";
import {HomeIcon, ChevronRightIcon} from "@heroicons/react/20/solid";
import {Link} from "react-router-dom";
import useRoles from "../../../../hooks/use-users";
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
import CreateRole from "../../../../components/manager/comptes/roles/modal/create-role";

const navigation: INavigation[] = [
  { label: 'Home', href: '/manager/comptes'},
  { label: 'Users', href: '/manager/comptes/users'},
  { label: 'Roles', href: '/manager/comptes/roles'},
  { label: 'Permissions', href: '/manager/comptes/permissions'}
]

export default function HomeRoles () {
  const { index } = useRoles()
  const { data , isLoading } = index()

  const columns: StructureContract[] = [
    {label: 'Label', key: 'label', checked: true, default: true},
    {label: 'Key', key: 'key', checked: true, default: true},
    {label: 'Utilisateurs', key: 'users', checked: true, default: false},
    {label: 'Power', key: 'power', checked: true, default: false},
    {label: 'Permissions', key: 'permissions', checked: true, default: false}
  ]

  return (
    <Manager
      layout={{
        label: 'Gestion des Roles',
        location: ['Gestion des Roles', 'Roles'],
        navigation: navigation
      }}
    >
        <Board name={'Role'} options={['filter', 'column']} action={<Action />}>
          <Table<IRole>
            columns={columns}
            loading={isLoading}
            data={data as IRole[]}
            keys={['label']}
            skeleton={<UserSkeleton />}
          />
          <CreateRole />
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
        <span>Roles</span>
      </button>
    </div>

  )
}
