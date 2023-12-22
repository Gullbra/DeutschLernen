import axios from "axios"


export const fecther = async (timeout: number) => {
  const fetchTimeout = setTimeout(() => {
    throw new Error('Timeout')
  }, timeout)

  return axios
    .get(`${process.env.REACT_APP_BE_DOMAIN}/api/check_connection`)
    .then(resp => {
      clearTimeout(fetchTimeout)
      return resp
    })
    .catch(err => {
      clearTimeout(fetchTimeout)
      throw err
    })
}
