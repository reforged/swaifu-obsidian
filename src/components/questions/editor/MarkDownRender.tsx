import React, {ReactNode, useEffect, useState} from 'react'
import Markdoc from "@markdoc/markdoc";
import Fence from "../../Fence";
import {Prose} from "../../Prose";

type Props = {
  data: string
}

export default function MarkDownRender ({ data }: Props) {
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
}