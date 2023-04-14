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
import ActiveUsersStats from "./active-users-stats";

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
  const [navigation, setNavigation] = useState<any[]>([])
  const li = location.pathname.split('/')
  const { data } = show(li[li.length-1])

  useEffect(() => {
    console.log(data)
    if (data) {
      setNavigation([
        {name: "QCM", href: '/manager/qcm/home', current: false},
        {name: "Sessions", href: '/manager/qcm/sessions', current: false},
        {
          name: data.id, href: `/manager/qcm/session/${data.id}`, current: true
        }
      ])
    }

  }, [data])

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
  console.log()

  return (
    <Manager layout={{
      label: 'Session',
      location: navigation,
      navigation: pages
    }}>
      <SessionContext.Provider value={[session, setSession]}>
        <>
          { data &&
            <div>
              <div>
                LISTE
              </div>
              <div className="w-full h-96">
                <ActiveUsersStats data={[
                  {
                    "id": "Participants",
                    "color": "hsl(126, 70%, 50%)",
                    data: data.sequence.questions.map((question) => {
                      return {
                        "x": question.label,
                        "y": data.reponses.filter((item) => item.question_id === question.id).length
                      }
                    })
                  }
                ]} />
              </div>


              <div>

                <Board<IQuestion> name={"Questions"} options={options}>
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 p-4">
                    { data.sequence.questions.map((item) => (
                      <QuestionStat question={item} key={item.id} />
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