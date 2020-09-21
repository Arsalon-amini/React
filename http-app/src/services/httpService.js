import axios from "axios";
import {toast} from 'react-toastify'; 

//axios.interceptors.response.use (arg1 - fn call if success, arg2 - fn call if error)
axios.interceptors.response.use(null, (error) => {
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;
  
    if (!expectedError) {
      console.log("Logging error", error); //log
      toast.error("An unexpected error occurred."); //display generic error msg
    }
  
    return Promise.reject(error);
  });

  export default {
      get: axios.get,
      post: axios.post,
      put: axios.put,
      delete: axios.delete
  };