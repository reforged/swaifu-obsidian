import Manager from "../../../../layouts/manager";
import useSessions from "../../../../hooks/use-sessions";
import Board from "../../../../components/manager/board/Board";
import {Options} from "../../../../components/manager/board/types";
import {ISession, IUser} from "../../../../utils";
import {uid} from "../../../../utils/helper";
import SessionContext from "../../../../contexts/SessionContext";
import {useEffect, useState} from "react";
import CreateSession from "../../../../components/manager/sessions/create-session";
import {StructureContract} from "../../../../contexts/BoardContext";
import Table from "../../../../components/manager/board/Table";
import UserSkeleton from "../../../../skeleton/UserSkeleton";
import {logger} from "react-query/types/react/logger";
import {useNavigate} from "react-router";
import RoomContext from '../../../../contexts/RoomContext'
import {IRoom} from "../../../../utils/room";
import {NewAnswerEvent} from "../../../../components/manager/sessions/types/events";
import useWebsocket from "../../../../hooks/use-websocket";
const pages = [
  { label: 'Home', href: '/manager/qcm', current: false},
  { label: 'Questions', href: '/manager/qcm/questions', current: false},
  { label: 'Etiquettes', href: '/manager/qcm/etiquettes', current: false},
  { label: 'Séquences', href: '/manager/qcm/sequences', current: false},
  { label: 'Sessions', href: '/manager/qcm/sessions', current: true},
  { label: 'Examens', href: '/manager/qcm/examens', current: false},
]

const navigation = [
  {name: "QCM", href: '/manager/qcm/home', current: false},
  {name: "Sessions", href: '/manager/qcm/sessions', current: true},
]

export default function HomeSessions () {
  const { index } = useSessions()
  const { data, isLoading } = index()
  const [session, setSession] = useState<ISession | null>(null)
  const [room, setRoom] = useState<IRoom>({
    session: session,
    locked: false,
    waiting: false
  })
  const router = useNavigate()
  const { socket } = useWebsocket()

  useEffect(() => {
    if (session && !room.session) {
      setRoom({
        ...room,
        session
      })
    }
  }, [session])

  function startSession (data) {
    setRoom({
      ...room,
      session: data.session
    })
  }

  useEffect(() => {

  }, [])

  const columns: StructureContract[] = [
    {label: "Code", key: 'code', input: 'text', checked: true, default: true, filter: true},
    {label: "Users", key: 'users', input: 'select', checked: true, default: false, filter: false},
    {label: "Reponses", key: 'reponses', input: 'select', checked: true, default: false, filter: false},
  ]

  function NewUser (data) {
    if (!room.session) return
    if (room.session.id === data.session.id) {
      setRoom({
        ...room,
        session: data.session
      })
    }
  }

  function NewAnswer (data: NewAnswerEvent) {
    if (!room.session) return

    if (room.session.id === data.session.id) {
      setRoom({
        ...room,
        session: data.session
      })
    }
  }



  useEffect(() => {
    socket.on('NewUser', NewUser)
    socket.on('NewAnswer', NewAnswer)
    socket.on('StartSession', startSession)
    console.log("TEST SESSION PROFESSEUR")
    return () => {
      socket.off('NewUser')
      socket.off('NewAnswer')
      socket.off('StartSession')
    }
  })

  const options: Options<ISession> = {
    label: 'Session',
    view: 'galerie',
    data: data,
    filter: {
      uid: uid(),
      conjunction: 'and',
      conditions: []
    },
    search: '',
    structure: [],
    keys: ['code'],
    option: [],
    rowAction: (item: any) => {
      router(`/manager/qcm/session/${item.id}`)
    },
    open: false
  }
  return (
    <Manager layout={{
      label: 'Sessions',
      location: navigation,
      navigation: pages
    }}>
      <SessionContext.Provider value={[session, setSession]}>
        <RoomContext.Provider value={[room, setRoom]}>
          { data &&
            <Board name={"Session"} options={options} action={<CreateSession />}>
              <Table<ISession>
                columns={columns}
                loading={isLoading}
                data={data as ISession[]}
                keys={options.keys}
                skeleton={<UserSkeleton />}
                onDelete={() => console.log("test")}
              />
            </Board>
          }
        </RoomContext.Provider>

      </SessionContext.Provider>

    </Manager>
  )
}