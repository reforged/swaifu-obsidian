import {useContext, useEffect, useRef, useState} from "react";
import { RadioGroup } from "@headlessui/react";
import RoomContext from "../../contexts/RoomContext";
import {classNames} from "../../utils/helper";
import Fence from "../manager/Fence";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import ReactMarkdown from "react-markdown";
import ShowEnonce from "../manager/sessions/panel/question/show-enonce";
import {io} from "socket.io-client";
import AuthenticationContext from "../../contexts/AuthenticationContext";
import {useCookies} from "react-cookie";
import {LockEvent, NewQuestion} from "../../utils/room/events";
import useAutosizeTextArea from "../../hooks/use-autosize-text-area";

export default function Question () {
  const [room, setRoom] = useContext(RoomContext)
  const [selected, setSelected] = useState()
  const [cookie, setCookie] = useCookies(['room'])
  const [user, setUser] = useContext(AuthenticationContext)
  const [value, setValue] = useState<string>('')
  const [disabled, setDisabled] = useState<boolean>(true)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  useAutosizeTextArea(textAreaRef.current, value)
  const socket = io('ws://localhost:3333')

  function submitAnswer () {
    console.log(value)
    socket.emit('send_answer', {
      user: user,
      question: room.session.question,
      reponse: room.session.question.type === 'input' ? value : selected,
      session: room.session
    })
  }

  useEffect(() => {
    console.log(selected)
  }, [selected])

  useEffect(() => {
    if (room.session && room.session.question && room.session.reponses) {
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

      if (reponse) {
        setSelected(reponse)
      }
    }


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
    if (room.session && room.session.id === data.session.id) {
      setRoom({
        ...room,
        locked: false,
        wainting: false,
        session: {
          ...room.session,
          question: data.question,
        },
        reponses: []
      })
    }
  })

  socket.on('lock_answer', (data: LockEvent) => {
    if (room.session && data.session.id === room.session.id) {
      setRoom({
        ...room,
        locked: data.locked
      })
    }
  })

  socket.on('show_answer', (data) => {
    console.log(data.session.id, room.session.id)
    if (data.session.id === room.session.id) {
      console.log(data)
      console.log(room)
      setRoom({
        ...room,
        reponses: data.reponses
      })
    }
  })

  useEffect(() => {
    if (room.wainting) {
      setDisabled(true)
      return
    }
    if (!room.session) return
    if (room.session.question.type === 'input') {
      if (value) setDisabled(false)
      else setDisabled(true)
    } else {
      if (selected) setDisabled(false)
      else setDisabled(true)
    }
  }, [value, room.wainting, selected])


  return (
    <>
      { room.session &&
        <div className="p-8 flex flex-col gap-6 max-w-3xl mx-auto">
          {
            room.session.question && <ShowEnonce question={room.session.question} />
          }


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
            {room.reponses && room.reponses.length ?
              <div className="flex flex-col gap-4">
                { room.reponses.map((reponse) => (
                  <div
                    className={classNames(
                      'relative block cursor-pointer rounded-lg border  px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between',
                      reponse.valide ? 'bg-green-200' : 'bg-red-200'
                    )}
                  >
                    <ReactMarkdown
                      children={reponse.body}
                      components={{
                        code: ({node, ...props}) => Fence({children: props})
                      }}
                      remarkPlugins={[remarkMath]}
                      rehypePlugins={[rehypeKatex]}
                    />
                  </div>
                ))}
              </div>
              :
              <div>
                <div>
                  {room.session.question.type === 'input'

                    ? <div>

                      <textarea
                        className="w-full"
                        ref={textAreaRef}
                        value={value}
                        onChange={(event) => setValue(event.currentTarget.value)}
                      />

                    </div>
                    :
                    <div>
                      <RadioGroup value={selected} onChange={setSelected}>
                        <div className="space-y-4">
                          {room.session!.question!.reponses.map((reponse, key) => (
                            <RadioGroup.Option
                              disabled={room.wainting}
                              key={key}
                              value={reponse}
                              className={({checked, active}) =>
                                classNames(
                                  checked ? 'border-transparent bg-indigo-50' : 'border-gray-300',
                                  active ? 'border-indigo-600 ring-2 ring-indigo-600' : '',
                                  'relative block cursor-pointer rounded-lg border  px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between'
                                )
                              }
                            >
                              {({active, checked}) => (
                                <>
                                  <ReactMarkdown
                                    children={reponse.body}
                                    components={{
                                      code: ({node, ...props}) => Fence({children: props})
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



                  }
                  <div>
                    <button
                      className={classNames(
                        'w-full p-4 rounded-md border bg-indigo-500 text-white',
                        disabled ? '!bg-gray-100 !text-gray-600' : ''
                      )}
                      disabled={disabled}
                      onClick={submitAnswer}
                    >
                      Envoyer sa réponse
                    </button>
                  </div>
                </div>


              </div>
            }
          </div>


        </div>
      }
    </>

  )
}