import {INavigation} from "../../../../utils";
import Hero from "../../../../components/manager/Hero";
import {HomeIcon, ChevronRightIcon} from "@heroicons/react/20/solid";
import {Link} from "react-router-dom";
import useUsers from "../../../../hooks/use-users";
import {
  EllipsisVerticalIcon,
  PlusIcon,
  SwatchIcon,
  ViewColumnsIcon
} from "@heroicons/react/24/outline";
import {Fragment, useEffect, useState} from "react";
import Search from "../../../../components/Search";
import { Menu, Transition } from "@headlessui/react";
import DragIcon from "../../../../components/icons/DragIcon";
import {classNames} from "../../../../utils/helper";

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
    <div>
      <Hero navigation={navigation} />
      <div className="p-12">
        <Breadcrumbs />
        <div className="mt-12">
          <h1 className="text-title">Utilisateurs</h1>

          <div className="w-full bg-[#F7F9FC] rounded-md border mt-8">
            <div className="flex items-center py-3 px-8 justify-between border-b">
              <div>
                <button className="flex items-center gap-2 border rounded-md px-3 py-2">
                  <span>
                    <PlusIcon className="w-6 " />
                  </span>
                  <span>Utilisateur</span>
                </button>
              </div>
              <div className="flex items-center gap-4">
                <Search value={search} setValue={setSearch} />

                <div className="relative">
                  <Menu>
                    <Menu.Button>
                      <div className="flex items-center gap-2 border rounded-md px-3 py-2">
                       <span>
                          <SwatchIcon className="w-6" />
                        </span>
                        <span>Filter</span>
                      </div>
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
                        filter
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
                <div className="relative">
                  <Menu>
                    <Menu.Button>
                      <div className="flex items-center gap-2 border rounded-md px-3 py-2">
                       <span>
                          <ViewColumnsIcon className="w-6" />
                        </span>
                        <span>Columns</span>
                      </div>
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
                        <div className="flex flex-col gap-4">
                          {structure.map((item, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <input
                                  name="show"
                                  onClick={(e) => {
                                    const newStructure = structure
                                    newStructure[index].checked = e.currentTarget.checked
                                    setStructure([...newStructure])
                                  }}
                                  type="checkbox"
                                  defaultChecked={item.checked}
                                  disabled={item.default}
                                  className={classNames(
                                    'h-4 w-4 rounded border-gray-300',
                                    item.default ? 'bg-red-300 text-indigo-600' : 'text-indigo-600 focus:ring-indigo-600'
                                  )}
                                />
                                <span>{item.label}</span>
                              </div>
                              {
                                !item.default &&
                                <div className="flex items-center">
                                  <DragIcon />
                                </div>
                              }
                            </div>
                          ))}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>

              </div>
            </div>
            <div className="">
              { data &&
                <Table users={data} structure={structure} search={search} />
              }

            </div>
          </div>

          <div className="border shadow rounded-md p-4 max-w-sm w-full mx-auto">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-slate-200 h-10 w-10"></div>
              <div className="flex-1 space-y-6 py-1">
                <div className="h-2 bg-slate-200 rounded"></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                    <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                  </div>
                  <div className="h-2 bg-slate-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Breadcrumbs () {
  const pages = [
    { name: 'Comptes', href: '/manager/comptes', current: false },
    { name: 'Utilisateurs', href: '/manager/comptes/users', current: true}
  ]
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <Link to={'/manager/home'} className="text-gray-400 hover:text-gray-500">
              <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>
        {pages.map((page) => (
          <li key={page.name}>
            <div className="flex items-center">
              <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
              <Link
                to={page.href}
                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                aria-current={page.current ? 'page' : undefined}
              >
                {page.name}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}

const people = [
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
  // More people...
]

type Column<T> = {
  label: string,
  value: T
}

type TableProps = {
  users: any
  structure: Structure[]
  search: string
}
function Table ({ users, structure, search }: TableProps) {
  const [filtered, setFiltered] = useState()
  const [data, setData] = useState(users)

  const filteredData = data.filter(
    (item: any) => {
      const name = item.firstname + " " + item.lastname
      return name.toLowerCase().indexOf(search.toLowerCase()) !== -1
    }
  )

  return (
    <>
      <table className="w-full min-w-full divide-y">
        <thead className="border-b border-[#E3E3E3]/2">
          <tr className="">
            { structure.map((item, index) => {
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
            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E3E3E3]">
        { filteredData ?
          <>
            {filteredData.map((person: any) => (
              <tr key={person.email}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                  {person.firstname} {person.lastname}
                </td>
                { structure.map((item, index) => {
                  if (item.checked && index !== 0) {
                    if (Array.isArray(person[item.key])) {
                      return (
                        <DisplayArray data={person[item.key]} />
                      )
                    }
                    return (
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person[item.key]}
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
          : <>Loading...</>

        }

        </tbody>
      </table>
    </>
  )
}

function DisplayArray ({ data }) {
  return (
    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
      <span>{ data.length }</span>
    </td>
  )
}