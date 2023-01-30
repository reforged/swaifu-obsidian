import React, {Dispatch, SetStateAction, useEffect} from 'react'
import {IEtiquette} from "@obsidian/type";
import Etiquette from "./Etiquette";

type Props = {
  data: IEtiquette[]
  setEtiquettes: Dispatch<SetStateAction<IEtiquette[]>>
  etiquettes: IEtiquette[]
}

export default function TodoEtiquettes ({ data, setEtiquettes, etiquettes }: Props) {
  return (
    <div className="flex items-center gap-2 p-4">
      { data.map((item, index) => (
        <Etiquette  data={item} key={index} setEtiquettes={setEtiquettes} etiquettes={etiquettes}/>
      ))}
    </div>
  )
}