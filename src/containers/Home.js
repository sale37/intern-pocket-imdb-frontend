import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getMovies } from '../store/actions/MovieActions';
import Logout from './auth/Logout';
import Movies from '../component/Movies';
import '../styles/css/Home.css'

class Home extends Component {
 
  render() {
    return (
      <div className="container">
        <div className="Logout">
          <Logout />
        </div>
        <div className="OuterHeading">
          <div className="ImdbHeading">
            <h3 className="ParagraphHeading">
              Welcome to Pocket <span className="Imdb">IMDb</span>
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
