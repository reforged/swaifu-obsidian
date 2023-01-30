import React, {Dispatch, SetStateAction, useContext, useEffect, useState} from 'react'
import useComponentVisible from '../../../hooks/useComponentVisible'
import { IEtiquette } from '@obsidian/type'
import ProfilEtiquette from '../../../components/manager/etiquettes/ProfilEtiquette'
import CreateEtiquette from '../../../components/manager/etiquettes/CreateEtiquette'
import { classNames } from '../../../utils/helper'
import Search from '../../../components/Search'
import useEtiquettes from '../../../hooks/use-etiquettes'

type EtiquetteProps = {
  data: IEtiquette
  toggle: any
  setData: Dispatch<SetStateAction<IEtiquette | null>>
}

export default function HomeEtiquette () {
  const { ref, isVisible, toggle } = useComponentVisible()
  const [etiquette, setEtiquette] = useState<IEtiquette | null>(null)
  const { fetch } = useEtiquettes()
  const { data } = fetch()

  const [value, setValue] = useState<string>('')


  return (
    <div className={"relative"}>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium">Hello Etiquettes</h1>
        <Search value={value} setValue={setValue}/>
      </div>
      { data &&
        <ShowEtiquette data={data} value={value} toggle={toggle} setEtiquette={setEtiquette} />
      }
      {
        etiquette && <ProfilEtiquette open={isVisible} setOpen={toggle} etiquette={etiquette}/>
      }
    </div>
  )
}

type PropsEtiquettes = {
  data: any
  value: string
  toggle: any
  setEtiquette: any
}
const ShowEtiquette = ({ data, toggle, setEtiquette, value }: PropsEtiquettes) => {
  const filteredItems = data.filter(
    (item: any) =>
      JSON.stringify(item)
        .toLowerCase()
        .indexOf(value.toLowerCase()) !== -1
  )


  return (
    <div>
      {
        data ?
          <div className="grid grid-cols-4 mt-12 gap-4">
            { filteredItems.map((item: IEtiquette, index: number) => (
              <Etiquette data={item} toggle={toggle} setData={setEtiquette} key={index} />
              ))}
            <CreateEtiquette data={data} />
          </div>
          : <CreateEtiquette data={data} />
      }
    </div>
  )
}

const Etiquette = ({ data, toggle, setData }: EtiquetteProps) => {
  const click = () => {
    toggle()
    setData(data)
  }

  return (
    <button onClick={() => click()} className="">
      <div className="col-span-1 overflow-hidden border h-full border-gray-200 rounded-md shadow hover:shadow-xl  duration-200 ease-in-out">
        <div className={classNames(data.color, 'h-10 w-full')} />
        <div className="p-5">
          <div className="space-y-2 text-left">
            <p className="text-md font-medium">{ data.label }</p>
            <p className="text-sm">{ data.description }</p>
          </div>
        </div>

      </div>
    </button>

  )
}
