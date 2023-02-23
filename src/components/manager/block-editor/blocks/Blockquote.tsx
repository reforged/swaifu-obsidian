import ContentEditable from '../components/ContentEditable'
import { useBlock } from '../utils'

type Props = {
  uid: string
  fields: {
    cite: string
    caption: string
  }
}

export default function Blockquote (props: Props) {
  const { updateBlock } = useBlock(props.uid)

  function handleChange (field: string, value: string): void {
    updateBlock({ [field]: value })
  }

  return (
    <blockquote className="lightning-blockquote">
      <ContentEditable
        as="p"
        onChange={(value: string) => handleChange('cite', value)}
        value={props.fields.cite}
      />
      <ContentEditable
        as="p"
        onChange={(value: string) => handleChange('caption', value)}
        value={props.fields.caption}
      />
    </blockquote>
  )
}
