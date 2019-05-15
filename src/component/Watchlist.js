import React, { Component } from "react";
import { Link } from "react-router-dom";
import { watchlistService } from "../services/WatchlistService";
import "../styles/css/Watchlist.css";
import RemoveMovie from "./RemoveMovie";
import MarkAsWatched from "./MarkAsWatched";
import { Badge } from "reactstrap";
import update from "immutability-helper";
import AddToWatchlist from './AddToWatchlist';

class Watchlist extends Component {
  constructor() {
    super();
    this.state = {
      watchlist: {},
      movies: [],
      addMovie: false
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

  removeFromWatchlist = movieId => {
    
      const movies = this.state.movies.splice(movieId, 1);
      
      this.setState({ movies });
    
  };

  handleDelete = event => {
    event.preventDefault();

    const watchlistid = this.props.match.params.id;

    const { history } = this.props;

    watchlistService.deleteWatchlist(watchlistid).then(response => {
      history.push('/watchlists');
    });
  }

  handleAddButton = event => {
      event.preventDefault();

      this.setState({
        addMovie: true
      });
  }

  render() {
    const { watchlist, movies } = this.state;

    return (
      this.state.addMovie == false ? (
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
                <div className="movie-in-watchlist" key={movie.id}>
                  <div className="title-movie-in-watchlist">
                    {movie.title}{" "}
                    {movie.is_watched ? (
                      <Badge color="success" pill>
                        Watched
                      </Badge>
                    ) : null}
                  </div>
                </div>
              </Link>
              <div className="buttons-watchlist">
                <RemoveMovie
                  removeFromWatchlist={this.removeFromWatchlist}
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
            <button onClick={this.handleAddButton}>Add movie</button>
        </div>
        <div className="delete-watchlist">
            <button onClick={this.handleDelete}>Delete watchlist</button>
        </div>
      </div>) : <AddToWatchlist watchlistId={this.state.watchlist.id}/>
      
    );
  }
}

export default Watchlist;
