import {INavigation, IRole} from "../../../../utils";

import { PlusIcon } from "@heroicons/react/24/outline";
import {useContext, useEffect, useState} from "react";
import Board from "../../../../components/manager/board/Board";
import Manager from "../../../../layouts/manager";
import BoardContext, {StructureContract} from "../../../../contexts/BoardContext";
import UserSkeleton from "../../../../skeleton/UserSkeleton";
import Table from "../../../../components/manager/board/Table";
import CreateRole from "../../../../components/manager/comptes/roles/modal/create-role";
import useRoles from "../../../../hooks/use-roles";
import {Options} from "../../../../components/manager/board/types";
import {uid} from "../../../../utils/helper";
import usePermissions from "../../../../hooks/use-permissions";

const navigation: INavigation[] = [
  { label: 'Home', href: '/manager/comptes'},
  { label: 'Users', href: '/manager/comptes/users'},
  { label: 'Roles', href: '/manager/comptes/roles'},
  { label: 'Permissions', href: '/manager/comptes/permissions'}
]

export default function HomeRoles () {
  const { index } = useRoles()
  const { index: fetchPermissions } = usePermissions()
  const { data , isLoading } = index()
  const { data: permissions } = fetchPermissions()

  const [options, setOptions] = useState<Options<IRole>>()

  const columns: StructureContract[] = [
    {label: 'Label', key: 'label', input: 'text', checked: true, default: true, filter: true},
    {label: 'Key', key: 'key', input: 'text', checked: true, default: true, filter: true},
    {label: 'Utilisateurs', key: 'users', input: 'text', checked: true, default: false, filter: false},
    {label: 'Power', key: 'power',  input: 'text', checked: true, default: false, filter: false},
    {label: 'Permissions', key: 'permissions', input: 'select', checked: true, default: false, filter: true}
  ]

  useEffect(() => {
    if (data && !options && permissions) {
      setOptions({
        label: 'Roles',
        view: 'liste',
        search: '',
        structure: columns,
        filter: {
          uid: uid(),
          conjunction: 'and',
          conditions: []
        },
        selectData: {
          roles: data,
          permissions,
          etiquettes: []
        },
        keys: ['label'],
        open: false,
        option: ['filter', 'column']
      })
    }
  }, [data])


  return (
    <Manager
      layout={{
        label: 'Gestion des Roles',
        location: ['Gestion des Roles', 'Roles'],
        navigation: navigation
      }}
    >
      {options &&
        <Board name={'Role'} options={options} action={<Action/>}>
          <Table<IRole>
            columns={columns}
            loading={isLoading}
            data={data as IRole[]}
            keys={['label']}
            skeleton={<UserSkeleton/>}
            onDelete={() => console.log('dazda')}
          />
          <CreateRole/>
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
        <span>Roles</span>
      </button>
    </div>

  )
}
