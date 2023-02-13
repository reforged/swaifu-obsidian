import { ChangeEvent, useContext } from 'react'
import StructureContext from '../contexts/StructureContext'

export function useBlock (uid: string) {
  const [structure, setStructure] = useContext(StructureContext)
  const clone = [...structure]

  const block = structure.find((block) => block.uid === uid)
  const index = structure.indexOf(block)

  function updateBlock (values) {
    block.fields = { ...block.fields, ...values }
    clone.splice(index, 1, block)

    setStructure(clone)
  }

  function removeBlock () {
    const copy = [...structure]
    copy.splice(index, 1)

    setStructure(copy)
  }

  return {
    clone,
    index,
    block,
    updateBlock,
    removeBlock,
  }
}

export function useDragAndDrop () {
  function reorder (list, startIndex, endIndex) {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result
  }

  return {
    reorder
  }
}


export function useImage () {
  function toBase64 (file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)

      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
    })
  }

  async function transform (event: ChangeEvent<HTMLInputElement>): Promise<unknown> {
    const file = event.target.files.item(0)
    if (file) {
      event.target.value = ''
      return await toBase64(file)
    }
  }

  return {
    toBase64,
    transform
  }
}
