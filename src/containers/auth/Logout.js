import React, { Component } from "react";
import { authService } from "../../services/AuthService";
import { withRouter } from 'react-router-dom';


class Logout extends Component {
  constructor(props) {
    super(props);
    

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout= event => {
    event.preventDefault();

    const { history } = this.props;

    authService
      .logout()
      .then(res => history.push("/login"));

  }

  render() {
    return <button onClick={this.handleLogout}>Logout</button>;
  }
}

export default withRouter(Logout);