import {IReponse} from "../../../../../utils";
import ReactMarkdown from "react-markdown";
import Fence from "../../../Fence";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

type Props = {
    answer: IReponse
}

export default function AnswerStat ({ answer }: Props) {
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
        </div>
    )
}