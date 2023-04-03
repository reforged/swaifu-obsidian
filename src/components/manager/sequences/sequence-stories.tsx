import {ISequence} from "../../../utils";
import Sequence from "./sequence";
import {classNames, filteredData} from "../../../utils/helper";
import {useContext} from "react";
import BoardContext from "../../../contexts/BoardContext";
import {data} from "autoprefixer";

type Props = {
  sequences: ISequence[]
}

export default function SequenceStories ({ sequences }: Props) {
  const [board, setBoard] = useContext(BoardContext)

  return (
    <div className={classNames(
      board.view === 'galerie' ? 'grid grid-cols-2 lg:grid-cols-4 gap-4' : 'flex flex-col gap-2',
      'p-4'
    )}>
      { filteredData<ISequence>(sequences, ['label'], board.search).map((sequence) => <Sequence sequence={sequence} />)}
    </div>
  )
}