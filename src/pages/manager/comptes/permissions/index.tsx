import {INavigation, IPermission} from "../../../../utils";
import usePermissions from "../../../../hooks/use-permissions";
import {useEffect, useState} from "react";
import { uid} from "../../../../utils/helper";
import Board from "../../../../components/manager/board/Board";
import Manager from "../../../../layouts/manager";
import {StructureContract} from "../../../../contexts/BoardContext";
import UserSkeleton from "../../../../skeleton/UserSkeleton";
import Table from "../../../../components/manager/board/Table";
import {Options} from "../../../../components/manager/board/types";
import useRoles from "../../../../hooks/use-roles";

const navigation: INavigation[] = [
  { label: 'Home', href: '/manager/comptes'},
  { label: 'Users', href: '/manager/comptes/users'},
  { label: 'Roles', href: '/manager/comptes/roles'},
  { label: 'Permissions', href: '/manager/comptes/permissions'}
]

const pages = [
  {name: "Comptes", href: '/manager/accounts/home', current: false},
  {name: "Permissions", href: '/manager/accounts/permissions', current: true},
]


export default function HomePermissions () {
  const { index } = usePermissions()
  const { data , isLoading } = index()
  const {index:fetchRoles } = useRoles()
  const {data: roles} = fetchRoles()

  const columns: StructureContract[] = [
    {label: 'Label', key: 'label',input: 'text', checked: true, default: true, filter:true},
    {label: 'Key', key: 'key',input: 'text', checked: true, default: false, filter:true},
    {label: 'Utilisateurs', key: 'users',input: 'text', checked: true, default: false, filter:false},
    {label: 'Roles', key: 'roles',input: "select", checked: true, default: false, filter:true}
  ]

  const [options, setOptions] = useState<Options<IPermission>>()

  useEffect(() => {
    if (data && !options && roles) {
      setOptions({
        label: 'Premissions',
        view: 'liste',
        search: '',
        structure: columns,
        filter: {
          uid: uid(),
          conjunction: 'and',
          conditions: []
        },
        selectData: {
           roles,
          permissions: data,
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
        label: 'Gestion des Permissions',
        location: pages,
        navigation: navigation
      }}
    >
      {options &&
        <Board name={'Permission'} options={options}>
          <Table<IPermission>
            columns={columns}
            loading={isLoading}
            data={data as IPermission[]}
            keys={['label']}
            skeleton={<UserSkeleton />}
          />
        </Board>
      }


    </Manager>
  )
}


