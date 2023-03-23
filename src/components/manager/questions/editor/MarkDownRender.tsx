import React, {ReactNode, useEffect, useState} from 'react'
import Markdoc from "@markdoc/markdoc";
import Fence from "../../Fence";
import {Prose} from "../../Prose";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import 'katex/dist/katex.min.css'

type Props = {
  data: any
}

export default function MarkDownRender ({ data }: Props) {
  const content = `
  ## test 
  \`\`\`ts
  const test: string = "test"
  \`\`\`
Given a **formula** below
$$
s = ut + \\\\frac{1}{2}at^{2}
$$
Calculate the value of $s$ when $u = 10\\\\frac{m}{s}$ and $a = 2\\\\frac{m}{s^{2}}$ at $t = 1s$
`;

  return (
    <ReactMarkdown
      children={data}
      remarkPlugins={[remarkMath]}
      rehypePlugins={[rehypeKatex]}
    />
  )
}

/*export default function MarkDownRender ({ data }: Props) {
  const [md, setMd] = useState<ReactNode>()

  useEffect(() => {
    const ast = Markdoc.parse(data)

    const content = Markdoc.transform(ast, {
      nodes: {
        fence: {
          render: 'Fence',
          attributes: {
            content: { type: String },
            language: { type: String}
          }
        }
      }
    })

    const children = Markdoc.renderers.react(content, React, {
      components: {
        Fence: Fence
      }
    })
    setMd(children)
  }, [data])

  return (
    <div>
      <Prose>
        {md}
      </Prose>
    </div>
  )
}*/