import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { reduxForm, Field, propTypes } from "redux-form";
import * as actions from "../../actions";
import { required } from "./validation";

class Signup extends Component {

    static propTypes = {
        ...propTypes,
        signupUser: PropTypes.func,
        errorMessage: PropTypes.string
    };

    handleFormSubmit(values) {
        // Call action creator to sign up the user.
        const { email, password } = values;
        this.props.signupUser(email, password);
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

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <string>Oops!</string> {this.props.errorMessage}
                </div>
            )
        }
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <div className="row justify-content-center">
                <form
                    className="col col-sm-4 card mt-5 p-2"
                    onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
                >
                    <fieldset className="form-group">
                        <Field name="email" label="Email" component={this.renderField}
                               type="text" validate={[required]}/>
                    </fieldset>


                    <fieldset className="form-group">
                        <Field name="password" label="Password" component={this.renderField}
                               type="password" validate={[required]}/>
                    </fieldset>

                    <fieldset className="form-group">
                        <Field name="passwordConfirm" label="Confirm Password" component={this.renderField}
                               type="password" validate={[required]}/>
                    </fieldset>

                    <fieldset className="form-group">
                        {this.renderAlert()}
                        <button action="submit" className="btn btn-primary">Sign Up</button>
                    </fieldset>
                </form>
            </div>
        );
    }
}

// Sync field level validation for password match
const validateForm = values => {
    const errors = {};
    const { password, passwordConfirm } = values;
    if (password !== passwordConfirm) {
        errors.passwordConfirm = "Password does not match."
    }
    return errors;
};

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, actions)(reduxForm({
    form: "signup",
    validate: validateForm
})(Signup));
