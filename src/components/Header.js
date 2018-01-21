import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Header extends Component {

    static propTypes = {
        authenticated: PropTypes.bool
    };

    renderLinks() {
        if (this.props.authenticated) {
            return (
                <li className="nav-item">
                    <Link className="nav-link" to="/signout">Sign Out</Link>
                </li>
            )

        } else {
            return (
                [
                    <li className="nav-item" key="1">
                        <Link className="nav-link" to="/signin">Sign In</Link>
                    </li>,
                    <li className="nav-item" key="2">
                        <Link className="nav-link" to="/signup">Sign Up</Link>
                    </li>
                ]
            )

        }
    }

    render() {
        return (
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <Link to="/" className="navbar-brand">Redux Auth</Link>
                <ul className="navbar-nav">
                    {this.renderLinks()}
                </ul>
            </nav>
        )
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated
    }
}
export default connect(mapStateToProps)(Header);