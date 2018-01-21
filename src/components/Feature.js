import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as actions from "../actions";

class Feature extends Component {
    static propTypes = {
        fetchMessage: PropTypes.func,
        message: PropTypes.string
    };

    componentWillMount() {
        this.props.fetchMessage();
    }

    render() {
        return (
            <h2>{ this.props.message }</h2>
        );
    }
}

function mapStateToProps(state) {
    return {
        message: state.auth.message
    };
}
export default connect(mapStateToProps, actions)(Feature);
