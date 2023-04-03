import {ISequence} from "../../../utils";
import React, {useContext} from "react";
import BoardContext from "../../../contexts/BoardContext";
import {TrashIcon} from "@heroicons/react/24/outline";
import useSequences from "../../../hooks/use-sequences";

type Props = {
  sequence: ISequence
}

type ViewProps = {
  onDelete: () => void
  handle: () => void
  sequence: ISequence
}

export default function Sequence ({ sequence }: Props) {
  const [board, setBoard] = useContext(BoardContext)
  const { destroy } = useSequences()
  const { mutate: deleteSequence } = destroy()

  function onDelete () {
    deleteSequence(sequence.id!)
  }

  function handle () {

  }

  return (
    <div>
      { board.view === 'galerie' && sequence && <Galerie sequence={sequence} onDelete={onDelete} handle={handle} />}
    </div>
  )
}

function Galerie ({ onDelete, handle, sequence }: ViewProps) {
  return (
    <div>
      <button
        className="bg-[#E2E9F3] relative group aspect-video flex w-full h-full text-left p-4 rounded-md hover:shadow-md duration-200 ease-in-out"
      >
        <div className="invisible absolute top-0 right-0 p-4 group-hover:visible">
          <button onClick={onDelete} className="hover:bg-gray-300 p-1 rounded-md">
            <TrashIcon className="w-6 text-gray-600" />
          </button>
        </div>
        <div className="flex flex-col justify-between h-full w-full" onClick={handle}>
          {sequence.label}

          <div className="flex justify-between items-center">
            <div>{sequence.questions.length}</div>
            <div></div>
          </div>
        </div>
      </button>
    </div>
  )
}