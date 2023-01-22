import React, {Dispatch, SetStateAction} from 'react'
import {IReponse} from "@obsidian/type";

type Props = {
  reponses: IReponse[]
  setReponses: Dispatch<SetStateAction<IReponse[]>>
}

export default function Input ({ reponses, setReponses}: Props) {
  return (
    <div>

    </div>
  )
}