import AuthenticationContext from "../../contexts/AuthenticationContext";

export default function Avatar () {
  return (
    <AuthenticationContext.Consumer>
      {([ user ]) => (
        <>
          { user &&
            <div>
              <div className="bg-gray-100 p-4 w-32 h-32 md:w-64 md:h-64 flex items-center rounded-md  border">
                <span className="mx-auto text-4xl md:text-6xl">{ user.firstname[0]}{user.lastname[0]}</span>
              </div>
            </div>
          }
        </>
      )}
    </AuthenticationContext.Consumer>
  )
}