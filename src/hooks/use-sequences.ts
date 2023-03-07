import {useCookies} from "./use-cookies";
import ApiRequestBuilder from "./ApiRequestBuilder";

export default function useSequences () {
  const { get } = useCookies()

  async function getAll () {
    return new ApiRequestBuilder()
      .get('/sequences')
      .headers({ 'Authorization': get('token')})
      .build()
  }

  async function getOne (id: string) {
    return new ApiRequestBuilder()
      .get(`/sequences/${id}`)
      .headers({ 'Authorization': get('token')})
      .build()
  }

  return { getAll, getOne }
}