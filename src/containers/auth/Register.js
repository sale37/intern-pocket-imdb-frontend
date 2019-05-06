import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { register } from '../../store/actions/AuthActions';

class Register extends Component {
  state = {
    email: '',
    password: '',
    name: ''
  };

  handleInputChange = field => event => this.setState({ [field]: event.target.value });

  submit = event => {
    event.preventDefault();

    let registerData = {
      email: this.state.email,
      password: this.state.password,
      name: this.state.name
    };
    this.props.register(registerData);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.submit}>
          <h2>Register</h2>
          <input
            type="text"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleInputChange('email')}
          />
          <input
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleInputChange('password')}
          />
          <input
            type="text"
            placeholder="Name"
            value={this.state.name}
            onChange={this.handleInputChange('name')}
          />
          <input type="submit" value="Register" />
          {this.props.registerError && <p>registerError</p>}
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    registerError: state.error.registerError
  };
};

const mapDispatchToProps = {
  register
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Register)
);
