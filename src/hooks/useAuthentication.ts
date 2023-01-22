import { useQuery } from 'react-query'
import { queryKeys } from './query-keys'

type PropsLogin = {
  email: string
  password: string
}

const useAuthentication = () => {
  async function login ({ email, password }: PropsLogin) {
    return useQuery(queryKeys.auth, async () => {
      const response = await fetch('http://localhost:3333/authentication/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password}),
        credentials: 'same-origin',
      })

      return response.json()
    }, { staleTime: 1 })
  }

  return {
    login,
  }
}

export default useAuthentication