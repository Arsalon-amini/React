import axios from "axios";
import { toast } from "react-toastify";
import logger from "./logService"; //abstraction around Sentry LaaS


//axios.interceptors.response.use (arg1 - fn call if success, arg2 - fn call if error)
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log(error); //abstracted -> sentry LaaS
    toast.error("An unexpected error occurred."); //display generic error msg
  }

  return Promise.reject(error);
});

function setJwt(jwt){
  axios.defaults.headers.common["x-auth-token"] = jwt;  // (whenever HTTP sent, include header (token) in req - POST, GET, ETC.)
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
};
