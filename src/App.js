import React, { Component } from 'react';
import HandleHandler from './HandleHandler';
import UserRender from './UserRender';
import CompareUsers from './CompareUsers';

class App extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
        username: '',
        searchTerm: '',
        comparisonUser: ''
    };
  }

  onSubmit(handlerProps) {
      this.setState(handlerProps);
  }

  render() {
    return (
      <div className="App">
        <p>Enter a Github username to render their repos</p>
        <HandleHandler onSubmit={this.onSubmit}/>
        <UserRender username={this.state.username} searchTerm={this.state.searchTerm}/>
        <CompareUsers user1={this.state.username} user2={this.state.comparisonUser}/>
      </div>
    );
  }
}

export default App;
