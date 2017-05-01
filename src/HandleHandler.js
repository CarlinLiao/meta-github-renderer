import React, { Component } from 'react';

class HandleHandler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            searchTerm: '',
            comparisonUser: ''
        };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
        this.handleComparisonUserChange = this.handleComparisonUserChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsernameChange(event) {
        this.setState({username: event.target.value});
    }

    handleSearchTermChange(event) {
        this.setState({searchTerm: event.target.value});
    }

    handleComparisonUserChange(event) {
        this.setState({comparisonUser: event.target.value});
    }

    handleSubmit(event) {
        this.props.onSubmit(this.state);
        event.preventDefault();
    }

    render() {


        return (
            <form onSubmit={this.handleSubmit}>
                <table><tbody>
                    <tr>
                        <td>Username:</td>
                        <td><input className="texty" id="entry" type="text"
                            value={this.state.username} onChange={this.handleUsernameChange} /></td>
                    </tr>
                    <tr>
                        <td>Search term:</td>
                        <input className="texty" id="entry" type="text" placeholder="optional" 
                            value={this.state.searchTerm} onChange={this.handleSearchTermChange} />
                    </tr>
                    <tr>
                        <td>User to compare:</td>
                        <input className="texty" id="entry" type="text" placeholder="optional" 
                            value={this.state.comparisonUser} onChange={this.handleComparisonUserChange} />
                    </tr>
                </tbody></table>
                <input className="texty" type="submit" value="Render" />
            </form>
        );
    }
}

export default HandleHandler;