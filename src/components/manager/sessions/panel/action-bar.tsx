import {io} from "socket.io-client";
import {useContext} from "react";
import RoomContext from "../../../../contexts/RoomContext";
import LockButton from "./actions/lock-button";
import ShowAnswerStats from "./actions/show-answer-stats";
import ShowAnswers from "./actions/show-answers";
import DeleteSession from "./actions/delete-session";

export default function ActionBar () {
  const [room, setRoom] = useContext(RoomContext)

  return (
    <div className="flex items-center justify-between">
      <ShowAnswerStats />
      <LockButton />
      <ShowAnswers />
      <DeleteSession />
    </div>
  )
}