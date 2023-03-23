import React, {Dispatch, SetStateAction} from 'react'
import {IEtiquette, IReponse, ITypeQuestion} from '@obsidian/type';

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