import React, {Dispatch, SetStateAction, useContext, useEffect, useState} from 'react'
import useComponentVisible from '../../../../hooks/useComponentVisible'
import { IEtiquette } from '../../../../utils'
import ProfilEtiquette from '../../../../components/manager/etiquettes/ProfilEtiquette'
import CreateEtiquette from '../../../../components/manager/etiquettes/CreateEtiquette'
import {classNames, filteredData, uid} from '../../../../utils/helper'
import useEtiquettes from '../../../../hooks/use-etiquettes'
import Board, {BoardData} from "../../../../components/manager/board/Board";
import {EtiquettesContext} from "../../../../contexts/EtiquettesContext";
import {TrashIcon} from "@heroicons/react/24/outline";
import Manager from "../../../../layouts/manager";
import BoardContext, {StructureContract} from "../../../../contexts/BoardContext";
import Table from "../../../../components/manager/board/Table";
import UserSkeleton from "../../../../skeleton/UserSkeleton";
import {Options} from "../../../../components/manager/board/types";

type EtiquetteProps = {
  data: IEtiquette
  toggle: any
  setData: Dispatch<SetStateAction<IEtiquette | null>>
}

const pages = [
  { label: 'Home', href: '/manager/qcm', current: false},
  { label: 'Questions', href: '/manager/qcm/questions', current: false},
  { label: 'Etiquettes', href: '/manager/qcm/etiquettes', current: true},
  { label: 'Séquences', href: '/manager/qcm/sequences', current: false},
  { label: 'Sessions', href: '/manager/qcm/sessions', current: false},
  { label: 'Examens', href: '/manager/qcm/examens', current: false},
]

const navigation = [
  {name: "QCM", href: '/manager/qcm/home', current: false},
  {name: "Étiquettes", href: '/manager/qcm/etiquettes', current: true},
]

export default function HomeEtiquette () {
  const { ref, isVisible, toggle, setIsVisible } = useComponentVisible()
  const [etiquette, setEtiquette] = useState<IEtiquette | null>(null)
  const { fetch, destroy } = useEtiquettes()
  const { data, isLoading } = fetch()
  const { mutate: deleteEtiquette } = destroy()

  const columns: StructureContract[] = [
    {label: 'Label', key: 'label', checked: true, default: true, filter: true},
    {label: 'Color', key: 'color', checked: true, default: false, filter: false},
  ]

  function onClick (item: IEtiquette) {
    setEtiquette(item)
    toggle()
  }

  const options: Options<IEtiquette> = {
    label: 'Étiquette',
    view: 'liste',
    search: '',
    structure: columns,
    filter: {
      uid: uid(),
      conjunction: 'and',
      conditions: []
    },
    keys: ['label'],
    open: false,
    option: ['column', 'mode'],
    rowAction: onClick
  }


  return (
    <Manager
      layout={{
        label: 'Étiquettes',
        location: navigation,
        navigation: pages
      }}
    >
      <EtiquettesContext.Provider value={[etiquette, setEtiquette]} >
        <div>
          <div className={"relative"}>
            <div className="mt-12">
              { options && data &&
              <Board<IEtiquette> name={"Étiquette"} options={options} action={<CreateEtiquette />}>
                <BoardContext.Consumer>
                  {([board, setBoard]) => (
                    <>
                      { board.view === 'liste' ?
                        <Table<IEtiquette>
                          columns={columns}
                          loading={isLoading}
                          data={data}
                          keys={['label']}
                          skeleton={<UserSkeleton />}
                          onDelete={deleteEtiquette}
                        />
                        : <div>
                          <GalerieEtiquettes etiquettes={data} toggle={toggle} setIsVisible={setIsVisible} />
                        </div>
                      }
                    </>
                  )}
                </BoardContext.Consumer>
              </Board>
              }
              {
                etiquette && <ProfilEtiquette etiquettes={data} open={isVisible} setOpen={setIsVisible} />
              }
            </div>
          </div>
        </div>
      </EtiquettesContext.Provider>
    </Manager>
  )
}

type ViewProps = {
  etiquettes: IEtiquette[]
  toggle: () => void
  setIsVisible: Dispatch<SetStateAction<boolean>>

}
function GalerieEtiquettes ({ etiquettes, toggle, setIsVisible }: ViewProps) {
  const [etiquette, setEtiquette] = useContext(EtiquettesContext)
  const [board, setBoard] = useContext(BoardContext)
  return (
    <div className="grid grid-cols-3 lg:grid-cols-4 p-4 gap-4">
      { filteredData<IEtiquette>(etiquettes, ['label'], board.search).map((etiquette) => (
        <button
          className="" key={etiquette.id}
          onClick={() => {

            setEtiquette(etiquette)
            toggle()
          }}
        >
          <div className="col-span-1 overflow-hidden border h-full border-gray-200 rounded-md shadow hover:shadow-xl  duration-200 ease-in-out">
            <div className={classNames(etiquette.color, 'h-10 w-full')} />
            <div className="p-5">
              <div className="text-left">
                <p className="text-md font-medium">{ etiquette.label }</p>
              </div>
            </div>

          </div>
        </button>
      ))}

    </div>
  )
}

function ListeEtiquettes ({ etiquettes, toggle, setIsVisible }: ViewProps) {
  const [etiquette, setEtiquette] = useContext(EtiquettesContext)
  const { destroy } = useEtiquettes()
  const { mutate: deleteEtiquette } = destroy()

  function onDelete (id: string) {
    setEtiquette(null)
    setIsVisible(false)
    deleteEtiquette(id)
  }


  return (
    <div className="flex flex-col">
      { etiquettes.map((etiquette) => (
        <button
          onClick={() => {
            setEtiquette(etiquette)
            toggle()
          }} key={etiquette.id}
          className="group p-3 hover:bg-[#E2E9F3] rounded-md flex justify-between items-center"
        >
          <div className="flex items-center gap-2">
            <div className={classNames(
              etiquette.color,
              'w-2 h-2 rounded-full'
            )} />
            <span>{ etiquette.label }</span>
          </div>
          <div>
            <button
              onClick={() => {
                deleteEtiquette(etiquette.id)
              }}
            >
              <span>
                <TrashIcon className="invisible group-hover:visible w-6 text-gray-500 relative z-10" />
              </span>
            </button>
          </div>
        </button>

      ))}
      <CreateEtiquette />
    </div>
  )
}
