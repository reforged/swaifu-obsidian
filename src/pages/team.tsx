import Navbar from "../components/diamond/Navbar";
import React, {useState} from "react";

const stats = [
  { label: 'Plus de 30.000 lignes de code on était écrite pour ce projet', value: '30k lignes' },
  { label: 'Vous aimerez acquérir ce magnifique site de question ?', value: "$9k c'est kdo" },
  { label: 'Nous comptons plus de 4.500 utilisateurs actifs avec plus de deux cents professeur inscrits !!', value: 'Une grande communauté' },
]

const footerNavigation = {
  main: [
    { name: 'Accueil', href: '/' },
    { name: 'Équipe', href: '/team' },
  ],
  social: [
    {
      name: 'GitHub',
      href: 'https://github.com/reforged',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },

  ],
}

const team = [
  {
    name: 'Bonnal Nathaël',
    role: 'Lead Front-End / Full-Stack Developer',
    imageUrl:
      'https://avatars.githubusercontent.com/u/64804778?s=96&v=4',
  },
  {
    name: 'Hawkins Oscar',
    role: 'Lead Back-End / Full-Stack Developer',
    imageUrl:
      'https://avatars.githubusercontent.com/u/45915005?s=96&v=4',
  },
  {
    name: 'Alfonsi Loïc',
    role: 'Front-End Developer',
    imageUrl:
      'https://avatars.githubusercontent.com/u/97971973?s=120&v=4',
  },
  {
    name: 'Guibert-Lode Titouan',
    role: 'Back-End Developer',
    imageUrl:
      'https://avatars.githubusercontent.com/u/79847323?s=96&v=4',
  },

]

export default function TeamPage () {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <div>
      <div className="relative isolate overflow-hidden bg-white">
        <Navbar open={open} setOpen={setOpen} />

        <main className="isolate py-8">
          <Header />
          <ContentSection />

          <div className="mt-32 sm:mt-40 xl:mx-auto xl:max-w-7xl xl:px-8">
            <img
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
              alt=""
              className="aspect-[5/2] w-full object-cover xl:rounded-3xl"
            />
          </div>

          <TeamSection />

          <Footer />
        </main>
      </div>
    </div>
  )
}
function Header () {
  return (
    <div className="relative isolate -z-10">
      <svg
        className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
            width={200}
            height={200}
            x="50%"
            y={-1}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
          <path
            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
            strokeWidth={0}
          />
        </svg>
        <rect width="100%" height="100%" strokeWidth={0} fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)" />
      </svg>
      <div
        className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
        aria-hidden="true"
      >
        <div
          className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              'polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)',
          }}
        />
      </div>
      <div className="overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-12">
          <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
            <div className="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Une équipe de choc
              </h1>
              <p className="relative mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
                Une petite équipe de 4 étudiants en Licence Informatique à Montpellier qui se sont
                regroupés pour développer une application web pour concevoir des questions ! L'ambiance
                rôde et les lignes fusent !
              </p>
            </div>
            <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
              <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
                    alt=""
                    className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                </div>
              </div>
              <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1485217988980-11786ced9454?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
                    alt=""
                    className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                </div>
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-x=.4&w=396&h=528&q=80"
                    alt=""
                    className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                </div>
              </div>
              <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1670272504528-790c24957dda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=left&w=400&h=528&q=80"
                    alt=""
                    className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                </div>
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1670272505284-8faba1c31f7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
                    alt=""
                    className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
function ContentSection () {
  return (
    <div className="mx-auto -mt-12 max-w-7xl px-6 sm:mt-0 lg:px-8 xl:-mt-8">
      <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Notre mission</h2>
        <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
          <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
            <p className="text-xl leading-8 text-gray-600">
              Au vu d'un projet programmation à l'Université de Montpellier, nous avons dû concevoir une application web
              permettant de créer des questions, et pouvoir lancer des "sessions" en direct !
            </p>
            <div className="mt-10 max-w-xl text-base leading-7 text-gray-700">
              <p>
                Dans un optique de "perfection", chacun des membres des deux équipes ont conçu
                diverses fonctionnalités, et implémenter une architecture scalable et performante.
              </p>
              <p className="mt-4">
                La création d'une nouvelle couche d'abstraction côté server par <a href="" className="udnerline text-indigo-500">Oscar Hawkins</a> afin
                d'optimiser l'ensemble de ce dernier, et faciliter le développement comme la création d'un router, et d'un ORM
                au style de AdonisJS comme base de référence.
              </p>
              <p className="mt-4">
                Pour le client, l'utilisation de React et Typescript ont permis de pouvoir développer une multitude
                de composants et permettre d'être plus scalable sur l'ensemble de l'application. Des composants comme le système de filtre,
                le système de gestions de données dynamique ou encore le "notion-like" pour la création de questions créé par <a
                href="https://github.com/NathaelB" target="_blank" className="text-indigo-500">Nathaël Bonnal</a>.
              </p>
              <p className="mt-10">
                A travers ce projet, <span className="text-indigo-500">Loïc Alfonsi</span> et <span className="text-indigo-500">Guibert-Lode Titouan</span> ont pu
                découvrir davantage le domaine du web et plus particulièrement du développement front-end et développement back-end. Chacun ont contribués sur leurs
                tâches respectifs tout en apprenant  avec le lead de chaque équipe.
              </p>
            </div>
          </div>
          <div className="lg:flex lg:flex-auto lg:justify-center">
            <dl className="w-64 space-y-8 xl:w-80">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse gap-y-4">
                  <dt className="text-base leading-7 text-gray-600">{stat.label}</dt>
                  <dd className="text-5xl font-semibold tracking-tight text-gray-900">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}

function TeamSection () {
  return (
    <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-48 lg:px-8">
      <div className="mx-auto max-w-2xl lg:mx-0">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Notre équipe</h2>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Chez Reforged, nous nous consacrons à fond pour développer le projet à la hauteur des attentes.
        </p>
      </div>
      <ul
        role="list"
        className="mx-auto mt-20 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-4 xl:grid-cols-4"
      >
        {team.map((person) => (
          <li key={person.name}>
            <img className="mx-auto h-24 w-24 rounded-full" src={person.imageUrl} alt="" />
            <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">{person.name}</h3>
            <p className="text-sm leading-6 text-gray-600">{person.role}</p>
          </li>
        ))}
      </ul>
      <div className="w-4/5 lg:w-3/5 mx-auto mt-8">
        <img className="rounded-md" src="https://media.discordapp.net/attachments/1052152529682710558/1092376669144236072/IMG_1147.png?width=1444&height=1424" alt=""/>
      </div>
    </div>
  )
}

function Footer () {
  return (
    <footer className="mx-auto mt-20 max-w-7xl overflow-hidden px-6 pb-20 sm:pb-24 lg:px-8">
      <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
        {footerNavigation.main.map((item) => (
          <div key={item.name} className="pb-6">
            <a href={item.href} className="text-sm leading-6 text-gray-600 hover:text-gray-900">
              {item.name}
            </a>
          </div>
        ))}
      </nav>
      <div className="mt-10 flex justify-center space-x-10">
        {footerNavigation.social.map((item) => (
          <a key={item.name} href={item.href} className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">{item.name}</span>
            <item.icon className="h-6 w-6" aria-hidden="true" />
          </a>
        ))}
      </div>
      <p className="mt-10 text-center text-xs leading-5 text-gray-500">
        &copy; 2023 Reforged, Inc. All rights reserved.
      </p>
    </footer>
  )
}