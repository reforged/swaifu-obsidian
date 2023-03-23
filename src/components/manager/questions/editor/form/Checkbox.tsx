import React, {Dispatch, SetStateAction, useEffect, useState} from 'react'
import { Switch } from '@headlessui/react'
import {classNames} from "../../../../../utils/helper";
import {IReponse} from "@obsidian/type";
import { TrashIcon } from "@heroicons/react/24/outline";
import useComponentVisible from "../../../../../hooks/useComponentVisible";
import {AnimatePresence, motion} from "framer-motion";
import Toggle from "../../../Toggle";
import CreateReponse from "./CreateReponse";
import NoReponses from "../../NoReponses";

type Props = {
  reponses: IReponse[]
  setReponses: Dispatch<SetStateAction<IReponse[]>>
}

export default function Checkbox ({ reponses, setReponses }: Props) {
  function addData (body: string) {
    setReponses([...reponses, {
      body: body, valide: false
    }])
  }

  function toggle (index: number) {
    const newList = reponses
    newList[index].valide = !newList[index].valide
    setReponses([...newList])
  }

  function removeData (index: number) {
    const list: IReponse[] = reponses
    list.splice(index, 1)
    setReponses([...list])
  }

  return (
    <div>
      {reponses.length ?
        <div className="border rounded-md flex flex-col divide-y px-4">
          {reponses.map((item, index) => (
            <div className="flex gap-2 items-center justify-between py-4" key={index}>
              <Toggle enabled={item.valide} toggle={toggle} index={index}/>
              <div>
                {item.body}
              </div>

              <div>
                <button onClick={() => removeData(index)}>
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
        : <NoReponses />
      }

      <div>
        <CreateReponse addData={addData} />
      </div>
    </div>
  )
}