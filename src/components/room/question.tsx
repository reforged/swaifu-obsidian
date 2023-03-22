import {useContext, useEffect, useState} from "react";
import { RadioGroup } from "@headlessui/react";
import RoomContext from "../../contexts/RoomContext";
import {classNames} from "../../utils/helper";
import Fence from "../manager/Fence";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import ReactMarkdown from "react-markdown";
import ShowEnonce from "../manager/sessions/panel/question/show-enonce";
import {io} from "socket.io-client";
import {AuthenticationContext} from "../../contexts/AuthenticationContext";
import {useCookies} from "react-cookie";
import {LockEvent, NewQuestion} from "../../utils/room/events";

export default function Question () {
  const [room, setRoom] = useContext(RoomContext)
  const [selected, setSelected] = useState()
  const [cookie, setCookie] = useCookies(['room'])
  const {user, setUser} = useContext(AuthenticationContext)
  const socket = io('ws://localhost:3333')
  console.log("session:", room.session)
  function submitAnswer () {
    console.log("selected", selected)
    socket.emit('send_answer', {
      user: user,
      question: room.session.question,
      reponse: selected,
      session: room.session
    })
  }

  useEffect(() => {
  }, [selected])

  useEffect(() => {

    const question = room.session.question
    const userReponses = room.session.reponses.filter((item) => item.user_id === user.id)
    const reponse = question.reponses.find((item) => {
      let value
      userReponses.forEach((a) => {
        if (a.question_id === question.id) {
          if (item.body === a.body) value = item
        }
      })
      return value
      /*for (let i = 0; i < usersReponses.length ; i++) {
        console.log("user réponse:", usersReponses[i])
        if (usersReponses[i].question_id === question.id) {
          console.log("test in boucle")
          if (item.body === usersReponses[i].body) return item
        }
      }*/
    })

    console.log(reponse)
    if (reponse) {
      setSelected(reponse)
    }
    console.log(room)

  }, [room])

  socket.on('response_of_answer_sending', (data) => {
    console.log(data)
    setRoom({
      ...room,
      session: data.session,
      wainting: data.wainting
    })
  })

  socket.on('new_question', (data: NewQuestion) => {
    console.log(data, room.session)
    if (room.session && room.session.id === data.session.id) {
      console.log(data)
      setRoom({
        ...room,
        wainting: false,
        question: data.question
      })
    }

  })

  socket.on('lock_answer', (data: LockEvent) => {
    console.log(data)
    if (room.session && data.session.id === room.session.id) {
      console.log(data)
      setRoom({
        ...room,
        locked: data.locked
      })
    }
  })


  return (
    <div className="p-8 flex flex-col gap-6 max-w-3xl mx-auto">


      <ShowEnonce question={room.session!.question!} />

      <div className="text-gray-600">
        { room.locked ?
          <div>
            <span></span>
            <span className="">Heads up, voting is closed</span>
          </div>
          : room.wainting &&
          <div>
            <span></span>
            <span className="">Wainting for the next clap</span>
          </div>
        }
      </div>
      <div>
        <RadioGroup value={selected} onChange={setSelected}>
          <div className="space-y-4">
            {room.session!.question!.reponses.map((reponse, key) => (
              <RadioGroup.Option
                disabled={room.wainting}
                key={key}
                value={reponse}
                className={({ checked, active }) =>
                  classNames(
                    checked ? 'border-transparent bg-indigo-50' : 'border-gray-300',
                    active ? 'border-indigo-600 ring-2 ring-indigo-600' : '',
                    'relative block cursor-pointer rounded-lg border  px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between'
                  )
                }
              >
                {({ active, checked }) => (
                  <>
                    <ReactMarkdown
                      children={reponse.body}
                      components={{
                        code: ({node, ...props}) => Fence({ children: props})
                      }}
                      remarkPlugins={[remarkMath]}
                      rehypePlugins={[rehypeKatex]}
                    />
                    <span
                      className={classNames(
                        active ? 'border' : 'border-2',
                        checked ? 'border-indigo-600' : 'border-transparent',
                        'pointer-events-none absolute -inset-px rounded-lg'
                      )}
                      aria-hidden="true"
                    />
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>

      <div>
        <button
          className={classNames(
            selected ? 'bg-indigo-500 text-white' : 'bg-gray-100',
            'w-full p-4 rounded-md border',
            room.wainting ? '!bg-gray-100 !text-gray-600' : ''
          )}
          disabled={!selected || room.wainting}
          onClick={submitAnswer}
        >
          Envoyer sa réponse
        </button>
      </div>

    </div>
  )
}