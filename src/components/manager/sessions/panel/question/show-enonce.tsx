import {IQuestion} from "../../../../../utils";
import BlockEditor from "../../../block-editor/BlockEditor";
import {BlockContextContract} from "../../../block-editor/contexts/BlocksContext";
import QuestionContext from "../../../../../contexts/QuestionContext";
import {
  BlockquoteBlock, CodeBlock,
  DivideBlock, MermaidBlock,
  ParagraphBlock,
  TitleBlock
} from "../../../block-editor/builders";
import {useContext, useEffect, useState} from "react";
import {ArrowRightCircleIcon} from "@heroicons/react/24/outline";
import RoomContext from "../../../../../contexts/RoomContext";

type Props = {
  question: IQuestion
}
export default function ShowEnonce ({ question }: Props) {
  const [state, setState] = useState<IQuestion>(question)
  const [room, setRoom] = useContext(RoomContext)

  function handleChange () {}
  const blocks: { [key: string]: () => BlockContextContract} = {
    title: TitleBlock,
    paragraph: ParagraphBlock,
    divide: DivideBlock,
    mermaid: MermaidBlock,
    blockquote: BlockquoteBlock,
    code: CodeBlock,
  }

  useEffect(() => {
    console.log(question)
    setState(room.session.question)
  }, [room])

  return (
    <QuestionContext.Provider value={[state, setState]}>
      <div className="border p-8 rounded-md relative">
        <span className="text-xs absolute top-0 left-0 m-2 p-2 rounded-md bg-gray-50">Énoncé</span>

        <div className="pt-4">
          <BlockEditor
            blocks={blocks}
            settings={{
              mode: 'preview'
            }}
            value={room.session.question.enonce}
            onChange={handleChange}
          />
        </div>

      </div>
    </QuestionContext.Provider>

  )
}