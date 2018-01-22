import React, { Component } from "react";
import PropTypes from "prop-types";
import { reduxForm, Field, propTypes } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../../actions";
import { required } from "./validation";

class Signin extends Component {

    static propTypes = {
        ...propTypes,
        signinUser: PropTypes.func,
        errorMessage: PropTypes.string
    };

    handleFormSubmit(e, username, password) {
        console.log(e, " this is e")
        this.props.signinUser({ username, password});
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <string>Oops!</string> {this.props.errorMessage}
                </div>
            )
        }
    }

    renderField = ({ input, label, type, meta: { touched, error } }) => (
        <div>
            <label>{label}</label>
            <div>
                <input className="form-control" {...input} type={type}/>
            </div>
            {touched && ((error && <div className="alert alert-danger p-1"><small>{error}</small></div>))}
        </div>
    );

    render() {
        console.log("signin rendered")
        const {handleSubmit} = this.props;
        return (
            <div className="row justify-content-center">

                <form
                    className="col col-sm-4 card mt-5 p-2"
                    
                    onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
                >
                    <h4 className="text-md-center">Please Sign In</h4>
                    <hr/>

                    <fieldset className="form-group">
                        <Field name="username" label="Username" component={this.renderField}
                               type="text" validate={[required]}/>
                    </fieldset>


                    <fieldset className="form-group">
                        <Field name="password" label="Password" component={this.renderField}
                               type="password" validate={[required]}/>
                    </fieldset>

                    <fieldset className="form-group">
                        {this.renderAlert()}
                    <button action="submit" className="btn btn-primary">Sign In</button>
                    </fieldset>
                    <p>Not registered? <Link to="/signup">Signup Here!</Link></p>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, actions)(reduxForm({
    form: "signin"
})(Signin));
