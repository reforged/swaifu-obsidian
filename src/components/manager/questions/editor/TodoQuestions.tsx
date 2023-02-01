import React, {Dispatch, SetStateAction} from 'react'
import Input from "./form/Input";
import Checkbox from "./form/Checkbox";
import {IReponse, ITypeQuestion} from "@obsidian/type";

type Props = {
  type: ITypeQuestion | null
  reponses: IReponse[]
  setReponses: Dispatch<SetStateAction<IReponse[]>>
}

export default function TodoQuestions ({ type, reponses, setReponses }: Props) {
  return (
    <div className="mt-8">
      { type?.value === 'checkbox' && <Checkbox reponses={reponses} setReponses={setReponses} /> }
      { type?.value === 'input' && <Input reponses={reponses} setReponses={setReponses} /> }
    </div>
  )
}



