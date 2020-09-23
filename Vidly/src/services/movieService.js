import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/movies";

function movieUrl(id){
  return `${apiEndpoint}/${id}`; //dynamically render ${ whatsInside }
}

export function getMovies() {
  return http.get(apiEndpoint);
}

export function getMovie(movieId) {
  return http.get(movieUrl(movieId));
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie }; //clone state obj
    delete body._id; //removie _id property (Mongoose will auto create ID property)
    return http.put(mvoieUrl(movie._id), body);
  }
  return http.post(apiEndpoint, movie);
}

export function deleteMovie(movieId) {
  return http.delete(movieUrl(movieId)); //axios call endpoint .delete
}