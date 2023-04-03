import React, {useState, useEffect} from "react";
import useAuthentication from "../../hooks/use-authentication";
import {classNames} from "../../utils/helper";
import {Link} from "react-router-dom";

export default function Register () {
  const [email, setEmail] = useState<string>('')
  const [firstname, setFirstname] = useState<string>('')
  const [lastname, setLastname] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [disabled, setDisabled] = useState<boolean>(true)



  const { register } = useAuthentication()
  const { mutate: createUser } = register()

  function handle () {
    createUser({ password, lastname, firstname, email})
  }

  useEffect(() => {
    if (email && firstname && lastname && password) setDisabled(false)
    else setDisabled(true)
  }, [email, firstname, lastname, password])

  return (
    <div className="flex min-h-screen overflow-hidden">
      <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <div>
              <Link to={"/"}>
                <div className="w-10 h-10 flex items-center justify-center bg-purple-600 rounded-md">
                  <img className="h-full w-full object-cover rounded-md" src="https://cdn.discordapp.com/attachments/1092374549133275186/1092374584709369886/favicon.png" alt=""/>
                </div>
              </Link>

              <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">Créer ton compte</h2>
              <p className="mt-2 text-sm text-gray-600">
                Ou{' '}
                <Link to={'/authentication/login'} className="font-medium text-indigo-600 hover:text-indigo-500">
                  Connecte toi
                </Link>
              </p>
            </div>
            <div>
              <div className="overflow-hidden  mt-8">
                <div className="">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                        First name
                      </label>
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        onChange={(e) => setFirstname(e.currentTarget.value)}
                        autoComplete="given-name"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                        Last name
                      </label>
                      <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        onChange={(e) => setLastname(e.currentTarget.value)}
                        autoComplete="family-name"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>

                    <div className="col-span-6">
                      <label htmlFor="email-address" className="block text-sm font-medium leading-6 text-gray-900">
                        Email address
                      </label>
                      <input
                        type="email"
                        name="email-address"
                        id="email-address"
                        onChange={(e) => setEmail(e.currentTarget.value)}
                        autoComplete="email"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>

                    <div className="col-span-6">
                      <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={(e) => setPassword(e.currentTarget.value)}
                        autoComplete="password"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div className="pt-4 text-right w-full">
                  <button
                    disabled={disabled}
                    onClick={handle}
                    className={classNames(
                      'rounded-md px-3 py-2 border w-full',
                      disabled ? 'text-gray-400 bg-gray-50' : 'bg-indigo-500 text-white'
                    )}
                  >
                    Créer votre compte
                  </button>
                </div>
              </div>
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