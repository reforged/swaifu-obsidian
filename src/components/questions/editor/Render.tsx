import React, {ReactNode} from 'react'
import {Prose} from "../../Prose";
import {IReponse} from "@obsidian/type";

type Props = {
  body: ReactNode
  reponses: IReponse[]
}
export default function Render ({ body, reponses }: Props) {
  return (
    <div className="flex flex-col">
      <div>
        <Prose>
          {body}
        </Prose>
      </div>

      <div className="pt-4 border-t">
        <div className="flex flex-col gap-1">
          { reponses.map((item, index) => (
            <div key={index}>
              {item.body}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}