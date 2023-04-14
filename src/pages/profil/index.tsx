import AuthenticationContext from '../../contexts/AuthenticationContext'
import {useContext, useEffect, useState} from 'react'
import {classNames} from '../../utils/helper'
import useUsers from '../../hooks/use-users'
import Navbar from '../../components/diamond/Navbar'
import SessionStories from '../../components/profil/session-stories'
import Avatar from "../../components/profil/avatar";
import HeaderProfil from "../../components/profil/header";

export default function ProfilHome () {
  const [open, setOpen] = useState(false)
  return (
    <AuthenticationContext.Consumer>
      {([ user ]) => (
        <>
          { user &&
            <div>
              <Navbar open={open} setOpen={setOpen} />
              <div className="flex flex-col w-full  max-w-7xl mx-auto mt-32 px-4 lg:px-0">
                <div className="flex md:items-center justify-between">
                  <HeaderProfil />
                </div>

                <div className="  w-full mt-12">
                  <PersonnalInformation />
                  <div className=" mt-6">
                    <div>
                      <SessionStories />
                    </div>
                  </div>

                </div>
              </div>
            </div>
          }
        </>
      )}
    </AuthenticationContext.Consumer>
  )
}

function PersonnalInformation () {
  const [user, setUser] = useContext(AuthenticationContext)

  const [disabled, setDisabled] = useState<boolean>(true)
  const { updateMe } = useUsers()
  const [firstname, setFirstname] = useState<string>('')
  const [lastname, setLastname] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const { mutate: edit } = updateMe()

  useEffect(() => {
    if (user) {
      setFirstname(user.firstname)
      setLastname(user.lastname)
      setEmail(user.email)
    }
  }, [user])

  useEffect(() => {
    if (user) {
      if (firstname !== user.firstname || lastname !== user.lastname || email !== user.email) {
        setDisabled(false)
      } else {
        setDisabled(true)
      }
    }

  }, [firstname, lastname, email])

  function onSubmit () {
    const newUser = {
      firstname,
      lastname,
      email: email !== user.email ? email : undefined
    }

    Object.keys(newUser).forEach((key) => {
      if (newUser[key] === undefined || newUser[key] === null) {
        delete newUser[key]
      }
    })
    edit(newUser)
  }

  return (
    <div className="bg-white border rounded-md w-full">

      <div className="mt-5 md:col-span-2 md:mt-0">
        <div>
          <div className="overflow-hidden shadow sm:rounded-md">
            <div className="bg-white px-4 py-5 sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                    First name
                  </label>
                  <input
                    value={firstname}
                    type="text"
                    onChange={(e) => setFirstname(e.currentTarget.value)}
                    name="first-name"
                    id="first-name"
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
                    value={lastname}
                    name="last-name"
                    onChange={(e) => setLastname(e.currentTarget.value)}
                    id="last-name"
                    autoComplete="family-name"
                    className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    name="last-name"
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    id="email"
                    autoComplete="email"
                    className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
              <button
                type="button"
                onClick={onSubmit}
                className={classNames(
                  'rounded-md px-3 py-2 border',
                  disabled ? 'text-gray-400 bg-gray-50' : 'bg-indigo-500 text-white'
                )}
              >
                Modifier
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}