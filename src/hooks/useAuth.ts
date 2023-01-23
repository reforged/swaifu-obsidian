import { useMutation } from 'react-query'
import { http } from '../utils/helper'
import { useCookies } from 'react-cookie'

type Props = {
  params: {
    email: string
    password: string
  }
}

export default () => {
  const [cookie, setCookie] = useCookies(['token'])
  return useMutation(async (params: Props) => {
    const data = params.params

    const response = await http.post('http://localhost:3333/authentication/login', data,
      {method: 'POST',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      }
    })

    setCookie('token', `${response.data.token}`, {
      path: '/',
      sameSite: true
    })

    http.defaults.headers.common['Authorization'] = `${response.data.token.token}`

    return response.data
  })
}
