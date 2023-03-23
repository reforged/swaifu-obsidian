import React, {Dispatch, SetStateAction, useEffect, useState} from 'react'
import {IReponse} from "@obsidian/type";

type Props = {
  reponses: IReponse[]
  setReponses: Dispatch<SetStateAction<IReponse[]>>
}

export default function Input ({ reponses, setReponses}: Props) {
  const [body, setBody] = useState<string>(reponses.length ? reponses[0].body : '')

  useEffect(() => {
    setReponses([{
      body: body,
      valide: true
    }])
  }, [body])
  return (
    <div className="">
      <div className="w-full">
        <textarea
          rows={4} onChange={(e) => setBody(e.currentTarget.value)}
          value={body}
          placeholder="Votre réponse..."
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
    </div>
  )
}