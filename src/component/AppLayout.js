import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CreateWatchlist from './CreateWatchlist';
import Watchlist from './Watchlist';
import Watchlists from './Watchlists';

import Login from '../containers/auth/Login';
import Register from '../containers/auth/Register';
import Home from '../containers/Home';
import { authUser } from '../store/actions/AuthActions';
import { authService } from '../services/AuthService';
import Movie from '../component/Movie';

class AppLayout extends React.Component {
  
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/home" render={()=> authService.isAuthenticated() ? <Home/> : <Redirect to="/login" /> }/>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/movies/:id" component={Movie}/>
          <Route exact path="/watchlist/create" component={CreateWatchlist}/>
          <Route path="/watchlists/:id" component={Watchlist}/>
          <Route exact path="/watchlists" component={Watchlists}/>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authUser
  };
};

const mapDispatchToProps = () => {
  return {
    authUser
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AppLayout)
);
