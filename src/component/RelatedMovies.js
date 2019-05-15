import React, { Component } from 'react';
import { movieService } from "../services/MovieService";
import { Link } from "react-router-dom";
import '../styles/css/RelatedMovies.css'

class RelatedMovies extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movies: []
        }
    }

    componentDidMount() {
        movieService.getMovies().then(response => {
          this.setState({
            movies: response.data,
          });
        });
      }

    getRelatedMovies = () => {
        const genre = this.props.genre;

        let relatedMovies = this.state.movies.filter(movie => movie.genre_id == genre.id);

        relatedMovies.sort(function(obj1, obj2) {
            return obj2.likes - obj1.likes;
          });
;

        return (
            <div>
        {relatedMovies.slice(0, 10)
          .map(movie => (
            <div className="link-container" key={movie.id}>
              <Link
                className="movie-link"
                key={movie.id}
                to={`/movies/${movie.id}`}
              >
                <div className="movie" key={movie.id}>
                  <div className="top-movies-title">{movie.title}</div>
                </div>
              </Link>
            </div>
          ))
          }
      </div>
        );
    }
    

    render() {

        const moviesToShow = this.getRelatedMovies();
        return (
            <div>
                <h3 className="related-movies-label">Related Movies</h3>
                <div className="related-movies-sidebar">{moviesToShow}</div>
            </div>
        );
    }
}

export default RelatedMovies;