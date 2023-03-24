import useSessions from "../../../../hooks/use-sessions";
import Manager from "../../../../layouts/manager";
import {useLocation} from "react-router-dom";
import Board from "../../../../components/manager/board/Board";
import {IQuestion, ISession} from "../../../../utils";
import {Options} from "../../../../components/manager/board/types";
import {uid} from "../../../../utils/helper";
import QuestionStat from "../../../../components/manager/sessions/stats/panel/ShowQuestionStat";
import {useEffect, useState} from "react";
import SessionContext from "../../../../contexts/SessionContext";

const pages = [
  { label: 'Home', href: '/manager/qcm', current: false},
  { label: 'Questions', href: '/manager/qcm/questions', current: false},
  { label: 'Etiquettes', href: '/manager/qcm/etiquettes', current: false},
  { label: 'Séquences', href: '/manager/qcm/sequences', current: false},
  { label: 'Sessions', href: '/manager/qcm/sessions', current: true},
]

export default function ShowSession () {
  const { show } = useSessions()
  const location = useLocation()
  const [session, setSession] = useState<ISession | null>(null)
  const li = location.pathname.split('/')
  const { data } = show(li[li.length-1])

  const options: Options<IQuestion> = {
    filter: {
      uid: uid(),
      conjunction: 'and',
      conditions: []
    },

    data: data,
    view: 'galerie',
    label: 'Questions',
    search: '',
    structure: [],
    keys: ['label'],
    open: false,
    option: []
  }

  useEffect(() => {
    if (data) {
      setSession(data)
    }
  }, [data])

  return (
    <Manager layout={{
      label: 'Session',
      location: [],
      navigation: pages
    }}>
      <SessionContext.Provider value={[session, setSession]}>
        <>
          { data &&
            <div>
              <div>
                LISTE
              </div>

              <div>

                <Board<IQuestion> name={"Questions"} options={options}>
                  <div className="grid grid-cols-4 gap-4 p-4">
                    { data.sequence.questions.map((item) => (
                      <QuestionStat question={item} />
                    ))}
                  </div>

                </Board>
              </div>
            </div>
          }

        </>
      </SessionContext.Provider>


    </Manager>
  )
}