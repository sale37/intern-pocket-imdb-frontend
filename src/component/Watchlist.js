import React, { Component } from "react";
import { Link } from "react-router-dom";
import { watchlistService } from "../services/WatchlistService";
import "../styles/css/Watchlist.css";
import RemoveMovie from './RemoveMovie';

class Watchlist extends Component {
  constructor() {
    super();
    this.state = {
      watchlist: {},
      movies: []
    };
  }

  componentDidMount() {
    const watchlistid = this.props.match.params.id;

    watchlistService.showWatchlist(watchlistid).then(response => {
      this.setState({
        watchlist: response.data,
        movies: response.data.movies
      });
    });
  }

  

  render() {
    const { watchlist, movies } = this.state;

    return (
      <div className="container">
        <div className="watchlist-container">
          <div className="watchlist-header">
            <h2>{watchlist.name}:</h2>
          </div>
        </div>
        <div>
          {movies.map(movie => (
            <div className="content-container" key={movie.id}>
              <Link
                className="movie-link"
                key={movie.id}
                to={`/movies/${movie.id}`}
              >
                <div className="movie" key={movie.id}>
                  <div className="title">{movie.title}</div>
                </div>
              </Link>
              <div className="buttons">
                <RemoveMovie movie_id={movie.id} watchlist_id={this.state.watchlist.id}/>
                <button className="mark-as-watched">Mark as watched</button>
              </div>
            </div>
          ))}
        </div>
        <div className="add-movie">
          <Link className="add-movie-link" to="/home">
            <button>Add movie</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Watchlist;
