import React, {Dispatch, SetStateAction, useEffect, useState} from 'react'
import {IQuestion} from "@obsidian/type";
import {ListBulletIcon, PencilSquareIcon, QueueListIcon} from "@heroicons/react/24/outline";
import {classNames, ReactElement} from "../../utils/helper";
import {
  BlobProvider,
  Document,
  Page,
  StyleSheet,
  Text,
  View
} from "@react-pdf/renderer";

type Props = {
  data: any
  selected: number[]
  setSelected: Dispatch<SetStateAction<number[]>>
}

function TypeQuestion ({ type }: { type: string}) {
  const types = [
    {name: 'Réponse libre', icon: PencilSquareIcon, value: 'input'},
    {name: 'Réponse multiple', icon: ListBulletIcon, value: 'checkbox'},
    {name: 'Réponse unique', icon: QueueListIcon, value: 'radio'},
  ]

  let selection = 0

  types.map((item, index) => {
    if (item.value === type) {
      selection = index

    }
  })

  return (
    <div className="flex items-center gap-2 text-gray-700">
      <ReactElement tag={types[selection].icon} className={classNames('w-6 h-6')} />
      <span>{types[selection].name}</span>
    </div>
  )
}

export default function ShowQuestion ({ data, setSelected, selected }: Props) {
  useEffect(() => {
    console.log(selected)
  }, [selected])

  return (
    <div className="flex flex-col gap-4 pt-10">
      { data.map((item: IQuestion, index: number) => (
        <button onClick={() => {
          const list = selected
          if (list.includes(index)) {
            const i = list.indexOf(index)
            list.splice(i, 1)
            setSelected([...list])
          } else {
            setSelected([...list, index])
          }
        }}>
          <div className={classNames(
            " rounded-md p-3 duration-100 ease-in-out border",
            selected.includes(index) ? 'bg-green-100 hover:bg-green-200 border-green-200' : 'bg-gray-50 hover:bg-gray-100'
          )}>
            <div></div>
            <div className="flex flex-col">
              <span className="text-gray-900 text-3xl font-bold">{ item.label }</span>
              <TypeQuestion type={item.type}/>
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}

