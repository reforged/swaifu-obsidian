import React, {Dispatch, SetStateAction} from 'react'
import Input from "./form/Input";
import Checkbox from "./form/Checkbox";
import {IReponse} from "@obsidian/type";

type Props = {
  type: string | undefined
  reponses: IReponse[]
  setReponses: Dispatch<SetStateAction<IReponse[]>>
}

export default function TodoQuestions ({ type, reponses, setReponses }: Props) {
  return (
    <div className="mt-8">
      { type === 'checkbox' && <Checkbox reponses={reponses} setReponses={setReponses} /> }
      { type === 'input' && <Input reponses={reponses} setReponses={setReponses} /> }
    </div>
  )
}



