import { BlockContextContract } from './contexts/BlocksContext'
import Title from './blocks/Title'
import Paragraph from './blocks/Paragraph'
import Divide from './blocks/Divide'
import Blockquote from './blocks/Blockquote'
import Code from './blocks/Code'

export function TitleBlock (): BlockContextContract {
  return {
    block: Title,
    structure: {
      uid: window.crypto.randomUUID(),
      type: "title",
      fields: {
        level: 1,
        value: "Lorem ipsum dolor sit amet"
      }
    }
  }
}

export function ParagraphBlock (): BlockContextContract {
  return {
    block: Paragraph,
    structure: {
      uid: window.crypto.randomUUID(),
      type: "paragraph",
      fields: {
        value: "lorem ipsum"
      }
    },
  }
}


export function DivideBlock (): BlockContextContract {
  return {
    block: Divide,
    structure: {
      uid: window.crypto.randomUUID(),
      type: "divide",
      fields: {}
    }
  }
}

export function BlockquoteBlock (): BlockContextContract {
  return {
    block: Blockquote,
    structure: {
      uid: window.crypto.randomUUID(),
      type: "blockquote",
      fields: {
        cite: 'Lorem ipsum dolor sit amet.',
        caption: 'Author..',
      }
    }
  }
}


export function CodeBlock (): BlockContextContract {
  return {
    block: Code,
    structure: {
      uid: window.crypto.randomUUID(),
      type: "code",
      fields: {
        code: '',
        legend: 'Code block',
        lineNumbers: true
      }
    },
  }
}
