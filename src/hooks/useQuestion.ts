import {useQuery} from "react-query";
import {http} from "../utils/helper";
import {useCookies} from "react-cookie";

const useQuestion = () => {
  const [cookie] = useCookies(['token'])
  function fetch () {
    return useQuery('questions', async () => {
      const response = await http.get('/questions', {
        headers: {
          "Authorization": cookie.token
        }
      })

      return response.data
    }, { staleTime: Infinity })
  }

  return {
    fetch
  }
}

export default useQuestion