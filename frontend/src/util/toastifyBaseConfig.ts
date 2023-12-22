import { toast } from "react-toastify"

export const toastPromiseWrapper = async <F extends Promise<unknown>>(
  promiseFunc: F,
  timeout: number,
  pendingMessage: string,
  successMessage: string,
  failMessage: string
) => {
  return toast.promise(
    promiseFunc,
    {
      pending: {
        render(){return pendingMessage},
        autoClose: timeout
      },
      success: successMessage,
      error: failMessage
    },
    {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    }
  )
}
