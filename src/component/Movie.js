import React, { Component } from "react";
import { movieService } from "../services/MovieService";
import "../styles/css/Movie.css";

class Movie extends Component {
  constructor() {
    super();
    this.state = {
      movie: {},
    };
  }

  componentDidMount() {
    const movieId = this.props.match.params.id;

    movieService.showMovie(movieId).then(response => {
      this.setState({
        movie: response.data
      });
    });
  }

  

  render() {
    const { movie } = this.state;

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
            
          </div>
        </div>
      </div>
    );
  }
}

export default Movie;
