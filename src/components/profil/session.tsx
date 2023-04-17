import {ISession} from "../../utils";
import {
  QrCodeIcon,
  QuestionMarkCircleIcon,
  UsersIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import { DateTime } from 'luxon'
import useComponentVisible from "../../hooks/useComponentVisible";
import {AnimatePresence, motion} from "framer-motion";
import {useEffect, useState} from "react";
import {Pie} from "react-chartjs-2";
import {classNames} from "../../utils/helper";
import { ResponsivePie } from '@nivo/pie'
import PieChart from "../manager/charts/pie";

type Props = {
  session: ISession
}

const data = [
  {
    "id": "elixir",
    "label": "elixir",
    "value": 42,
    "color": "hsl(93, 70%, 50%)"
  },
  {
    "id": "php",
    "label": "php",
    "value": 540,
    "color": "hsl(179, 70%, 50%)"
  },
  {
    "id": "sass",
    "label": "sass",
    "value": 217,
    "color": "hsl(327, 70%, 50%)"
  },
  {
    "id": "hack",
    "label": "hack",
    "value": 50,
    "color": "hsl(87, 70%, 50%)"
  },
  {
    "id": "rust",
    "label": "rust",
    "value": 103,
    "color": "hsl(59, 70%, 50%)"
  }
]

export default function Session ({ session }: Props) {
  const { ref, toggle, isVisible} = useComponentVisible()
  const [stats, setStats] = useState<any[]>()

  useEffect(() => {
    const li = session.reponses.map((item) => {
      if (item.valide) return 1
      else return 0
    })
    const res = li.reduce((acc, cur) => acc+=cur, 0)

    setStats([
      {
        id: `Bonne réponse`,
        label: `Bonne réponse`,
        value: res,
      },
      {
        id: `Mauvaise réponse`,
        label: `Mauvaise réponse`,
        value: session.reponses.length - res,
      },
    ])
  }, [])
  return (
    <div>
      <button className="block hover:bg-gray-50 w-full" onClick={toggle}>
        <div className="px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <p className="truncate text-sm font-medium text-indigo-600">{ session.sequence.label}</p>
            <div className="ml-2 flex flex-shrink-0">
              <p
                className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">Données disponibles</p>
            </div>
          </div>
          <div className="mt-2 sm:flex sm:justify-between">
            <div className="flex gap-4">
              <p className="flex items-center text-sm text-gray-500">
                <QrCodeIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"/>
                { session.code }
              </p>
              <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                <UsersIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" />
                { session.users.length } participants
              </p>
              <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                <QuestionMarkCircleIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" />
                { session.sequence.questions.length } questions
              </p>
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
              <svg className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20"
                   fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd"
                      d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"
                      clipRule="evenodd"/>
              </svg>
              <p>
                <time dateTime="2020-01-07">{ DateTime.fromISO(session.created_at).toLocaleString(DateTime.DATETIME_MED)}</time>
              </p>
            </div>
          </div>
        </div>
      </button>
      <AnimatePresence>
        {
          isVisible &&

          <motion.div
            className="fixed z-20 inset-0 bg-black bg-opacity-25"
            animate={{ opacity: 1}}
            transition={{
              duration: 0.2,
              ease: [0.5, 0.71, 1, 1.5]
            }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
          >
            <div className="p-4 bottom-0 h-full p-4">
              <div className="bg-white rounded-md lg:w-3/5 mx-auto p-12 h-full relative overflow-y-scroll" ref={ref}>
                <div className="absolute top-0 right-0 p-2">
                  <button
                    className="bg-gray-100 p-1 rounded-md"
                    onClick={toggle}
                  >
                    <span>
                      <XMarkIcon className="w-5 h-5 text-gray-400" />
                    </span>
                  </button>
                </div>
                <div className="">
                  <div>
                    <h1>{ session.sequence.label}</h1>
                  </div>
                  <span className="text-sm text-gray-600">Vos réponses</span>
                  <div className="flex flex-col gap-2 pt-4">
                    { session.reponses.map((reponse) => (
                      <div
                        className={classNames(
                          'border rounded-md p-2',
                          reponse.valide ? 'bg-green-200' : 'bg-gray-100'
                        )}
                        key={reponse.id}
                      >
                        { reponse.body }
                      </div>
                    ))}
                  </div>


                  { stats &&
                    <div className="mt-8 w-full h-64 lg:h-96 mx-auto">
                      <PieChart data={stats} />
                    </div>
                  }

                </div>


              </div>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </div>

  )
}
