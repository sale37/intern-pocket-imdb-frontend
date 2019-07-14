import React, { Component } from "react";
import { Link } from "react-router-dom";
import { watchlistService } from "../services/WatchlistService";
import "../styles/css/Watchlist.css";
import RemoveMovie from "./RemoveMovie";
import MarkAsWatched from "./MarkAsWatched";
import { Badge } from "reactstrap";
import update from "immutability-helper";

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

  markAsWatchedUnwatched = movieId => {
    this.setState(state => {
      const movies = state.movies.map(movie => {
        if (movie.id === movieId) {
          if (movie.is_watched) {
            movie.is_watched = false;
          } else {
            movie.is_watched = true;
          }
        }
        return movie;
      });
      return {
        movies
      };
    });
  };

  handleDelete = event => {
    event.preventDefault();

    const watchlistid = this.props.match.params.id;

    const { history } = this.props;

    watchlistService.deleteWatchlist(watchlistid).then(response => {
      history.push('/watchlists');
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
                  <div className="title">
                    {movie.title}{" "}
                    {movie.is_watched ? (
                      <Badge color="success" pill>
                        Watched
                      </Badge>
                    ) : null}
                  </div>
                </div>
              </Link>
              <div className="buttons">
                <RemoveMovie
                  movie_id={movie.id}
                  watchlist_id={this.state.watchlist.id}
                />
                <MarkAsWatched
                  movie_id={movie.id}
                  markAsWatchedUnwatched={this.markAsWatchedUnwatched}
                  isWatched={movie.is_watched}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="add-movie">
          <Link className="add-movie-link" to="/home">
            <button>Add movie</button>
          </Link>
        </div>
        <div className="delete-watchlist">
            <button onClick={this.handleDelete}>Delete watchlist</button>
        </div>
      </div>
    );
  }
}

export default Watchlist;
