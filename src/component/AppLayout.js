import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Login from '../containers/auth/Login';
import Register from '../containers/auth/Register';
import Home from '../containers/Home';
import { authUser } from '../store/actions/AuthActions';
import { authService } from '../services/AuthService';

class AppLayout extends React.Component {
  // componentDidUpdate(prevProps) {
  //   if (this.props.user !== prevProps.user) {
  //     if (this.props.user) {
  //       this.props.history.push('/home');
  //     } else {
  //       this.props.history.push('/login');
  //     }
  //   }
  // }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/home" render={()=> authService.isAuthenticated() ? <Home/> : <Redirect to="/login" /> }/>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
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