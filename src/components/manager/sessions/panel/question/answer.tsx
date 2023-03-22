import {IReponse} from "../../../../../utils";
import MarkDownRender from "../../../questions/editor/MarkDownRender";
import ReactMarkdown from "react-markdown";
import Fence from "../../../Fence";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

type Props = {
  answer: IReponse
}

export default function Answer ({ answer }: Props) {
  return (

    <div className="bg-gray-50 flex flex-col p-3 shadow-sm rounded-md">
      <ReactMarkdown
        children={answer.body}
        components={{
          code: ({node, ...props}) => Fence({ children: props})
        }}
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
      />
      <div className="w-2/3">
        <div className="overflow-hidden rounded-sm bg-gray-200">
          <div className="h-2 rounded-sm bg-indigo-600" style={{ width: '37.5%' }} />
        </div>
      </div>

    </div>
  )
}