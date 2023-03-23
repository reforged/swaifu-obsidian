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
import useQuestions from "../../../../hooks/use-questions";
import useEtiquettes from "../../../../hooks/use-etiquettes";
import useRoles from "../../../../hooks/use-roles";
import usePermissions from "../../../../hooks/use-permissions";

const navigation: INavigation[] = [
  { label: 'Home', href: '/manager/comptes'},
  { label: 'Users', href: '/manager/comptes/users'},
  { label: 'Roles', href: '/manager/comptes/roles'},
  { label: 'Permissions', href: '/manager/comptes/permissions'}
]

export default function HomeUsers () {
  const { index } = useUsers()
  const { index: fetchRoles  } = useRoles()
  const { index: fetchPermissions } = usePermissions()

  const { data: permissions } = fetchPermissions()
  const { data: roles } = fetchRoles()
  const { data , isLoading } = index()

  const [options, setOptions] = useState<Options<IUser>>()

  const columns: StructureContract[] = [
    {label: 'Firstname', key: 'firstname', input: 'text', checked: true, default: true, filter: true},
    {label: 'Lastname', key: 'lastname', input: 'text', checked: true, default: true, filter: true},
    {label: 'Email', key: 'email', input: 'text' ,checked: true, default: false, filter: true},
    {label: 'Numéro étudiant', key: 'numero', input: 'text', checked: true, default: false, filter: true},
    {label: 'Roles', key: 'roles', input: 'select', checked: true, default: false, filter: true},
    {label: 'Permissions', key: 'permissions', input: 'select', checked: true, default: false, filter: true}
  ]

  useEffect(() => {
    if (data && !options && roles && permissions) {
      setOptions({
        label: 'Utilisateurs',
        view: 'liste',
        search: '',
        filter: {
          uid: uid(),
          conjunction: 'and',
          conditions: []
        },
        structure: columns,
        data: data,
        selectData: {
          roles,
          permissions,
          etiquettes: []
        },
        keys: ['firstname', 'lastname'],
        open: false,
        option: ['filter', 'column']
      })
    }
  }, [data])

  return (
    <Manager
      layout={{
        label: 'Gestion des comptes utilisateurs',
        location: ['Gestion des comptes', 'Utilisateurs'],
        navigation: navigation
      }}
    >
      { options &&
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
      }
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
