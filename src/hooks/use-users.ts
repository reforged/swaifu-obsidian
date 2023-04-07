import { useCookies } from 'react-cookie'
import {useMutation, useQuery, useQueryClient} from "react-query";
import {http} from "../utils/helper";
import {IUser} from "../utils";

export default function useUsers () {
  const [cookie, setCookie] = useCookies(['token'])
  const queryClient = useQueryClient()

  function index () {
    return useQuery('users', async (): Promise<IUser[]> => {
      const response = await http.get('/users', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': cookie.token
        },
        withCredentials: true
      })

      return response.data
    })
  }
  type PropsRegisteremail = {
    email: string
    firstname: string
    lastname: string
    password: string
  }

  type DataUsers = {
    firstname: string
    lastname: string
    numero: string
    password: string
  }

  function createMany () {
    return useMutation(async (data: { users: DataUsers[]}) => {
      const response = await http.post('/users/create-many', data, {
        headers: {
          'Authorization': cookie.token
        }
      })

      return response.data
    }, { onSuccess: async () => {
      await queryClient.invalidateQueries(['users'])
    }})
  }

  function store () {
    return useMutation(async (data : any) => {
      const response = await http.post('/users/create', data, {
        headers: {
          'Authorization': cookie.token
        }
      })

      return response.data
    }, { onSuccess: async () => {
      await queryClient.invalidateQueries(['users'])
    }})
  }

  function update () {
    return useMutation(async (data) => {
      console.log(data)
      const response = await http.put(`/users/${data.id}`, data, {
        headers: {
          'Authorization': cookie.token
        }
      })
      return response.data
    }, { onSuccess: async () => {
      await queryClient.invalidateQueries(['users'])
    }})
  }

  function destroy () {
    return useMutation(async (data: any) => {
      const response = await http.delete(`/users/${data.id}`, {
        method: 'POST',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': cookie.token
        }
      })

      return response.data
    }, {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(['users'])
      }
    })
  }

  function updateMe () {
    return useMutation(async (data: any) => {
      const response = await http.put('/profile/update', data, {
        method: 'POST',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': cookie.token
        }
      })

      return response.data
    }, {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(['user'])
      }
    })
  }

  return { index, createMany, destroy, updateMe, store, update}
}