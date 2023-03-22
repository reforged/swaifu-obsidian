import {AuthenticationContext} from "../../contexts/AuthenticationContext";

export default function ProfilHome () {
  return (
    <AuthenticationContext.Consumer>
      {({ user }) => (
        <div>
          { user &&
            <div>
              { user.email}
              { user.numero }
            </div>
          }
        </div>
      )}
    </AuthenticationContext.Consumer>
  )
}