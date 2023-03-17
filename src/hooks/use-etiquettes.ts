import { useMutation, useQuery, useQueryClient } from 'react-query'
import { http } from '../utils/helper'
import { useCookies } from 'react-cookie'
import { useContext } from 'react'
import { EtiquettesContext } from '../contexts/EtiquettesContext'
import { IEtiquette } from '../utils'

const useEtiquettes = () => {
  const [cookie, setCookie] = useCookies(['token'])
  const queryClient = useQueryClient()

  function create () {
    return useMutation(async (data: any) => {
      const response = await http.post('/etiquettes/create', data, {
        method: 'POST',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': cookie.token
        }
      })

      return response.data
    }, {
      onSuccess: async (data: IEtiquette) => {
        await queryClient.invalidateQueries(['etiquettes'])
      }
    })
  }

  function update () {
    return useMutation(async (data: any) => {
      const response = await http.put(`/etiquettes/${data.id}`, data, {
        method: 'PUT',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': cookie.token
        }
      })

      return response.data
    }, {
      onSuccess: async (data, variables, context) => {
        console.log(data);
        
        await queryClient.invalidateQueries(['etiquettes'])
      },
    })
  }

  function fetch () {
    return useQuery('etiquettes', async () => {
      const response = await http.get('/etiquettes', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': cookie.token
        },
        withCredentials: true
      })
      return response.data
    })
  }

  function destroy () {
    return useMutation(async (data: any) => {
      const response = await http.delete(`/etiquettes/${data.id}`, {
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
        await queryClient.invalidateQueries(['etiquettes'])
      }
    })
  }

  return {
    create,
    update,
    fetch,
    destroy
  }
}

export default useEtiquettes