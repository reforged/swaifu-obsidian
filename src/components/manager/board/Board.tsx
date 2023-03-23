import {Dispatch, ReactNode, SetStateAction, useEffect, useState} from 'react'
import {Column, Options, View} from './types'
import BoardContext, {BoardContract} from '../../../contexts/BoardContext'
import Search from './Search'
import FilterView from './options/Filter'
import ColumnView from './options/Column'
import Mode from './options/Mode'
import useEtiquettes from "../../../hooks/use-etiquettes";
import useRoles from "../../../hooks/use-roles";
import usePermissions from "../../../hooks/use-permissions";

type State<T> = [
  state: T,
  setState: Dispatch<SetStateAction<T>>
]

export type BoardData = {
  mode: State<View>
  search: State<string>
  column?: State<Column[]>
}

type Props<T> = {
  name: string
  options: Options<T>
  action?: ReactNode
  children: ReactNode
}

export default function Board<T> ({ name, options, children, action }: Props<T>) {
  const [board, setBoard] = useState<BoardContract<T>>(options)
  const { fetch: fetchEtiquettes } = useEtiquettes()
  const { index: fetchRoles } = useRoles()
  const { index: fetchPerms } = usePermissions()
  const { data: etiquettes} = fetchEtiquettes()
  const { data: roles } = fetchRoles()
  const { data: permissions } = fetchPerms()

  useEffect(() => {
    setBoard({
      ...board,
      data: {
        permissions,
        etiquettes,
        roles
      },
      selectData: {
        permissions,
        etiquettes,
        roles
      }
    })
  }, [etiquettes, roles, permissions])


  return (
    <BoardContext.Provider value={[board, setBoard]}>
      <div className="w-full bg-[#F7F9FC] rounded-md border mt-8">
        <div className="flex items-center px-8 py-3 justify-between border-b">
          <div className="flex w-full">
            { action }
          </div>
          <div className="flex items-center gap-4 w-full">
            <Search />
            {
              board.option.map((option) => {
                switch (option) {
                  case "column":
                    return board.view === 'liste' ? <ColumnView /> : <></>
                  case "filter":
                    return board.structure.length ? <FilterView /> : <></>
                  case "mode": return <Mode />
                }
              })
            }
          </div>
        </div>
        <div>
          { children }
        </div>
      </div>
    </BoardContext.Provider>
  )
}
