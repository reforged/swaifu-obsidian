import React, {useContext, useState} from 'react'
import { Tab } from '@headlessui/react'
import useAuthentication from "../../hooks/use-authentication";
import {classNames} from "../../utils/helper";
import {Link} from "react-router-dom";

export default function Login () {
  return (
    <div className="flex min-h-screen overflow-hidden">
      <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <Link to={"/"}>
              <div className="w-10 h-10 flex items-center justify-center bg-purple-600 rounded-md">
                <img className="h-full w-full object-cover rounded-md" src="https://cdn.discordapp.com/attachments/1092374549133275186/1092374584709369886/favicon.png" alt=""/>
              </div>
            </Link>

            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">Connectes-toi à ton compte</h2>
            <p className="mt-2 text-sm text-gray-600">
              Ou{' '}
              <Link to={'/authentication/register'} className="font-medium text-indigo-600 hover:text-indigo-500">
                Créer ton compte
              </Link>
            </p>
          </div>

          <div className="mt-8">

            <div className="mt-6">
              <Tab.Group>
                <Tab.List>
                  <div className="flex items-center gap-8">
                    <Tab
                      className={({ selected }) =>
                        classNames(
                          'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                          'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                          selected
                            ? 'bg-indigo-500 shadow !text-white'
                            : 'text-blue-700 hover:bg-white/[0.12] hover:text-blue-800'
                        )
                      }>
                      Email
                    </Tab>
                    <Tab
                      className={({ selected }) =>
                        classNames(
                          'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                          'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                          selected
                            ? 'bg-indigo-500 shadow !text-white'
                            : 'text-blue-700 hover:bg-white/[0.12] hover:text-blue-800'
                        )
                      }>
                      Numero étudiant
                    </Tab>
                  </div>

                </Tab.List>
                <Tab.Panels>
                  <div className="mt-8">
                    <Tab.Panel>
                      <LoginWithEmail />
                    </Tab.Panel>
                    <Tab.Panel>
                      <LoginWithCode />
                    </Tab.Panel>
                  </div>

                </Tab.Panels>
              </Tab.Group>

            </div>
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
          alt=""
        />
      </div>
    </div>
  )
}

function LoginWithEmail () {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { loginEmail } = useAuthentication()
  const { mutate: loginUser } = loginEmail()

  const handle = () => {
    loginUser({ email, password })
  }

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email address
        </label>
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder='Enter Your Email'
            onChange={(e) => setEmail(e.currentTarget.value)}
            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="mt-1">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            placeholder='Enter Your Password'
            onChange={(e) => setPassword(e.currentTarget.value)}
            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <button
          type="button"
          onClick={handle}
          className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Sign in
        </button>
      </div>
    </div>
  )
}

function LoginWithCode () {
  const [numero, setNumero] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { loginCode } = useAuthentication()
  const { mutate: loginUser } = loginCode()

  const handle = () => {
    loginUser({ numero, password})
  }

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Numéro étudiant
        </label>
        <div className="mt-1">
          <input
            id="code"
            name="code"
            type="text"
            autoComplete="code"
            required
            placeholder='Enter Your code student'
            onChange={(e) => setNumero(e.currentTarget.value)}
            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="mt-1">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            placeholder='Enter Your Password'
            onChange={(e) => setPassword(e.currentTarget.value)}
            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <button
          type="button"
          onClick={handle}
          className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Sign in
        </button>
      </div>
    </div>
  )
}