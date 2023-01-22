import React, {Dispatch, SetStateAction} from 'react'
import Input from "./form/Input";
import Checkbox from "./form/Checkbox";
import Radio from "./form/Radio";
import {IReponse} from "@obsidian/type";

type Props = {
  type: string | undefined
  reponses: IReponse[]
  setReponses: Dispatch<SetStateAction<IReponse[]>>
}

export default function TodoQuestions ({ type, reponses, setReponses }: Props) {
  console.log("Todo :", reponses)
  return (
    <div>
      { type === 'checkbox' && <Checkbox reponses={reponses} setReponses={setReponses} /> }
      { type === 'radio' && <Radio reponses={reponses} setReponses={setReponses} /> }
      { type === 'input' && <Input reponses={reponses} setReponses={setReponses} /> }
    </div>
  )
}



