import { useCookies } from 'react-cookie'
import ApiRequestBuilder from "./ApiRequestBuilder";
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
    return useMutation(async (data) => {
      const response = await http.post('/users', data, {
        headers: {
          'Authorization': cookie.token
        }
      })

      return response.data
    }, { onSuccess: async () => {
      await queryClient.invalidateQueries(['users'])
    }})
  }

  return { index, createMany }
}