import Manager from "../../../../layouts/manager";
import useSessions from "../../../../hooks/use-sessions";
import Board from "../../../../components/manager/board/Board";
import {Options} from "../../../../components/manager/board/types";
import {ISession} from "../../../../utils";
import {uid} from "../../../../utils/helper";
import SessionContext from "../../../../contexts/SessionContext";
import {useState} from "react";
import CreateSession from "../../../../components/manager/sessions/create-session";

const pages = [
  { label: 'Home', href: '/manager/qcm', current: false},
  { label: 'Questions', href: '/manager/qcm/questions', current: false},
  { label: 'Etiquettes', href: '/manager/qcm/etiquettes', current: false},
  { label: 'Séquences', href: '/manager/qcm/sequences', current: false},
  { label: 'Sessions', href: '/manager/qcm/sessions', current: true},
]

export default function HomeSessions () {
  const { index } = useSessions()
  const { data, isLoading } = index()
  const [session, setSession] = useState<ISession | null>(null)

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
    option: ['filter'],
    open: false
  }
  return (
    <Manager layout={{
      label: 'Sessions',
      location: [],
      navigation: pages
    }}>
      <SessionContext.Provider value={[session, setSession]}>
        <Board name={"Session"} options={options} action={<CreateSession />}>
          lorem
        </Board>
      </SessionContext.Provider>

    </Manager>
  )
}