import React, { Component } from "react";
import { Link } from "react-router-dom";
import { movieService } from '../services/MovieService';
import '../styles/css/Movies.css'

class Movies extends Component {
  constructor() {
    super();

    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    movieService.getMovies().then(response => {
      this.setState({
        movies: response.data
      });
    });
  }

  render() {
    const { movies } = this.state;
    return (
      <div className="MovieListContainer">
        <div className="MoviesList">
          <div className="MoviesHeading">
            <h1 className='MoviesHeading2'>Movies</h1>
          </div>
          {movies.map(movie => (
            <Link className="MovieLink" key={movie.id} to={`/${movie.id}`}>
              <div className="Movie" key={movie.id}>
                {" "}
                <p className="Title">{movie.title}{" "}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export default Movies;