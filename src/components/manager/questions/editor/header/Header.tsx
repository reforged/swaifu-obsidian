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

export default function Header () {
  return (
    <div>

    </div>
  )
}