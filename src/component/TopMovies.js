import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/css/TopMovies.css";

class TopMovies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: true
    };

    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

 

  getTopMovies() {
    const movies = [...this.props.movies];

    movies.sort(function(obj1, obj2) {
      return obj2.likes - obj1.likes;
    });

    return (
      <div>
        {movies.slice(0, 10)
          .map((movie, index) => (
            <div className="link-container" key={movie.id}>
              <Link
                className="movie-link"
                key={movie.id}
                to={`/movies/${movie.id}`}
              >
                <div className="movie" key={movie.id}>
                  <div className="top-movies-title">{index+1}{"."}{" "}{movie.title}</div>
                </div>
              </Link>
            </div>
          ))
          }
      </div>
    );
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  render() {
    const topMovies = this.getTopMovies();
    return (
      <div>
        <h3 className="top-movies-label">Top movies</h3>
      <div class="sidebar">{topMovies}</div>
      </div>
    );
  }
}

export default TopMovies;
