import BlocksContext  from '../contexts/BlocksContext'
import { ReactElement } from '../../../../utils/helper'
import { useContext } from 'react'

type Props = {
  block: any,
  index: number
}

export default function Block (props: Props) {
  const blocks = useContext(BlocksContext)
  const blockInstance = blocks[props.block.type]()

  return (
    <div className="">
      <ReactElement
        tag={blockInstance.block}
        index={props.index}
        uid={props.block.uid}
        fields={props.block.fields}
      />
    </div>

  )
}
