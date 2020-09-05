import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";

class Movies extends Component {
  state = {
    movies: getMovies(),
  };

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id); //returns new array of movies omit movie onClicked
    this.setState({ movies: movies }); //override property of movies above (set new array)
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
