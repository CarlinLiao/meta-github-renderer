import React, { Component } from 'react';

class UserRender extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: props.username,
            searchTerm: props.searchTerm,
            loading: false,
            enterEmpty: true,
            usernameInvalid: true,
            userDoesNotExist: true,
            userHasNoRepos: true,
            data: null,
            rendered: true
        };
        
    }

    componentWillUpdate(nextProps, nextState) {

        nextState.searchTerm = nextProps.searchTerm.trim();
        
        if (nextProps.username !== nextState.username) {
            nextState.username = nextProps.username;
            if (nextProps.username === '') {
                // haven't entered anything
                nextState.enterEmpty = true;
                nextState.usernameInvalid = true;

                nextState.rendered = true;
            } else if (!nextProps.username.match(/([a-z0-9](?:-?[a-z0-9]){0,38})/gi)) {
                // username invalid
                nextState.enterEmpty = false;
                nextState.usernameInvalid = true;

                nextState.rendered = true;
            } else {
                nextState.loading = true;
                nextState.enterEmpty = false;
                nextState.usernameInvalid = false;

                nextState.rendered = false;
            }
            nextState.userDoesNotExist = true;
            nextState.userHasNoRepos = true;
            nextState.data = null;
        }
    }

    componentDidUpdate() {
        if (!this.state.usernameInvalid && this.state.rendered === false) {
            fetch("https://api.github.com/users/" + this.state.username + "/repos")
            .then(resp => resp.json()
            .then(dat => {
                if (dat.message === "Not Found") {
                    this.setState({
                        loading: false,
                        userDoesNotExist: true,
                        data: dat,
                        rendered: true
                    });
                } else if (dat.length === 0) {
                    this.setState({
                        loading: false,
                        userDoesNotExist: false,
                        userHasNoRepos: true,
                        data: dat,
                        rendered: true
                    })
                } else {
                    this.setState({
                        loading: false,
                        userDoesNotExist: false,
                        userHasNoRepos: false,
                        data: dat,
                        rendered: true
                    });
                }
            }));
        }   

    }

    render() {
        if (this.state.loading) {
            return(<p>loading...</p>);
        } else if (this.state.enterEmpty) {
            return(<p></p>);
        } else if (this.state.usernameInvalid) {
            return(<p>Username "{this.state.username}" is not a valid Github username.</p>);
        } else if (this.state.userDoesNotExist) {
            return(<p>User "{this.state.username}" does not exist.</p>);
        } else if (this.state.userHasNoRepos) {
            return(<p>User "{this.state.username}" has no repositories.</p>);
        } else {
            // render stuff

            // decides which repos to list based on searchTerm
            var repos = this.state.data;
            const st = this.state.searchTerm;
            var toMatch = new RegExp(this.state.searchTerm, 'i');
            var hasResult = false;
            repos = repos.map((item,index) => {
                if (!st || (
                        item.name.search(toMatch) > -1 ||
                        (item.description && item.description.search(toMatch) > -1)
                        )) {
                    hasResult = true;
                    return (
                        <tr>
                            <td><a href={item.html_url}>{item.name}</a></td>
                            <td className="count">{item.stargazers_count} stars</td>
                            <td className="count">{item.watchers_count} watchers</td>
                            <td className="count">{item.forks_count} forks</td>
                        </tr>);
                } else {
                    return;
                }
            });
            if (!hasResult) {
                repos = (<p>No results</p>);
            } else {
                repos = (<table><tbody>{repos}</tbody></table>);
            }


            return(
                <div>
                    <p>Repos owned by <a href={this.state.data[0].owner.html_url}>
                        @{this.state.data[0].owner.login}</a>{
                            this.state.searchTerm ? ' containing \'' + this.state.searchTerm + '\' in title or description' : ''
                        }</p>
                    <img src={this.state.data[0].owner.avatar_url} 
                         href={this.state.data[0].owner.html_url}
                         alt={this.state.data[0].owner.login + '\'s avatar'}
                         width="100px"
                         height="100px" />
                    {repos}
                </div>
            );            
        }
    }
}

export default UserRender;