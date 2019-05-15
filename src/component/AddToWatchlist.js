import React, { Component } from "react";
import { Link } from "react-router-dom";
import { movieService } from "../services/MovieService";
import "../styles/css/Movies.css";
import "../styles/css/AddToWatchlist.css";
import { Badge, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import Select from "react-select";
import TopMovies from "../component/TopMovies";
import Truncate from "react-truncate";
import { watchlistService } from "../services/WatchlistService";

let prev = 0;
let next = 0;
let last = 0;
let first = 0;

class AddToWatchlist extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      filteredMovies: [],
      currentPage: 1,
      totalItems: 1,
      itemsPerPage: 10,
      search: "",
      genres: [],
      selectedGenre: "",
      startIndex: 0,
      endIndex: 10
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleLastClick = this.handleLastClick.bind(this);
    this.handleFirstClick = this.handleFirstClick.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  componentDidMount() {
    movieService.getMovies().then(response => {
      this.setState({
        movies: response.data,
        totalItems: response.data.length
      });
    });
    movieService.getGenres().then(response => {
      this.setState({
        genres: response.data
      });
    });
  }

  handleClick(event) {
    event.preventDefault();

    const { last } = this.pagination();

    this.setState({
      currentPage: Number(event.target.id)
    });

    if (Number(event.target.id) > 5) {
      if (Number(event.target.id) > last - 5) {
        this.setState({
          startIndex: last - 10,
          endIndex: last
        });
      } else {
        this.setState({
          startIndex: Number(event.target.id) - 5,
          endIndex: Number(event.target.id) + 5
        });
      }
    }
  }

  handleLastClick(event) {
    event.preventDefault();
    this.setState({
      currentPage: last,
      endIndex: last,
      startIndex: last - 10
    });
  }
  handleFirstClick(event) {
    event.preventDefault();
    this.setState({
      currentPage: 1,
      startIndex: 0,
      endIndex: 10
    });
  }

  handleFieldChange = event => {
    this.setState({ search: event.target.value });
  };

  renderMovie = movie => {
    return (
      <div className="home-movies-container" key={movie.id}>
        <div className="movie-link">
          <div className="movie" key={movie.id}>
            <div className="single-movie-container">
              <img className="single-movie-image" src={movie.image_url} />
              <Link key={movie.id} to={`/movies/${movie.id}`}>
                <div className="single-movie-title">
                  {movie.title}{" "}
                  {movie.is_watched ? (
                    <Badge color="success" pill>
                      Watched
                    </Badge>
                  ) : null}
                </div>
              </Link>
              <div className="likes-and-dislikes">
                <span className="likes">Likes:{movie.likes}</span>{" "}
                <span className="dislikes">Dislikes:{movie.dislikes}</span>{" "}
                <span className="visited">
                  Times visited: {movie.times_visited}
                </span>
              </div>
              <div className="single-movie-descritpion">
                <Truncate
                  lines={2}
                  ellipsis={
                    <span>
                      ... <a href={`/movies/${movie.id}`}>Read more</a>
                    </span>
                  }
                >
                  {movie.description}
                </Truncate>
              </div>
              <button className="button-add-movie-to-list" onClick={this.handleAddMovieToList.bind(this, movie)}>Add</button>
            </div>
          </div>
        </div>
        <div />
      </div>
    );
  };

  handleAddMovieToList = movie => {
      watchlistService.addToWatchlist(movie, this.props.watchlistId).then(function(response) {
        if (response != 500) {
          alert("Movie added to watchlist");
        }
      });
  }

  getFilteredMovies() {
    if (!this.state.search) {
      if (!this.state.selectedGenre) {
        return this.state.movies;
      } else {
        return this.state.movies.filter(
          movie => movie.genre_id == this.state.selectedGenre.value
        );
      }
    } else if (!this.state.selectedGenre) {
      return this.state.movies.filter(
        movie => movie.title.indexOf(this.state.search) >= 0
      );
    } else {
      return this.state.movies.filter(
        movie =>
          movie.title.indexOf(this.state.search) >= 0 &&
          movie.genre_id == this.state.selectedGenre.value
      );
    }
  }

  pagination() {
    const { currentPage, itemsPerPage } = this.state;
    const movies = this.getFilteredMovies();

    let indexOfLastMovie = currentPage * itemsPerPage;
    let indexOfFirstMovie = indexOfLastMovie - itemsPerPage;
    let currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

    prev = currentPage > 0 ? currentPage - 1 : 0;
    last = Math.ceil(movies.length / itemsPerPage);
    next = last === currentPage ? currentPage : currentPage + 1;

    let pageNumbers = [];
    for (let i = 1; i <= last; i++) {
      pageNumbers.push(i);
    }
    return {
      prev,
      last,
      next,
      currentMovies,
      pageNumbers,
      currentPage
    };
  }

  handleGenreChange = selectedGenre => {
    this.setState({ selectedGenre });
  };

  render() {
    const {
      prev,
      last,
      next,
      currentMovies,
      pageNumbers,
      currentPage
    } = this.pagination();

    const options = this.state.genres.map(genre => ({
      value: genre.id,
      label: genre.name
    }));

    const { selectedGenre, startIndex, endIndex } = this.state;

    return (
      <div className="container">
        <div className="movies-list-container">
          <div className="movies-list-add-to-watchlist">
            <div className="filter-and-search">
              <div className="filter-by-genre-add-to-watchlist">
                <h5 className="filter-label">Filter by genre</h5>
                <Select
                  className="genres-add-to-watchlist"
                  value={selectedGenre}
                  onChange={this.handleGenreChange}
                  options={options}
                  placeholder="Select genre"
                />
              </div>
              <div className="movie-search-add-to-list">
                <input
                  className="search-box-add-to-list"
                  id="search"
                  type="search"
                  onChange={this.handleFieldChange}
                  placeholder="Search"
                />
              </div>
            </div>
            <div className="list-of-movies-add-to-watchlist">
              {currentMovies.map(movie => this.renderMovie(movie))}
            </div>
          </div>
        </div>
        <ul id="page-numbers">
          <nav className="nav-pages">
            <div className="pagination-container">
              <Pagination className="pages">
                <PaginationItem>
                  {prev === 0 ? (
                    <PaginationLink disabled>First</PaginationLink>
                  ) : (
                    <PaginationLink
                      onClick={this.handleFirstClick}
                      id={prev}
                      href={prev}
                    >
                      First
                    </PaginationLink>
                  )}
                </PaginationItem>
                <PaginationItem>
                  {prev === 0 ? (
                    <PaginationLink disabled>Prev</PaginationLink>
                  ) : (
                    <PaginationLink
                      onClick={this.handleClick}
                      id={prev}
                      href={prev}
                    >
                      Prev
                    </PaginationLink>
                  )}
                </PaginationItem>
                {pageNumbers.slice(startIndex, endIndex).map((number, i) => (
                  <Pagination key={i}>
                    <PaginationItem
                      active={
                        pageNumbers[currentPage - 1] === number ? true : false
                      }
                    >
                      <PaginationLink
                        onClick={this.handleClick}
                        href={number}
                        key={number}
                        id={number}
                      >
                        {number}
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                ))}

                <PaginationItem>
                  {currentPage === last ? (
                    <PaginationLink disabled>Next</PaginationLink>
                  ) : (
                    <PaginationLink
                      onClick={this.handleClick}
                      id={pageNumbers[currentPage]}
                      href={pageNumbers[currentPage]}
                    >
                      Next
                    </PaginationLink>
                  )}
                </PaginationItem>

                <PaginationItem>
                  {currentPage === last ? (
                    <PaginationLink disabled>Last</PaginationLink>
                  ) : (
                    <PaginationLink
                      onClick={this.handleLastClick}
                      id={pageNumbers[currentPage]}
                      href={pageNumbers[currentPage]}
                    >
                      Last
                    </PaginationLink>
                  )}
                </PaginationItem>
              </Pagination>
            </div>
          </nav>
        </ul>
      </div>
    );
  }
}

export default AddToWatchlist;
