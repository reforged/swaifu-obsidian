import React, {useEffect, useState} from 'react'
import {Route, Routes} from 'react-router'
import Home from './pages'
import Layout from "./layouts/layout";
import HomeEtiquette from "./pages/etiquettes";
import HomeQuestion from './pages/questions';
import Login from "./pages/auth/login";
import { AuthenticationContext} from './contexts/AuthenticationContext'
import {IUser} from "@obsidian/type";
import HomePage from "./pages/pages";

function App() {
  const [user, setUser] = useState<IUser | null>(null)

  return (
    <div>
      <AuthenticationContext.Provider value={{ user, setUser}}>
          <Routes>
            <Route path={"/login"} element={<Login />}/>
            <Route path={"/manager"} element={<Layout/>}>
              <Route index element={<Home />} />

              <Route path={"/manager/etiquettes"}>
                <Route index element={<HomeEtiquette />} />
              </Route>

              <Route path={"/manager/questions"}>
                <Route index element={<HomeQuestion />} />
              </Route>

              <Route path={"/manager/pages"} element={<HomePage />} />
            </Route>
            <Route path='*' element={<NotFound />}/>
          </Routes>
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
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt=""
                  />
                </a>
              </div>
              <div className="my-auto flex-shrink-0 py-16 sm:py-32">
                <p className="text-base font-semibold text-indigo-600">404</p>
                <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
                <p className="mt-2 text-base text-gray-500">Sorry, we couldn’t find the page you’re looking for.</p>
                <div className="mt-6">
                  <a href="#" className="text-base font-medium text-indigo-600 hover:text-indigo-500">
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
