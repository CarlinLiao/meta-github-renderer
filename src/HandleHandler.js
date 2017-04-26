import React, { Component } from 'react';

class HandleHandler extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        this.props.onUsernameSubmit(this.state.value)
        event.preventDefault();
    }

    render() {


        return (
            <form onSubmit={this.handleSubmit}>
                <label>Username:</label>
                <input className="texty" id="entry" type="text" value={this.state.value} onChange={this.handleChange} />
                <input className="texty" type="submit" value="Render" />
            </form>
        );
    }
}

export default HandleHandler;