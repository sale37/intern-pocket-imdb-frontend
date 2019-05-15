import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from "react-router-dom";

import { getMovies } from '../store/actions/MovieActions';
import Logout from './auth/Logout';
import Movies from '../component/Movies';
import '../styles/css/Home.css'


class Home extends Component {
 
  render() {
    return (
      <div className="container">
      <nav className="header">
        <Link to="/home">
          <h2 className="pocket-imdb">
            Pocket<span className="imdb">IMDB</span>
          </h2>
          </Link>
          <div className="buttons">
          <Link to="/watchlists"><button>Watchlists</button></Link>
            <Logout />
          </div>
        </nav>
        <div>
          <Movies/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    movies: state.movie.all
  };
};

const mapDispatchToProps = {
  getMovies
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
);
