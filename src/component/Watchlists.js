import React, { Component } from "react";
import { Link } from "react-router-dom";
import { watchlistService } from "../services/WatchlistService";
import "../styles/css/Watchlist.css";

class Watchlists extends Component {
  constructor() {
    super();

    this.state = {
      watchlists: []
    };
  }

  componentDidMount() {
    watchlistService.getWatchlists().then(response => {
      this.setState({
        watchlists: response.data
      });
    });
  }

  render() {
    const { watchlists } = this.state;
    return (
      <div className="container">
        <div className="watchlists-header">
          <h3>Watchlists:</h3>
        </div>
        <div className="watchlists-container">
          {watchlists.map(watchlist => (
            <Link key={watchlist.id} to={`/watchlists/${watchlist.id}`}>
              <div className="watchlist-name" key={watchlist.id}> {watchlist.name} </div>
            </Link>
          ))}
          <div className="new-watchlist-container">
              <Link className="new-watchlist-link" to="/watchlists/create">
                <button>New Watchlist</button>
              </Link>
            </div>
          </div>
        </div>
    );
  }
}

export default Watchlists;
