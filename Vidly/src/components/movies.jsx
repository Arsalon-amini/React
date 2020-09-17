import React, { Component } from "react";
import MoviesTable from "./moviesTable";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import ListGroup from "./common/listGroup";
import Pagination from "../components/common/pagination";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import { Link } from 'react-router-dom';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    // called after component rendered in DOM, make AJAX call -> setState -> render
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()]; //spread result from getGenres + add additional obj
    this.setState({ movies: getMovies(), genres });
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
    this.setState({ movies }); //in real world, call Mongoose to update db
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page }); //causes a new rendering
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 }); //reset current page to 1 after selecting genre
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      movies: allMovies,
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id //only set name prop for "all genres" in genres array (falsy if no .id also)
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]); //(inputArray, [propNames=what to sort], [sortOrder= how to sort (asc/desc)]) returns a new array

    const movies = paginate(sorted, currentPage, pageSize); //returns new array (movies for current page)

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies; //obj destructure with alias, get length from array and set to new const count
    const { pageSize, currentPage, sortColumn } = this.state;

    if (count === 0) return <p> There are no movies in the database. </p>;

    const { totalCount, data: movies } = this.getPagedData(); //rename data to movies

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
          <Link
            to="/movies/new"
            class="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Movie
          </Link>
          <p> Showing {totalCount} movies in the database </p>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
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
