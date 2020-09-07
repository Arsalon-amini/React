import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "../components/common/like";

class Movies extends Component {
  state = {
    movies: getMovies(),
  };

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id); //returns new array of movies omit movie onClicked
    this.setState({ movies: movies }); //override property of movies above (set new array)
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies]; 
    const index = movies.indexOf(movie); 
    movies[index] = { ...movies[index] }; 
    movies[index].liked = !movies[index].liked; 
    this.setState({ movies }); 
    console.log("Like Clicked", movie);
    //in real world, call Mongoose to update db
  };

  render() {
    const { length: count } = this.state.movies; //obj destructure with alias, get length from array and set to new const count

    if (count === 0) return <p> There are no movies in the database. </p>;

    return (
      <React.Fragment>
        <p> Showing {count} movies in the database </p>
        <table className="table">
          <thead>
            <tr>
              <th>Title </th>
              <th>Movie </th>
              <th>Stock </th>
              <th>Rate </th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map((movie) => (
              <tr key={movie._id}>
                <td> {movie.title} </td>
                <td> {movie.genre.name}</td>
                <td> {movie.numberInStock}</td>
                <td> {movie.dailyRentalRate} </td>
                <td>
                  {" "}
                  <Like
                    liked={movie.liked}
                    onClick={() => this.handleLike(movie)}
                  />{" "}
                </td>
                <td>
                  {" "}
                  <button
                    onClick={() => this.handleDelete(movie)}
                    className="btn btn-danger btn-sm"
                  >
                    {" "}
                    Delete{" "}
                  </button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Movies;
