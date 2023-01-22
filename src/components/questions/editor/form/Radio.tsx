import React, {Dispatch, SetStateAction} from 'react'
import {IReponse} from "@obsidian/type";

type Props = {
  reponses: IReponse[]
  setReponses: Dispatch<SetStateAction<IReponse[]>>
}

export default function Radio ({ reponses, setReponses}: Props) {
  function addData () {

  }

  return (
    <div>
      Radio
    </div>
  )
}