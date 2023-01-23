import React, {Dispatch, SetStateAction, useState} from 'react'
import {IEtiquette} from "@obsidian/type";
import {classNames} from "../../../utils/helper";

type Props = {
  data: IEtiquette
  setEtiquettes: Dispatch<SetStateAction<IEtiquette[]>>
  etiquettes: IEtiquette[]
}
export default function Etiquette ({ data, setEtiquettes, etiquettes }: Props) {
  const [active, setActive] = useState<boolean>(false)

  const toggle = () => {
    setActive(!active)
    const isPresent = etiquettes.some((item) => item.label === data.label)
    if (!isPresent) {
      setEtiquettes([...etiquettes, data])

    }
    else {
      const index = etiquettes.indexOf(data)
      const list: IEtiquette[] = etiquettes
      list.splice(index, 1)

      setEtiquettes([...list])
    }
  }

  return (
    <button
      onClick={toggle}
      className={classNames(
        active ? 'bg-green-300' : 'bg-gray-100',
        'border rounded-full px-2'
      )}
    >
      {data.label}
    </button>
  )
}