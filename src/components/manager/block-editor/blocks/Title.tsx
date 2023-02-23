import ContentEditable from '../components/ContentEditable'
import { useBlock } from '../utils'

type Props = {
  uid: string
  fields: {
    level: number
    value: string
  }
}

export default function Title (props: Props) {
  const { updateBlock } = useBlock(props.uid)

  function handleChange (value) {
    updateBlock({ value })
  }

  return (
    <ContentEditable
      as={'h' + props.fields.level}
      className="lightning-title"
      onChange={handleChange}
      value={props.fields.value}
    />
  )
}
