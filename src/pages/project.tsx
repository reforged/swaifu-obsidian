import {useState} from "react";
import Navbar from "../components/diamond/Navbar";
import Footer from "../components/diamond/Foooter";


const timeline = [
  {
    name: 'Obsidian',
    description:
      "Obsidian est notre package qui regroupe l'ensemble de notre application React.",
    date: 'Janvier 2023',
    link: 'https://github.com/reforged/swaifu-obsidian',
    dateTime: '2023-01',
  },
  {
    name: 'Ruby',
    description:
      'Ruby ',
    date: 'Janvier 2023',
    link: 'https://github.com/reforged/sawifu-ruby',
    dateTime: '2023-01',
  },
  {
    name: 'Release Logic',
    description:
      "@reforged/logic est l'un de nos packages, celui-ci permet de façon simple et facile de filtrer des jeux de données",
    date: 'Avril 2023',
    link: 'https://github.com/reforged/logic',
    dateTime: '2023-04',
  },
  {
    name: 'Engine',
    description:
      "Sera notre orchestrateur qui nous permettra de pouvoir gérer l'ensemble de nos applications de façon simple et rapide ⚡️",
    date: 'Prochainement',
    dateTime: '????-??',
  },
]

export default function ProjectPage () {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <div>
      <div className="bg-white relative w-full">
        <Navbar open={open} setOpen={setOpen} />

        <main className="isolate">
          <div className="relative isolate -z-10 overflow-hidden bg-gradient-to-b from-indigo-100/20 pt-14">
            <div
              className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96"
              aria-hidden="true"
            />
            <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
                <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:col-span-2 xl:col-auto">
                  Découvrez les différents projets auxquels Reforged participe.
                </h1>
                <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
                  <p className="text-lg leading-8 text-gray-600">
                    Des projets qui tournent autour de la tech, on peut retrouver des packages pour des applications React, des packages pour faciliter
                    la mise en service de nos produits et de nos fonctionnalités.
                    Tout au long de la création de nos différents projets, l'objectif est de simplifier nos tâches et de rendre notre travail
                    accessible à tous, en libre-service.
                  </p>
                </div>
                <img
                  src="https://api.duniagames.co.id/api/content/upload/file/7701750471568113171.jpg"
                  alt=""
                  className="mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
                />
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
          </div>

          <Timeline />
        </main>

        <Footer />
      </div>
    </div>
  )
}

function Timeline () {
  return (
    <div className="mx-auto -mt-8 max-w-7xl px-6 lg:px-8">
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-4">
        {timeline.map((item) => (
          <a key={item.name} href={item.link} target={"_blank"}>
            <time
              dateTime={item.dateTime}
              className="flex items-center text-sm font-semibold leading-6 text-indigo-600"
            >
              <svg viewBox="0 0 4 4" className="mr-4 h-1 w-1 flex-none" aria-hidden="true">
                <circle cx={2} cy={2} r={2} fill="currentColor" />
              </svg>
              {item.date}
              <div
                className="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0"
                aria-hidden="true"
              />
            </time>
            <div className="transition ease-in-out duration-75 hover:bg-zinc-100 p-4 rounded-md  mt-4">
              <p className=" text-lg font-semibold leading-8 tracking-tight text-gray-900">{item.name}</p>
              <p className="mt-1 text-base leading-7 text-gray-600">{item.description}</p>
            </div>

          </a>
        ))}
      </div>
    </div>
  )
}