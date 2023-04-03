import AuthenticationContext from "../../contexts/AuthenticationContext";
import Session from "./session";

export default function SessionStories () {

  return (
    <AuthenticationContext.Consumer>
      {([ user ]) => (
        <div>
          { user.sessions &&
            <div className="border rounded-md p-4">
              {user.sessions.filter((item) => item.status === 'finish').map((session) => (
                <Session session={session} key={session.id} />
              ))}
            </div>
          }
        </div>
      )}
    </AuthenticationContext.Consumer>
  )
}