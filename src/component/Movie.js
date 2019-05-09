import React, { Component } from "react";
import { movieService } from "../services/MovieService";
import "../styles/css/Movie.css";
import { error } from "util";

class Movie extends Component {
  constructor() {
    super();
    this.state = {
      movie: {},
      likes: "",
      dislikes: "",
      timesVisited: 0
    };
  }

  componentDidMount() {
    const movieId = this.props.match.params.id;

    movieService.showMovie(movieId).then(response => {
      this.setState({
        movie: response.data,
        likes: response.data.likes,
        dislikes: response.data.dislikes,
        timesVisited: response.data.timesVisited
      });
    });

  }

  handleLIke = event => {
    event.preventDefault();

    const movie = {
      id: this.state.movie.id,
      likes: this.state.likes + 1
    };

    movieService.updateLikeDislike(movie).then(response => {
      this.setState({
        likes: this.state.likes + 1
      })
    }).catch((error) => {
      if(error.reponse){
        console.log(error);
      }
    })
  };

  handleDislike = event => {
    event.preventDefault();

    const movie = {
      id: this.state.movie.id,
      dislikes: this.state.dislikes + 1
    };

    movieService.updateLikeDislike(movie).then(response => {
      this.setState({
        dislikes: this.state.dislikes + 1
      })
    }).catch((error) => {
      if(error.reponse){
        console.log(error);
      }
    })
  };

  render() {
    const { movie, likes, dislikes } = this.state;
    
    return (
      <div className="container">
        <div className="movie-container">
          <div className="image-container">
            <img className="image" src={movie.image_url} />
          </div>
          <div className="movie-title">
            <h1 className="bold-title">{movie.title}</h1>
          </div>
          <div className="movie-descritpion">
            <p className="description-font">{movie.description}</p>
            <button onClick={this.handleLIke}>Like: {likes}</button>
            <button onClick={this.handleDislike}>Dislike: {dislikes}</button>
            <div className="times-visited">Visited {this.state.timesVisited} times</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Movie;
