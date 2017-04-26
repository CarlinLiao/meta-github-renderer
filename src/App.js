import React, { Component } from 'react';
import HandleHandler from './HandleHandler';
import UserRender from './UserRender';

class App extends Component {
  constructor(props) {
    super(props);
    this.onUsernameSubmit = this.onUsernameSubmit.bind(this);
    this.state = {
      username: ''
    };
  }

  onUsernameSubmit(username) {
      this.setState({
        username
      });
  }

  render() {
    return (
      <div className="App">
        <p>Enter a Github username to render their repos</p>
        <HandleHandler onUsernameSubmit={this.onUsernameSubmit}/>
        <UserRender username={this.state.username} />
      </div>
    );
  }
}

export default App;
