import {useLocation} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {io} from "socket.io-client";
import AuthenticationContext from "../contexts/AuthenticationContext";
import RoomContext from "../contexts/RoomContext";
import {useNavigate} from "react-router";
import {IRoom} from "../utils/room";
import {ISession} from "../utils";
import WaintingRoom from "../components/room/wainting-room";
import {JoinEvent, JoinSuccessfulEvent, StartEvent} from "../utils/room/events";
import Question from "../components/room/question";
import {useCookies} from "react-cookie";

export default function Room () {
  const [cookie, setCookie, removeCookie] = useCookies(['room'])
  const [room, setRoom] = useState<IRoom>({
    locked: false,
    session: null,
    wainting: false
  })
  const location = useLocation()
  const router = useNavigate()
  const [code, setCode] = useState<string>(location.pathname.split("/")[2])
  const [user, setUser] = useContext(AuthenticationContext)

  const socket = io("ws://localhost:3333")

  useEffect(() => {
    if (code && user) {
      socket.emit('session_connexion', {
        user,
        code: code
      })

      socket.on('error', async (data) => {
        if (data.code === code) {
          router('/')
        }
      })

      socket.on('join_success', async (data: JoinSuccessfulEvent) => {
        const question = data.session.question
        const userReponses = data.session.reponses.filter((item) => item.user_id === user.id)
        const reponse = question.reponses.find((item) => {
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
          wainting: !!reponse
        })

      })
    }
  }, [code, user])

  socket.on('session_deleted', () => {
    router('/')
  })

  socket.on('start_session', async (data: StartEvent) => {
    if (data.session.code === code) {
      setRoom({
        ...room,
        session: data.session,
        question: data.question
      })
    }
  })

  useEffect(() => {
    console.log(room)
  }, [room])

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