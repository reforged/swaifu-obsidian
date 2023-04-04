import AuthenticationContext from "../../contexts/AuthenticationContext";

export default function Avatar () {
  return (
    <AuthenticationContext.Consumer>
      {([ user ]) => (
        <>
          { user &&
            <div>
              <div className="bg-gray-100 p-4 w-64 h-64 rounded-full flex items-center lg:rounded-md  border">
                <span className="mx-auto text-xl lg:text-6xl">{ user.firstname[0]}{user.lastname[0]}</span>
              </div>
            </div>
          }
        </>
      )}
    </AuthenticationContext.Consumer>
  )
}