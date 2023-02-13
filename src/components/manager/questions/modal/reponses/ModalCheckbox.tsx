import QuestionContext from "../../../../../contexts/QuestionContext";
import {Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import {IQuestion, IReponse} from "../../../../../utils";
import {Prose} from "../../../Prose";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import Fence from "../../../Fence";
import {classNames} from "../../../../../utils/helper";

export default function ModalCheckbox () {
  const [question, setQuestion] = useContext(QuestionContext)
  const [data, setData] = useState<string>('')
  const [disabled, setDisabled] = useState<boolean>(true)
  const [selected, setSelected] = useState<IReponse | null>(null)

  useEffect(() => {
    if (data.length) setDisabled(false)
    else setDisabled(true)
  }, [data])

  function submit () {
    const objet: IReponse = {
      body: data,
      valide: false
    }

    setQuestion({
      ...question,
      reponses: [...question.reponses, objet]
    })

    console.log(objet)
  }
  return (
    <QuestionContext.Consumer>
      {([question]) => (
        <div>
          <div className="bg-[#F2F1EE] p-2">
            <span className="text-gray-700 text-md">Lorem ipsum</span>
          </div>
          <div className="divide-x grid grid-cols-4">
            <div className="p-2">
              <span className="text-gray-600 text-sm">Réponses</span>
              <div>
                { question.reponses.length >= 1
                  && <div>
                    <TodoReponses setSelected={setSelected}/>
                  </div>
                }
                <div>
                  <button
                    onClick={() => setSelected(null)}
                    className="group hover:bg-gray-100 rounded-md p-2 w-full text-left"
                  >
                    Créer une réponse
                  </button>
                </div>
              </div>
            </div>
            <div className="col-span-3">
              { selected
                ? <div>{selected.body}</div>
                :
                <div>
                  <textarea
                    rows={3}
                    name={"body"}
                    id={"body"}
                    className="body w-full resize-none border-0 py-3 focus:ring-0 sm:text-sm"
                    placeholder="Ecrivez votre réponse"
                    value={data}
                    onChange={(e) => setData(e.currentTarget.value)}
                  />
                  <div>
                    <ReactMarkdown
                      children={data}
                      components={{
                        code: ({node, ...props}) => Fence({ children: props})
                      }}
                      remarkPlugins={[remarkMath]}
                      rehypePlugins={[rehypeKatex]}
                    />
                  </div>
                  <div className="flex justify-end p-4">
                    <button
                      type="button" onClick={submit}
                      disabled={disabled}
                      className={classNames(
                        'rounded-md px-2 py-1 border ',
                        disabled ? 'bg-gray-100' : 'bg-green-100'
                      )}
                    >
                      Créer réponse
                    </button>
                  </div>
                </div>
              }



            </div>
          </div>
        </div>
      )}
    </QuestionContext.Consumer>
  )
}

type TodoReponsesProps = {
  setSelected: Dispatch<SetStateAction<IReponse | null>>
}
const TodoReponses = ({ setSelected }: TodoReponsesProps) => {
  return (
    <QuestionContext.Consumer>
      {([question]) => (
        <div className="pt-4">
          { question.reponses.map((reponse: IReponse, index: number) => (
            <div>
              <button
                key={index}
                className="group hover:bg-gray-100 rounded-md p-2 w-full text-left"
                onClick={(e) => {
                  setSelected(reponse)
                }
                }>
                <span>Réponse {index+1}</span>
              </button>
            </div>

          ))}
        </div>
      )}
    </QuestionContext.Consumer>
  )
}

