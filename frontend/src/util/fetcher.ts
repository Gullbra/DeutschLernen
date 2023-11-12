import axios from "axios"

interface IFetcherArgs<T> {
  type: string
  timeout?: number
  data?: T
}

export const fecther = async <T>({ type, timeout, data }: IFetcherArgs<T |{ word: string }[] >) => {
  const fetchTimeout = setTimeout(() => {throw new Error('Timeout')}, timeout)

  return (() => {

    if(type === 'test') {
      return axios.get(`${process.env.REACT_APP_BE_DOMAIN}/`)
    }
    if(type === "fetch") {
      return axios
        .get(`${process.env.REACT_APP_BE_DOMAIN}/api/words`)
        // .then(data => console.log(data))
    }
    return axios.post(`${process.env.REACT_APP_BE_DOMAIN}/api/words`, {test: "testing"})

  }) ()
  .then(resp => {
    clearTimeout(fetchTimeout)
    return resp
  })
  .catch(err => {
    clearTimeout(fetchTimeout)
    throw err
  })
}
