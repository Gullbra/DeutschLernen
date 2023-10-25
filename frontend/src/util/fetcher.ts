import axios from "axios"

export const fecther = () => { 
  axios.post(`${process.env.REACT_APP_BE_DOMAIN}/api/words`, {test: "testing"})
}
