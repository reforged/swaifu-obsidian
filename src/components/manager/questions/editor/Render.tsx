import React, {ReactNode} from 'react'
import {Prose} from "../../Prose";
import {IReponse, ITypeQuestion} from "@obsidian/type";
import {classNames} from "../../../../utils/helper";
import MarkDownRender from "./MarkDownRender";

type Props = {
  type: ITypeQuestion | null
  body: ReactNode
  reponses: IReponse[]
}
export default function Render ({ body, reponses, type }: Props) {
  return (
    <div className="flex flex-col pt-6">
      <div className="border rounded-md p-6 relative">
        <span className="text-xs absolute top-0 left-0 p-2 text-gray-400">Énoncé</span>
        <Prose>
          {body}
        </Prose>
      </div>
      { reponses.length ?
          <div className="pt-4 border-t mt-4">
            { type?.value === 'checkbox' && <ReponsesPreview data={reponses} /> }
            { type?.value === 'radio' && <ReponsesPreview data={reponses} /> }
            { type?.value === 'input' && <MarkDownRender data={reponses[0].body}/> }
          </div>

        : <div className="pt-6">
          <span className="text-sm text-gray-600 ">Pas de réponses générés</span>
        </div>
      }
    </div>
  )
}
type ReponsesPreviewProps = {
  data: IReponse[]
}

const ReponsesPreview = ({ data }: ReponsesPreviewProps) => {
 return (
   <div>
      <span className="text-gray-600 text-medium">Les différentes réponses</span>

     <div className="grid grid-cols-3 gap-3">
       { data.map((item, index) => (
         <div
           className={classNames(
             item.valide ? 'border-green-400 bg-green-50' : 'bg-gray-50',
             'border p-4 rounded-md'
           )}
           key={index}
         >
           <MarkDownRender data={item.body} />
         </div>
       ))}
     </div>
   </div>
 )
}