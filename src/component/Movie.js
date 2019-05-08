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
      dislikes: ""
    };
  }

  componentDidMount() {
    const movieId = this.props.match.params.id;

    movieService.showMovie(movieId).then(response => {
      this.setState({
        movie: response.data,
        likes: response.data.likes,
        dislikes: response.data.dislikes
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
        <div className="MovieContainer">
          <div className="ImageContainer">
            <img className="Image" src={movie.image_url} />
          </div>
          <div className="MovieTitle">
            <h1 className="BoldTitle">{movie.title}</h1>
          </div>
          <div className="MovieDescritpion">
            <p className="DescriptionFont">{movie.description}</p>
            <button onClick={this.handleLIke}>Like: {likes}</button>
            <button onClick={this.handleDislike}>Dislike: {dislikes}</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Movie;
