import React, { Component } from 'react'

export default class Login extends Component {
  state = {
    username: ""
  }

  handleInputChange = (event) => this.setState({ username: event.target.value });

  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.state.username) return;

    localStorage.setItem('@CloneApp:username', this.state.username);

    this.props.history.push("/timeline");
  }

  render() {
    return (
      <div>
        <div className="login-wrapper">
          {/* <img src={twitterLogo} alt="Logo" /> */}
          <form onSubmit={this.handleSubmit}>
            <input
              value={this.state.username}
              onChange={this.handleInputChange}
              placeholder="Username"
              type="text"
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    )
  }
}
