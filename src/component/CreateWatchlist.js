import React, { Component } from "react";
import { watchlistService } from "../services/WatchlistService";

class CreateWatchlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }

  handleTextChange(event) {
    this.setState({ name: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { history } = this.props;

    const watchlist = {
      name: this.state.name
    };
    watchlistService.createWatchlist(watchlist).then(response => {
        history.goBack();
    })
  }

  render() {
    return (
      <div className="container">
      <form className="comment-form" onSubmit={this.handleSubmit.bind(this)}>
        <input
          className="watchlist-input"
          type="text"
          placeholder="Watchlist Name"
          value={this.state.name}
          onChange={this.handleTextChange.bind(this)}
        />
        <div className="submit-comment">
          <input type="submit" value="Create" />
        </div>
      </form>
      </div>
    );
  }
}

export default CreateWatchlist;