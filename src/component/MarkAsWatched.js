import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { watchlistService } from "../services/WatchlistService";

class MarkAsWatched extends Component {
  constructor(props) {
    super(props);

    this.handleMarkAsWatchedUnwatched = this.handleMarkAsWatchedUnwatched.bind(
      this
    );
  }

  handleMarkAsWatchedUnwatched = event => {
    event.preventDefault();

    const movie_id = this.props.movie_id;

    watchlistService.markAsWatchedUnwatched(movie_id).then(response => {
      this.props.markAsWatchedUnwatched(movie_id);
    });
  };

  render() {

    return this.props.isWatched ? (
      <button
        className="mark-as-unwatched"
        onClick={this.handleMarkAsWatchedUnwatched}
      >
        {" "}
        Mark as Unwatched
      </button>
    ) : (
      <button
        className="mark-as-watched"
        onClick={this.handleMarkAsWatchedUnwatched}
      >
        {" "}
        Mark as watched{" "}
      </button>
    );
  }
}

export default withRouter(MarkAsWatched);
