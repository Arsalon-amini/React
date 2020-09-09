import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import ListGroup from "./common/listGroup";
import Like from "../components/common/like";
import Pagination from "../components/common/pagination";
import { paginate } from "../utils/paginate";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
  };

  componentDidMount() {
    this.setState({ movies: getMovies(), genres: getGenres() }); // called after component rendered in DOM, make AJAX call -> setState -> render
  }

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

  handlePageChange = (page) => {
    this.setState({ currentPage: page }); //causes a new rendering
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre });
  };

  render() {
    const { length: count } = this.state.movies; //obj destructure with alias, get length from array and set to new const count
    const {
      pageSize,
      currentPage,
      selectedGenre,
      movies: allMovies,
    } = this.state;

    if (count === 0) return <p> There are no movies in the database. </p>;

    const filtered = selectedGenre
      ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
      : allMovies;

    const movies = paginate(filtered, currentPage, pageSize); //returns new array (movies for current page)

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            seletedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>

        <div className="col">
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
              {movies.map((movie) => (
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
          <Pagination
            itemsCount={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
