import {useContext} from "react";
import BoardContext from "../../../../contexts/BoardContext";
import {Galerie} from "../views/Galerie";
import Liste from "../views/Liste";

export default function Mode () {
  const [board, setBoard] = useContext(BoardContext)

  return (
    <div>
      <>
        { board.view === 'galerie' && <Galerie />}
        { board.view === 'liste' && <Liste />}
      </>
    </div>
  )
}
