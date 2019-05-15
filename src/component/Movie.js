import React, { Component } from "react";
import { movieService } from "../services/MovieService";
import "../styles/css/Movie.css";
import { error } from "util";
import Comment from "./Comment";
import Comments from "./Comments";
import { Link } from "react-router-dom";
import { watchlistService } from "../services/WatchlistService";
import Select from "react-select";
import Logout from "../containers/auth/Logout";
import { FaThumbsUp } from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa";
import RelatedMovies from "./RelatedMovies";

class Movie extends Component {
  constructor() {
    super();
    this.state = {
      movie: {},
      likes: "",
      dislikes: "",
      comments: [],
      timesVisited: 0,
      watchlists: [],
      selectedWatchlist: "",
      genre: ""
    };
  }

  componentDidMount() {
    const movieId = this.props.match.params.id;

    movieService.showMovie(movieId).then(response => {
      this.setState({
        movie: response.data,
        likes: response.data.likes,
        dislikes: response.data.dislikes,
        timesVisited: response.data.times_visited,
        comments: response.data.comments,
        genre: response.data.genre
      });
    });
    watchlistService.getWatchlists().then(response => {
      this.setState({
        watchlists: response.data
      });
    });
  }

  handleLIke = event => {
    event.preventDefault();

    const movie = {
      id: this.state.movie.id,
      likes: this.state.likes + 1
    };

    movieService
      .updateLikeDislike(movie)
      .then(response => {
        this.setState({
          likes: this.state.likes + 1
        });
      })
      .catch(error => {
        if (error.reponse) {
          console.log(error);
        }
      });
  };

  handleDislike = event => {
    event.preventDefault();

    const movie = {
      id: this.state.movie.id,
      dislikes: this.state.dislikes + 1
    };

    movieService
      .updateLikeDislike(movie)
      .then(response => {
        this.setState({
          dislikes: this.state.dislikes + 1
        });
      })
      .catch(error => {
        if (error.reponse) {
          console.log(error);
        }
      });
  };

  handleAddMovieToWatchlist = selectedWatchlist => {
    if (selectedWatchlist.value == "new-list") {
      this.props.history.push("/watchlist/create");
    }
    watchlistService
      .addToWatchlist(this.state.movie, selectedWatchlist.value)
      .then(response => {
        this.setState({
          selectedWatchlist: ""
        });
      })
      .then(function(response) {
        if (response != 500) {
          alert("Movie added to watchlist");
        }
      })
      .catch(error);
  };

  render() {
    const { movie, likes, dislikes } = this.state;

    const options = this.state.watchlists.map(watchlist => ({
      value: watchlist.id,
      label: watchlist.name
    }));

    options.push({ value: "new-list", label: "New watch list" });

    return (
      <div className="container">
        <nav className="header">
        <Link to="/home">
          <h2 className="pocket-imdb">
            Pocket<span className="imdb">IMDB</span>
          </h2>
          </Link>
          <div className="logout-button">
            <Logout />
          </div>
        </nav>
        <div className="movie-container">
          <div>
            <div className="watchlists-select">
              <Select
                value={this.state.selectedWatchlist}
                onChange={this.handleAddMovieToWatchlist}
                options={options}
                placeholder="Add to watchlist"
              />
            </div>
          </div>
          <div className="movie-title">
            <h1 className="bold-title">{movie.title}</h1>
          </div>
          <div className="genre">
            {this.state.genre.name}
          </div>
          <div className="like-dislike-container">
            <div className="like-container">
              <FaThumbsUp className="thumbs-up" onClick={this.handleLIke}/>
              <div className="likes-number"> {likes}</div>
            </div>
            <div className="dislike-container">
              <FaThumbsDown className="thumbs-down" onClick={this.handleDislike} />
              <div className="dislikes-number"> {dislikes}</div>
            </div>
          </div>
          <div className="image-and-description">
            <div className="image-container">
              <img className="image" src={movie.image_url} />
            </div>
            <div className="movie-descritpion">
              <p className="description-font">{movie.description}</p>
            </div>
          </div>
          <div className="times-visited">
            Visited {this.state.timesVisited} times
          </div>
          <div className="comment-container">
            <Comment id={this.state.movie.id} />
          </div>
        </div>
        <div className="related-movies" ><RelatedMovies genre={this.state.genre}/></div>
        <div className="comments-container">
            <Comments comments={this.state.comments} />
          </div>
      </div>
    );
  }
}

export default Movie;
