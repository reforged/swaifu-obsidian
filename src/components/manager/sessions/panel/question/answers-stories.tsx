import {IQuestion} from "../../../../../utils";
import Answer from "./answer";
import RoomContext from "../../../../../contexts/RoomContext";
import {useContext} from "react";

type Props = {
  question: IQuestion
}

export default function AnswersStories () {
  const [room, setRoom] = useContext(RoomContext)

  console.log(room.question)
  return (
    <RoomContext.Consumer>
      {([room]) => (
        <>
          { room.question &&
            <div className="border py-8 px-2 rounded-md relative">
              <span className="text-xs absolute top-0 left-0 m-2 p-2  rounded-md bg-gray-50">Réponses</span>
              <div className="flex flex-col gap-4 pt-6">
                { room.question.reponses.map((reponse) => (
                  <Answer answer={reponse} />
                ))}
              </div>
            </div>
          }
        </>

      )}
    </RoomContext.Consumer>


  )
}