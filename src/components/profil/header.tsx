import Avatar from './avatar'
import AuthenticationContext from '../../contexts/AuthenticationContext'
import {useContext, useEffect, useState} from "react";
import {IRole} from "../../utils";

export default function HeaderProfil () {
  return (
    <div className="flex md:items-center gap-4 md:gap-12 w-full">
      <Avatar />
      <Information />
    </div>
  )
}

function Information () {
  const [user, setUser] = useContext(AuthenticationContext)
  const [role, setRole] = useState<IRole>()

  useEffect(() => {
    if (user) {
      const data = user.roles.reduce((prev, current) => {
        if (current.power > prev.power) {
          return current
        } else if (current.power === prev.power) {
          return current.label < prev.label ? current : prev;
        } else {
          return prev;
        }
      })

      if (data) {
        setRole(data)
      }
    }

  }, [user])
  return (
    <AuthenticationContext.Consumer>
      {([ user ]) => (
        <>
          {user &&
            <div className="flex flex-col gap-4 truncate w-2/3">
              {role &&
                <div>
                 <span className="inline-flex items-center rounded-md bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800">
                  { role.label }
                </span>
                </div>
              }
              <div>
                <span className="text-xl md:text-6xl text-gray-900 font-medium truncate">
                  { user.lastname } { user.firstname }
                </span>
              </div>
              <div className="flex flex-col gap-2 text-xs md:text-md">
                { user.email && <span className="text-gray-300 truncate">Adresse email <span className="text-gray-800 ml-4">{ user.email}</span></span> }
                { user.numero && <span className="text-gray-300">Numéro étudiant <span className="text-gray-800 ml-4">{ user.numero}</span></span> }
              </div>
            </div>
          }
        </>
      )}
    </AuthenticationContext.Consumer>

  )
}