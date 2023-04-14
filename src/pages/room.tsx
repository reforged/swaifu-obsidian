import {useLocation} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {io} from "socket.io-client";
import AuthenticationContext from "../contexts/AuthenticationContext";
import RoomContext from "../contexts/RoomContext";
import {useNavigate} from "react-router";
import {IRoom} from "../utils/room";
import {ISession} from "../utils";
import WaintingRoom from "../components/room/wainting-room";
import {
  JoinEvent,
  JoinSuccessfulEvent,
  LockEvent,
  NewQuestion,
  StartEvent
} from "../utils/room/events";
import Question from "../components/room/question";
import {useCookies} from "react-cookie";
import useWebsocket from "../hooks/use-websocket";

export default function Room () {
  const [cookie, setCookie, removeCookie] = useCookies(['room'])
  const [room, setRoom] = useState<IRoom>({
    locked: false,
    session: null,
    waiting: false
  })
  const location = useLocation()
  const router = useNavigate()
  const [code, setCode] = useState<string>(location.pathname.split("/")[2])
  const [user, setUser] = useContext(AuthenticationContext)

  const { socket } = useWebsocket()

  function JoinSuccess (data: JoinSuccessfulEvent) {
    const question = data.session.question
    const userReponses = data.session.reponses.filter((item) => item.user_id === user.id)
    const reponse = question?.reponses.find((item) => {
      let value
      userReponses.forEach((a) => {
        if (a.question_id === question.id) {
          if (item.body === a.body) value = item
        }
      })
      return value
    })


    setRoom({
      ...room,
      session: data.session,
      waiting: !!reponse,
    })
  }




  function StartSession (data) {
    if (data.session.code === code) {
      console.log(data)
      setRoom({
        ...room,
        session: data.session,
      })
    }
  }

  function StopSession () {
    router('/')
  }

  function LockAnswer (data: LockEvent) {
    if (room.session && data.session.id === room.session.id) {
      setRoom({
        ...room,
        locked: data.locked
      })
    }
  }

  function ShowAnswer (data) {
    if (data.session.id === room.session.id) {
      setRoom({
        ...room,
        reponses: data.reponses
      })
    }
  }

  function QuestionUpdate (data: NewQuestion) {
    if (room.session && room.session.id === data.session.id) {
      setRoom({
        ...room,
        locked: false,
        waiting: false,
        session: {
          ...room.session,
          question: data.session.question
        },
        reponses: []
      })
    }
  }

  function ResponseOfAnswerSending (data) {
    setRoom({
      ...room,
      session: data.session,
      waiting: data.waiting
    })
  }

  socket.on('QuestionUpdate', QuestionUpdate)
  socket.on('LockAnswer', LockAnswer)
  socket.on('ShowAnswer', ShowAnswer)
  socket.on('ResponseOfAnswerSending', ResponseOfAnswerSending)

  socket.on('StopSession', StopSession)
  socket.on('StartSession', StartSession)
  socket.on('JoinSuccessful', JoinSuccess)

  useEffect(() => {
    if (user) {
      socket.emit('UserJoinEvent', {
        user,
        code: code
      })
    }

  }, [])

  return (
    <RoomContext.Provider value={[room, setRoom]}>
      <div className="bg-white h-full min-h-screen overflow-hidden">
        { room.session && room.session.question
          ? <>
             <Question />
          </>
          : <WaintingRoom />

        }
      </div>
    </RoomContext.Provider>
  )
}