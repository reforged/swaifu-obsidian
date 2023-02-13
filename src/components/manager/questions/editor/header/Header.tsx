import React, {Dispatch, SetStateAction} from 'react'
import {classNames} from "../../../../../utils/helper";
import ModalEtiquettes from "./ModalEtiquettes";
import ModalType from './ModalType';
import {IEtiquette, IReponse, ITypeQuestion} from '@obsidian/type';
import ModalReponses from "./ModalQuestions";

type Props = {
  label: string
  setLabel: Dispatch<SetStateAction<string>>
  type: ITypeQuestion | null
	setType: Dispatch<SetStateAction<ITypeQuestion | null>>
  etiquettes: IEtiquette[]
	setEtiquettes: Dispatch<SetStateAction<IEtiquette[]>>
  setReponses: Dispatch<SetStateAction<IReponse[]>>
}

export default function Header (
  {
    label, setLabel,
    setType, type,
    setEtiquettes, etiquettes,
    setReponses
  }: Props) {
  return (
    <div className="relative w-full border-b pb-8">
      <div>
        <input
          type="text"
          maxLength={40}
          defaultValue={label}
          placeholder={"Untitled"}
          onChange={(e) => setLabel(e.currentTarget.value)}
          className={classNames(
            'block w-full py-1 focus:outline-none focus:border-none border-none font-bold text-3xl'
          )}
        />
      </div>
      <div className="pt-8 flex flex-col">
        <ModalEtiquettes etiquettes={etiquettes} setEtiquettes={setEtiquettes} />
        <ModalType setType={setType} type={type} setReponses={setReponses} />
        <ModalReponses />
      </div>
    </div>
  )
}