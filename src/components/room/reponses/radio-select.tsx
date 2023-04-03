import { RadioGroup } from '@headlessui/react'
import RoomContext from '../../../contexts/RoomContext'
import {classNames} from "../../../utils/helper";
import ReactMarkdown from "react-markdown";
import Fence from "../../manager/Fence";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export default function RadioSelect ({ selected, setSelected }) {
  return (
    <RoomContext.Consumer>
      {([ room ]) => (
        <>
          <RadioGroup value={selected} onChange={setSelected}>
            <div className="space-y-4">
              { room.session!.question!.reponses.map((reponse, key) => (
                <RadioGroup.Option
                  disabled={room.waiting}
                  key={key}
                  value={reponse}
                  className={({checked, active}) =>
                    classNames(
                      checked ? 'border-transparent bg-indigo-50' : 'border-gray-300',
                      active ? 'border-indigo-600 ring-2 ring-indigo-600' : '',
                      'relative block cursor-pointer rounded-lg border  px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between'
                    )
                  }
                >
                  {({ active, checked }) => (
                    <>
                      <ReactMarkdown
                        children={reponse.body}
                        components={{
                          code: ({node, ...props}) => Fence({children: props})
                        }}
                        remarkPlugins={[remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                      />
                      <span
                        className={classNames(
                          active ? 'border' : 'border-2',
                          checked ? 'border-indigo-600' : 'border-transparent',
                          'pointer-events-none absolute -inset-px rounded-lg'
                        )}
                        aria-hidden="true"
                      />
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </>
      )}
    </RoomContext.Consumer>
  )
}