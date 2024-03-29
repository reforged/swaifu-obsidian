import React, {useEffect, useState} from 'react'
import {Route, Routes} from 'react-router'
import Home from './pages/manager'
import Layout from './layouts/layout'
import HomeEtiquette from './pages/manager/qcm/etiquettes'
import HomeQuestion from './pages/manager/qcm/questions'
import Login from './pages/auth/login'
import AuthenticationContext from './contexts/AuthenticationContext'
import { EtiquettesContext } from './contexts/EtiquettesContext'
import {IEtiquette, IUser} from './utils'
import Index from './pages'
import Auth from './layouts/auth'
import ProfilHome from './pages/profil'
import HomeUsers from './pages/manager/comptes/users'
import HomeSequence from './pages/manager/qcm/sequences'
import HomeQCM from './pages/manager/qcm'
import HomeComptes from './pages/manager/comptes'
import NavigationContext , {NavigationContract} from './contexts/NavigationContext'
import { HomeIcon, UserGroupIcon, ListBulletIcon} from '@heroicons/react/24/solid'
import {FolderIcon} from "@heroicons/react/24/outline";
import HomeRoles from "./pages/manager/comptes/roles";
import HomePermissions from "./pages/manager/comptes/permissions";
import HomeSessions from "./pages/manager/qcm/sessions";
import Room from "./pages/room";
import Register from "./pages/auth/register";
import ShowSession from "./pages/manager/qcm/sessions/show";
import HomeExamen from "./pages/manager/qcm/examens";
import useWebsocket from "./hooks/use-websocket";
import TeamPage from "./pages/team";
import {IExamen} from "./components/manager/examens/types";
import ExamenContext from "./contexts/ExamenContext";
import ShowExamen from "./pages/manager/qcm/examens/show";
import ProjectPage from "./pages/project";

function App() {
  const [user, setUser] = useState<IUser | null>(null)
  const { socket } = useWebsocket()
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [etiquette, setEtiquette] = useState<IEtiquette | null>(null)
  const [navigation, setNavigation] = useState<NavigationContract[]>([
    { label: 'Home', href: '/manager/home', icon: HomeIcon },
    {
      label: 'QCM',
      href: '/manager/qcm/home',
      icon: ListBulletIcon,
      children: [
        { label: 'Home', href: '/manager/qcm/home', icon: FolderIcon },
        { label: 'Questions', href: '/manager/qcm/questions', icon: FolderIcon },
        { label: 'Etiquettes', href: '/manager/qcm/etiquettes', icon: FolderIcon },
        { label: 'Séquences', href: '/manager/qcm/sequences', icon: FolderIcon },
        { label: 'Sessions', href: '/manager/qcm/sessions', icon: FolderIcon },
        { label: 'Examens', href: '/manager/qcm/examens', icon: FolderIcon },
      ]
    },
    {
      label: 'Accounts',
      icon: UserGroupIcon,
      href: '/manager/accounts/home',
      children: [
        { label: 'Home', href: '/manager/accounts/home', icon: FolderIcon },
        { label: 'Utilisateurs', href: '/manager/accounts/users', icon: FolderIcon },
        { label: 'Roles', href: '/manager/accounts/roles', icon: FolderIcon },
        { label: 'Permissions', href: '/manager/accounts/permissions', icon: FolderIcon }

      ]
    },
  ])
  const [examen, setExamen] = useState<IExamen>({
    label: '',
    options: [],
    nbQuestions: 0,
    nbSujets: 0,
    combinaison: 0,
    totalQuestions: 0,
    totalSujets: 0,
    sujets: [],
    anonymat: true
  })

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);


  const routes = [
    { uid: 'home', href: '/manager/home', component: <Home />},

    { uid: 'qcm', href: '/manager/qcm/home', component: <HomeQCM />},
    { uid: 'qcm.etiquettes', href: '/manager/qcm/etiquettes', component: <HomeEtiquette />},
    { uid: 'qcm.questions', href: '/manager/qcm/questions', component: <HomeQuestion />},
    { uid: 'qcm.sequences', href: '/manager/qcm/sequences', component: <HomeSequence />},
    { uid: 'qcm.sessions', href: '/manager/qcm/sessions', component: <HomeSessions />},
    { uid: 'qcm.examens', href: '/manager/qcm/examens', component: <HomeExamen />},
    { uid: 'qcm.examen', href: '/manager/qcm/examen', component: <ShowExamen />},
    { uid: 'qcm.sessions', href: '/manager/qcm/session/*', component: <ShowSession />},


    { uid: 'comptes', href: '/manager/accounts/home', component: <HomeComptes />},
    { uid: 'comptes.users.list', href: '/manager/accounts/users', component: <HomeUsers />},
    { uid: 'comptes.roles.list', href: '/manager/accounts/roles', component: <HomeRoles />},
    { uid: 'comptes.permissions.list', href: '/manager/accounts/permissions', component: <HomePermissions />},

    { uid: 'login', href: '/authentication/login', component: <Login /> },
    { uid: 'register', href: '/authentication/register', component: <Register /> },

    { uid: '404', href: '*', component: <NotFound /> },
  ]


  return (
    <div>
      <AuthenticationContext.Provider value={[user, setUser]}>
        <EtiquettesContext.Provider value={{ etiquette, setEtiquette}}>
          <ExamenContext.Provider value={[examen, setExamen]}>


            <NavigationContext.Provider value={[navigation, setNavigation]}>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Index />} />
                  <Route path={"/room/*"} element={<Room />} />
                </Route>

                <Route path={"/team"} element={<TeamPage />}/>
                <Route path={"/projects"} element={<ProjectPage />} />


                <Route path="/profil" element={<Auth />}>
                  <Route index element={<ProfilHome />} />
                </Route>

                <Route path={"/"}>
                  {routes.map((route) => (
                    <Route
                      key={route.uid}
                      path={route.href}
                      element={route.component}
                    />
                  ))}
                </Route>
              </Routes>
            </NavigationContext.Provider>
          </ExamenContext.Provider>
        </EtiquettesContext.Provider>
      </AuthenticationContext.Provider>
    </div>
  )
}

