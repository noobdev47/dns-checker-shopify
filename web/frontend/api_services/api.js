import axios from "axios"

const API = axios.create({
  baseURL: 'https://inboxbetter.comocrm.com/api/v1',
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
  },
});

API.interceptors.response.use(
  (res) => {
    return res
  },
  (err) => {
    if (err.response.status == 401) {
      if (err.response.data.message !== undefined) {
        window.location = "/login/deactivated"
      }
      // store.dispatch(logout());

      localStorage.clear()
    }

    if (err.response.status == 403) {
      if (err.response.data.message !== undefined) {
        window.location = "/login/blocked"
      }
      // store.dispatch(logout());

      localStorage.clear()
    }

    if (err.status !== 401) {
      // toast.error(err.response.data.message, {
      //   autoClose: 2500,
      //   closeOnClick: true,
      //   position: "top-right",
      //   hideProgressBar: false,
      // })
      throw err
    }
  }
)

export default API