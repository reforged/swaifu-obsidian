import {INavigation, IUser} from "../../../../utils";
import useUsers from "../../../../hooks/use-users";
import {
  PlusIcon,
} from "@heroicons/react/24/outline";
import {Fragment, useContext, useEffect, useState} from "react";
import Board from "../../../../components/manager/board/Board";
import Manager from "../../../../layouts/manager";
import BoardContext, {StructureContract} from "../../../../contexts/BoardContext";
import UserSkeleton from "../../../../skeleton/UserSkeleton";
import Table from "../../../../components/manager/board/Table";
import CreateUser from "../../../../components/manager/comptes/users/modal/create-user";
import {Options} from "../../../../components/manager/board/types";
import {uid} from "../../../../utils/helper";

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
    {label: 'Username', key: 'username', input: 'text', checked: true, default: true},
    {label: 'Email', key: 'email', input: 'text' ,checked: true, default: false},
    {label: 'Numéro étudiant', key: 'numero', input: 'text', checked: true, default: false},
    {label: 'Roles', key: 'roles', input: 'select', checked: true, default: false},
    {label: 'Permissions', key: 'permissions', input: 'select', checked: true, default: false}
  ]

  const options: Options<IUser> = {
    label: 'Utilisateurs',
    view: 'liste',
    search: '',
    filter: {
      uid: uid(),
      conjunction: 'and',
      conditions: []
    },
    structure: columns,
    keys: ['firstname', 'lastname'],
    open: false,
    option: ['filter', 'column']
  }

  return (
    <Manager
      layout={{
        label: 'Gestion des comptes utilisateurs',
        location: ['Gestion des comptes', 'Utilisateurs'],
        navigation: navigation
      }}
    >
        <Board name={'Utilisateur'} options={options} action={<Action />}>
          <Table<IUser>
            columns={columns}
            loading={isLoading}
            data={data as IUser[]}
            keys={options.keys}
            skeleton={<UserSkeleton />}
            onDelete={() => console.log('dazda')}
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
