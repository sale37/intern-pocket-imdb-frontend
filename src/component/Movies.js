import React, { Component } from "react";
import { Link } from "react-router-dom";
import { movieService } from "../services/MovieService";
import "../styles/css/Movies.css";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import ReactSearchBox from "react-search-box";

let prev = 0;
let next = 0;
let last = 0;
let first = 0;

class Movies extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      currentPage: 1,
      totalItems: 1,
      itemsPerPage: 5,
      search: ""
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
  }

  handleClick(event) {
    event.preventDefault();
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  handleLastClick(event) {
    event.preventDefault();
    this.setState({
      currentPage: last
    });
  }
  handleFirstClick(event) {
    event.preventDefault();
    this.setState({
      currentPage: 1
    });
  }

  handleFieldChange = event => {
    this.setState({ search: event.target.value });
  };

  renderMovie = movie => {
    const { search } = this.state;

    if (search != "" && movie.title.indexOf(search) === -1) {
      return null;
    }
    return (
      <div className="LinkContainer">
        <Link className="MovieLink" key={movie.id} to={`/movies/${movie.id}`}>
          <div className="Movie" key={movie.id}>
            {" "}
            <p className="Title">{movie.title} </p>
          </div>
        </Link>
      </div>
    );
  };

  render() {
    const { movies, currentPage, itemsPerPage } = this.state;

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

    return (
      <div>
        <div className="MovieListContainer">
          <div className="MovieList">
            <div className="MoviesHeading">
              <h1 className="MoviesHeading2">Movies</h1>
            </div>
            <input
              id="search"
              type="search"
              onChange={this.handleFieldChange}
            />
            {this.state.search != ""
              ? movies.map(movie => {
                  return this.renderMovie(movie);
                })
              : currentMovies.map(movie => {
                  return this.renderMovie(movie);
                })}
          </div>
        </div>
        <ul id="page-numbers">
          <nav className="NavPages">
            <div className="PaginationContainer">
              <Pagination className="Pages">
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
                {pageNumbers.map((number, i) => (
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

export default Movies;
