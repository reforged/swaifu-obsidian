import React, {Dispatch, SetStateAction, useContext, useEffect, useState} from 'react'
import useComponentVisible from '../../../../hooks/useComponentVisible'
import { IEtiquette } from '../../../../utils'
import ProfilEtiquette from '../../../../components/manager/etiquettes/ProfilEtiquette'
import CreateEtiquette from '../../../../components/manager/etiquettes/CreateEtiquette'
import { classNames } from '../../../../utils/helper'
import Search from '../../../../components/Search'
import useEtiquettes from '../../../../hooks/use-etiquettes'
import Board, {BoardData} from "../../../../components/manager/board/Board";
import {EtiquettesContext} from "../../../../contexts/EtiquettesContext";
import {TrashIcon} from "@heroicons/react/24/outline";
import Manager from "../../../../layouts/manager";
import BoardContext, {StructureContract} from "../../../../contexts/BoardContext";
import Table from "../../../../components/manager/board/Table";
import UserSkeleton from "../../../../skeleton/UserSkeleton";

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
]

export default function HomeEtiquette () {
  const { ref, isVisible, toggle, setIsVisible } = useComponentVisible()
  const [etiquette, setEtiquette] = useState<IEtiquette | null>(null)
  const { fetch } = useEtiquettes()
  const { data, isLoading } = fetch()

  const columns: StructureContract[] = [
    {label: 'Label', key: 'label', checked: true, default: true},
    {label: 'Color', key: 'color', checked: true, default: false},
  ]

  return (
    <Manager
      layout={{
        label: 'Étiquettes',
        location: [],
        navigation: pages
      }}
    >
      <EtiquettesContext.Provider value={[etiquette, setEtiquette]} >
        <div>
          <div className={"relative"}>
            <div className="mt-12">
              <Board name={"Étiquette"} options={['filter', 'column', 'mode']}>
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
                        />
                        : <div>Galerie</div>
                      }
                    </>
                  )}
                </BoardContext.Consumer>

              </Board>
              {/*}
              <Board name='Étiquette' options={['filter', 'column', 'mode',]} >
                { data
                  ? <>
                    <ShowEtiquette
                      data={data} value={value}
                      toggle={toggle}
                      mode={mode}
                      setIsVisible={setIsVisible}
                    />
                  </>

                  : <div className="grid grid-cols-4 mt-12 gap-4">
                    <CreateEtiquette />
                  </div>
                }
                {
                  etiquette && <ProfilEtiquette etiquettes={data} setEtiquette={setEtiquette} open={isVisible} setOpen={toggle} etiquette={etiquette}/>
                }

              </Board>
              */}
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

  return (
    <div className="grid grid-cols-4  gap-4">
      { etiquettes.map((etiquette) => (
        <button
          className="" key={etiquette.id}
          onClick={() => {
            toggle()
            setEtiquette(etiquette)
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

type PropsEtiquettes = {
  mode: 'galerie' | 'liste'
  data: any
  value: string
  toggle: any
  setIsVisible: Dispatch<SetStateAction<boolean>>
}

const ShowEtiquette = ({ data, toggle, value, setIsVisible }: PropsEtiquettes) => {
  const filteredItems = data.filter(
    (item: IEtiquette) => {
      const label = item.label
      return label.toLowerCase().indexOf(value.toLowerCase()) !== -1
    }
  )

  const [board, setBoard] = useContext(BoardContext)

  return (
    <div>
      {
        data ?
          <div className="p-4">
            { board.view === 'galerie'
              ? <GalerieEtiquettes etiquettes={filteredItems} toggle={toggle} setIsVisible={setIsVisible} />
              : <ListeEtiquettes etiquettes={filteredItems} toggle={toggle} setIsVisible={setIsVisible} />
            }
          </div>
          : <CreateEtiquette />
      }
    </div>
  )
}
