import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { watchlistService } from "../services/WatchlistService";

class RemoveMovie extends Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete = event => {
    event.preventDefault();

    const watchlist_id = this.props.watchlist_id;

    const movie_id = this.props.movie_id;

    const { history } = this.props;

    watchlistService
      .removeMovieFromWatchlist(watchlist_id, movie_id)
      .then(response => {
        this.props.removeFromWatchlist(movie_id);
      });
  };

  render() {
    return (
      <button className="remove" onClick={this.handleDelete}>
        Remove from list
      </button>
    );
  }
}

export default withRouter(RemoveMovie);