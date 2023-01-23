import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import useComponentVisible from '../../hooks/useComponentVisible'
import { IEtiquette } from '@obsidian/type'
import ProfilEtiquette from '../../components/etiquettes/ProfilEtiquette'
import CreateEtiquette from '../../components/etiquettes/CreateEtiquette'
import { classNames } from '../../utils/helper'
import useEtiquette from "../../hooks/useEtiquette";

type EtiquetteProps = {
  data: IEtiquette
  toggle: any
  setData: Dispatch<SetStateAction<IEtiquette | null>>
}





export default function HomeEtiquette () {
  const { ref, isVisible, toggle } = useComponentVisible()
  const [etiquette, setEtiquette] = useState<IEtiquette | null>(null)

  const { getEtiquettes } = useEtiquette()
  const { data } = getEtiquettes()
  return (
    <div className={"relative"}>
      <h1 className="text-2xl font-medium">Hello Etiquettes</h1>

      <div className="">
        { data ?
          <div className="grid grid-cols-4 mt-12 gap-4">
            {data.map((item: IEtiquette, index: number) => (
              <Etiquette key={index} data={item} toggle={toggle} setData={setEtiquette}/>)
            )}
            <CreateEtiquette data={data}/>
          </div>

          :  <CreateEtiquette data={data}/>
        }


      </div>
      {
        etiquette && <ProfilEtiquette open={isVisible} setOpen={toggle} etiquette={etiquette}/>
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
