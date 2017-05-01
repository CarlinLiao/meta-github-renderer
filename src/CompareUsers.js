import React, { Component } from 'react';

class CompareUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user1: {
                name: props.user1,
                enterEmpty: true,
                usernameInvalid: true,
                userDoesNotExist: true,
                userHasNoFollowers: true,
                saved: false,
                loading: false,
                data: null
            },
            user2: {
                name: props.user2,
                enterEmpty: true,
                usernameInvalid: true,
                userDoesNotExist: true,
                userHasNoFollowers: true,
                saved: false,
                loading: false,
                data: null
            }
        };
        this.usernameChecker = this.usernameChecker.bind(this);        
    }

    // modifies 
    usernameChecker(name, attr) {
        attr.name = name;
        if (name === '') {
            // haven't entered anything
            attr.enterEmpty = true;
            attr.usernameInvalid = true;

            attr.saved = true;
        } else if (!name.match(/([a-z0-9](?:-?[a-z0-9]){0,38})/gi)) {
            // username invalid
            attr.enterEmpty = false;
            attr.usernameInvalid = true;

            attr.saved = true;
        } else {
            attr.loading = true;
            attr.enterEmpty = false;
            attr.usernameInvalid = false;

            attr.saved = false;
        }
        attr.userDoesNotExist = true;
        attr.userHasNoFollowers = true;
        attr.data = null;
    }

    componentWillUpdate(nextProps, nextState) {
        
        if (nextProps.user1 && nextProps.user1 !== nextState.user1.name) {
            this.usernameChecker(nextProps.user1, nextState.user1);
        }
        
        if (nextProps.user2 && nextProps.user2 !== nextState.user2.name) {
            this.usernameChecker(nextProps.user2, nextState.user2); 
        }
        
        // if (nextProps.user1 !== nextState.user1.name) {
        //     nextState.user1.name = nextProps.user1;
        //     if (nextProps.user1.name === '') {
        //         // haven't entered anything
        //         nextState.user1.enterEmpty = true;
        //         nextState.user1.usernameInvalid = true;

        //         nextState.user1.saved = true;
        //     } else if (!nextProps.user1.name.match(/([a-z0-9](?:-?[a-z0-9]){0,38})/gi)) {
        //         // username invalid
        //         nextState.user1.enterEmpty = false;
        //         nextState.user1.usernameInvalid = true;

        //         nextState.user1.saved = true;
        //     } else {
        //         nextState.user1.loading = true;
        //         nextState.user1.enterEmpty = false;
        //         nextState.user1.usernameInvalid = false;

        //         nextState.user1.saved = false;
        //     }
        //     nextState.user1.userDoesNotExist = true;
        //     nextState.user1.userHasNoFollowers = true;
        //     nextState.user1.data = null;
        // }
    }

    componentDidUpdate() {
        if (!this.state.user1.usernameInvalid && this.state.user1.saved === false) {
            fetch("https://api.github.com/users/" + this.state.user1.name + "/followers")
            .then(resp => resp.json()
            .then(dat => {
                if (dat.message === "Not Found") {
                    // user1 does not exist
                    this.setState({
                        user1 : {
                            loading: false,
                            userDoesNotExist: true,
                            data: dat,
                            saved: true,

                            // hack to preserve data fields
                            name: this.state.user1.name,
                            enterEmpty: false,
                            usernameInvalid: false,
                            userHasNoFollowers: true
                        }
                    });
                } else if (dat.length === 0) {
                    this.setState({
                        user1: {
                            loading: false,
                            userDoesNotExist: false,
                            userHasNoFollowers: true,
                            data: dat,
                            saved: true,

                            // this is a bad hack
                            name: this.state.user1.name,
                            enterEmpty: false,
                            usernameInvalid: false
                        }
                    })
                } else {
                    this.setState({
                        user1: {
                            loading: false,
                            userDoesNotExist: false,
                            userHasNoFollowers: false,
                            data: dat,
                            saved: true,

                            // still bad hack
                            name: this.state.user1.name,
                            enterEmpty: false,
                            usernameInvalid: false
                        }
                    });
                }
            }));
        }

        if (!this.state.user2.usernameInvalid && this.state.user2.saved === false) {
            fetch("https://api.github.com/users/" + this.state.user2.name + "/followers")
            .then(resp => resp.json()
            .then(dat => {
                if (dat.message === "Not Found") {
                    // user2 does not exist
                    this.setState({
                        user2 : {
                            loading: false,
                            userDoesNotExist: true,
                            data: dat,
                            saved: true,

                            // hack to preserve data fields
                            name: this.state.user2.name,
                            enterEmpty: false,
                            usernameInvalid: false,
                            userHasNoFollowers: true
                        }
                    });
                } else if (dat.length === 0) {
                    // no followers
                    this.setState({
                        user2: {
                            loading: false,
                            userDoesNotExist: false,
                            userHasNoFollowers: true,
                            data: dat,
                            saved: true,

                            // this is a bad hack
                            name: this.state.user2.name,
                            enterEmpty: false,
                            usernameInvalid: false
                        }
                    })
                } else {
                    this.setState({
                        user2: {
                            loading: false,
                            userDoesNotExist: false,
                            userHasNoFollowers: false,
                            data: dat,
                            saved: true,

                            // still bad hack
                            name: this.state.user2.name,
                            enterEmpty: false,
                            usernameInvalid: false
                        }
                    });
                }
            }));
        }
    }

    render() {
        if (this.state.user1.loading || this.state.user2.loading) {
            return(<p></p>);
        } else if (this.state.user1.enterEmpty || this.state.user1.usernameInvalid || this.state.user1.userDoesNotExist || 
                    this.state.user2.enterEmpty) { // don't repeat warnings for user1
            return(<p></p>);
        } else if (this.state.user2.usernameInvalid) {
            return(<p>"{this.state.user2.name}" is not a valid Github username.</p>);
        } else if (this.state.user2.userDoesNotExist) {
            return(<p>User "{this.state.user2.name}" does not exist.</p>);
        } if (this.state.user1.userHasNoFollowers) {
            return(<p>User "{this.state.user1.name}" has no followers.</p>);
        } if (this.state.user2.userHasNoFollowers) {
            return(<p>User "{this.state.user2.name}" has no followers.</p>);
        } else { // render stuff
            var commonFollowers = [];
            var hasResult = false;
            var user2data = this.state.user2.data;
            this.state.user1.data.forEach(function(follower1) {
                user2data.forEach(function(follower2) {
                    if (follower1.id === follower2.id) {
                        hasResult = true;
                        commonFollowers.push(<li>@<a href={follower1.html_url}>{follower1.login}</a></li>);
                    }
                });
            });
            if (!hasResult) {
                commonFollowers = (<p>no one</p>);
            } else {
                commonFollowers = (<ul>{commonFollowers}</ul>);
            }

            return(
                <div>
                    <p className="followerHeader">{this.state.user1.name} and {this.state.user2.name} are both followed by:</p>
                    {commonFollowers}
                </div>
            );            
        }
    }
}

export default CompareUsers;