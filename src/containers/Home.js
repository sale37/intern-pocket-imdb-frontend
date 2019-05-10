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
        <div className="logout-watchlist">
        <Link to="/watchlists"><button>Watchlists</button></Link>
          <Logout />
        </div>
        <div className="outer-heading">
          <div className="imdb-heading">
            <h3 className="paragraph-heading">
              Welcome to Pocket <span className="imdb">IMDb</span>
            </h3>
          </div>
        </div>
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
