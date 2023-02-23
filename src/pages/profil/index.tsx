import {AuthenticationContext} from "../../contexts/AuthenticationContext";

export default function ProfilHome () {
  return (
    <AuthenticationContext.Consumer>
      {({ user }) => (
        <div>
          { user &&
            <div>
              { user.email}
            </div>
          }
        </div>
      )}
    </AuthenticationContext.Consumer>
  )
}