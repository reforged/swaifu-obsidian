import Axios from 'axios'

type Field = { [key: string]: any}
const API_ENDPOINT = 'http://localhost:3333'
export default class ApiRequestBuilder {
  public get (url: string) {
    return new GetRequest(API_ENDPOINT + url)
  }

  public post (url: string) {
    return new PostRequest(API_ENDPOINT + url)
  }

  public put (url: string) {
    return new PutRequest(API_ENDPOINT + url)
  }
}

class GetRequest {
  private _headers: { [key: string]: string } = {}

  constructor(private url: string) {}

  public headers (headers: { [key: string]: string }): GetRequest {
    this._headers = headers
    return this
  }

  public build () {
    return Axios.get(this.url, {
      headers: this._headers,
      withCredentials: true
    })
  }
}

class PostRequest {
  private _headers: { [key: string]: string } = {}
  private fields: FormData = new FormData()

  constructor(private url: string) {}

  public payload (fields: Field): PostRequest {
    Object.entries(fields).forEach(([key, value]) => {
      this.fields.set(key, value)
    })

    return this
  }

  public headers (headers: { [key: string]: string }): PostRequest {
    this._headers = headers
    return this
  }

  public build () {
    return Axios.post(this.url, this.fields, {
      headers: this._headers,
      withCredentials: true
    })
  }
}

class PutRequest {
  private _headers: { [key: string]: string } = {}
  private fields: FormData = new FormData()

  constructor (private url: string) {
  }

  public payload (fields: Field): PutRequest {
    Object.entries(fields).forEach(([key, value]) => {
      this.fields.set(key, value)
    })

    return this
  }

  public headers (headers: { [key: string]: string }) {
    this._headers = headers
    return this
  }

  public build () {
    return Axios.put(this.url, this.fields, {
      headers: this._headers,
      withCredentials: true
    })
  }
}