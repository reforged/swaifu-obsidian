import { useContext } from 'react'
import BoardContext from '../../../../contexts/BoardContext'
import { FolderIcon } from '@heroicons/react/24/outline'

export function Galerie () {
  const [board, setBoard] = useContext(BoardContext)

  return (
    <button
      className="flex items-center gap-2 border rounded-md px-3 py-2"
      onClick={() => {
        setBoard({
          ...board,
          view: 'liste'
        })
      }}
    >
      <span>
        <FolderIcon className="w-6" />
      </span>
      <span>Galerie</span>
    </button>
  )
}