function NotFound () {
  return (
    <>
      <div className="flex min-h-screen flex-col bg-white lg:relative">
        <div className="flex flex-grow flex-col">
          <main className="flex flex-grow flex-col bg-white items justify-center">
            <div className="flex flex-col px-6 lg:px-20">
              <div className="flex-shrink-0 pt-10 sm:pt-16">
                <a href="/" className="inline-flex">
                  <span className="sr-only">Your Company</span>
                  <img
                    className="h-16 w-auto"
                    src="https://cdn.discordapp.com/attachments/1092374549133275186/1092374584709369886/favicon.png"
                    alt=""
                  />
                </a>
              </div>
              <div className="my-auto flex-shrink-0 py-16 sm:py-32">
                <p className="text-base font-semibold text-indigo-600">404</p>
                <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
                <p className="mt-2 text-base text-gray-500">Sorry, we couldn’t find the page you’re looking for.</p>
                <div className="mt-6">
                  <a href="/manager" className="text-base font-medium text-indigo-600 hover:text-indigo-500">
                    Go back home
                    <span aria-hidden="true"> &rarr;</span>
                  </a>
                </div>
              </div>
            </div>
          </main>
          <footer className="flex-shrink-0 bg-gray-50">
            <div className="mx-auto w-full max-w-7xl py-16 px-6 lg:px-8">
              <nav className="flex space-x-4">
                <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-600">
                  Contact Support
                </a>
                <span className="inline-block border-l border-gray-300" aria-hidden="true" />
                <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-600">
                  Status
                </a>
                <span className="inline-block border-l border-gray-300" aria-hidden="true" />
                <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-600">
                  Twitter
                </a>
              </nav>
            </div>
          </footer>
        </div>
        <div className="hidden lg:absolute lg:inset-y-0 lg:right-0 lg:block lg:w-1/2">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1470847355775-e0e3c35a9a2c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1825&q=80"
            alt=""
          />
        </div>
      </div>
    </>
  )
}

export default App
