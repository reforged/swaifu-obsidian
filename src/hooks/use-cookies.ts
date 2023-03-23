export function useCookies () {
  const _cookies = document.cookie.split('; ')

  function get (key: string) {
    const cookies = _cookies.reduce((acc, current) => {
      const [key, value] = current.split('=')
      return { ...acc, [key]: value}
    }, {})

    return cookies[key]
  }

  function set (key: string, value: string) {
    const cookies = _cookies.filter((a) => a).reduce((acc, current) => {
      const [key, value] = current.split('=')
      return { ...acc, [key]: value }
    }, {})

    cookies[key] = value
    document.cookie = Object.entries(cookies)
      .map(([key, value]) => key + '=' + value)
      .join('; ')
  }

  return { get, set }

}