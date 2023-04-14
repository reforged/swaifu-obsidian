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
  const [room, setRoom] = useState<IRoom>()
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

    console.log("JOIN SUCCESS", data, room)

    setRoom({
      ...room!,
      session: data.session,
      waiting: !!reponse,
    })

    socket.off('JoinSuccessful')
  }

  function StartSession (data) {
    console.log("START SESSION", data, room)
    if (data.session.code === code) {
      console.log(data)
      setRoom({
        ...room!,
        session: data.session,
      })
    }
  }

  function StopSession () {
    router('/')
  }

  function LockAnswer (data: LockEvent) {
    console.log("LOCK ANSWER", data, room)
    setRoom({
      session: data.session,
      locked: data.locked,
    })
    /*if (room.session && data.session.id === room.session.id) {
      console.log(data, room)
      setRoom({
        ...room!,
        locked: data.locked
      })
    }*/
  }

  function ShowAnswer (data) {
    console.log(data, room)
    if (!room) {
      setRoom({
        session: data.session,
        reponses: data.reponses,
        waiting: false,
        locked: false,
        question: data.session.question
      })
    } else {
      if (room.session && data.session.id === room.session.id) {
        setRoom({
          session: data.session,
          reponses: data.reponses,
          waiting: room.waiting ? room.waiting : false,
          locked: room.locked ? room.locked : false,
          question: data.session.question
        })
      }
    }
  }

  function QuestionUpdate (data: NewQuestion) {
    console.log("QUESTION UPDATE", data, room)
    setRoom({
      locked: false,
      waiting: false,
      session: data.session,
      reponses: []
    })
    /*
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
    }*/
  }



  useEffect(() => {
    socket.connect()
    socket.on('QuestionUpdate', QuestionUpdate)
    socket.on('LockAnswer', LockAnswer)
    socket.on('ShowAnswer', ShowAnswer)


    socket.on('StopSession', StopSession)
    socket.on('StartSession', StartSession)
    socket.on('JoinSuccessful', JoinSuccess)

    return () => {
      socket.off('QuestionUpdate')
      socket.off('LockAnswer')
      socket.off('ShowAnswer')
     // socket.off('ResponseOfAnswerSending')

      socket.off('StopSession')
      socket.off('StartSession')
      socket.off('JoinSuccessful')
    }
  }, [])

  useEffect(() => {
    console.log("ROOM", room)
  }, [room])


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
        { room && room.session && room.session.question
          ? <>
             <Question />
          </>
          : <WaintingRoom />

        }
      </div>
    </RoomContext.Provider>
  )
}