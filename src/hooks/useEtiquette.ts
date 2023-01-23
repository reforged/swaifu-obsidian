import {useMutation, useQuery} from "react-query";
import {useCookies} from "react-cookie";
import {http} from "../utils/helper";

type AddProps = {
  data: any
}


const useEtiquette = () => {
  const [cookie, setCookie] = useCookies(['token'])

  function getEtiquettes () {
    return useQuery('etiquettes', async () => {
      const response = await http.get('/etiquettes', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': cookie.token
        },
        withCredentials: true
      })
      return response.data
    }, { staleTime: Infinity })
  }

  function addEtiquette ({ data }: AddProps) {
    return useMutation(async () => {
      const response = await http.post('/etiquettes/create', data, {
        method: 'POST',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': cookie.token
        }
      })
    })
  }

  return {
    getEtiquettes,
    addEtiquette
  }
}

export default useEtiquette