import { useMutation, useQuery, useQueryClient } from 'react-query'
import { http } from '../utils/helper'
import { useCookies } from 'react-cookie'
import { useContext } from 'react'
import { EtiquettesContext } from '../contexts/EtiquettesContext'
import { IEtiquette } from '@obsidian/type'

const useEtiquettes = () => {
  const [cookie, setCookie] = useCookies(['token'])
  const queryClient = useQueryClient()
  const {etiquette, setEtiquette} = useContext(EtiquettesContext)

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
        console.log("query: ", data)
        setEtiquette(data)
        console.log(etiquette)
        await queryClient.invalidateQueries(['etiquettes'])
      }
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
    }, )
  }

  function destroy () {
    return useMutation(async (id: any) => {
      const response = await http.delete(`/etiquettes/${id}`, {
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
        console.log(data)
        await queryClient.invalidateQueries(['etiquettes'])
      }
    })
  }

  return {
    create,
    fetch,
    destroy
  }
}

export default useEtiquettes