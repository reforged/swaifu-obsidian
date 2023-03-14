import {INavigation, IPermission} from "../../../../utils";
import Hero from "../../../../components/manager/Hero";
import {HomeIcon, ChevronRightIcon} from "@heroicons/react/20/solid";
import {Link} from "react-router-dom";
import usePermissions from "../../../../hooks/use-permissions";
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
import {Options} from "../../../../components/manager/board/types";

const navigation: INavigation[] = [
  { label: 'Home', href: '/manager/comptes'},
  { label: 'Users', href: '/manager/comptes/users'},
  { label: 'Roles', href: '/manager/comptes/roles'},
  { label: 'Permissions', href: '/manager/comptes/permissions'}
]

export default function HomePermissions () {
  const { index } = usePermissions()
  const { data , isLoading } = index()

  const columns: StructureContract[] = [
    {label: 'Label', key: 'label', checked: true, default: true},
    {label: 'Key', key: 'key', checked: true, default: false},
    {label: 'Utilisateurs', key: 'users', checked: true, default: false},
    {label: 'Roles', key: 'roles', checked: true, default: false}
  ]

  const options: Options<IPermission> = {
    view: 'liste',
    search: '',
    structure: columns,
    keys: ['label'],
    open: false,
    option: ['filter', 'column']
  }

  return (
    <Manager
      layout={{
        label: 'Gestion des Permissions',
        location: ['Gestion des Permissions', 'Permissions'],
        navigation: navigation
      }}
    >
        <Board name={'Permission'} options={options}>
          <Table<IPermission>
            columns={columns}
            loading={isLoading}
            data={data as IPermission[]}
            keys={['label']}
            skeleton={<UserSkeleton />}
          />
        </Board>



    </Manager>
  )
}


