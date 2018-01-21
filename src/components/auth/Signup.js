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
        const { email, password, confirm_password,first_name, last_name, phone, dob, address,id_proof, is_agent } = values;
        this.props.signupUser(email, password, confirm_password, first_name,last_name, phone, dob, address, id_proof, is_agent);
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
                        <Field name="username" label="Username" component={this.renderField}
                               type="text" validate={[required]}/>
                    </fieldset>
                    <fieldset className="form-group">
                        <Field name="password" label="Password" component={this.renderField}
                               type="password" validate={[required]}/>
                    </fieldset>

                    <fieldset className="form-group">
                        <Field name="confirm_password" label="Confirm Password" component={this.renderField}
                               type="password" validate={[required]}/>
                    </fieldset>

                    <fieldset className="form-group">
                        <Field name="first_name" label="First Name" component={this.renderField}
                               type="text" validate={[required]}/>
                    </fieldset>

                    <fieldset className="form-group">
                        <Field name="last_name" label="Last Name" component={this.renderField}
                               type="text" validate={[required]}/>
                    </fieldset>

                    <fieldset className="form-group">
                        <Field name="phone" label="Phone Number" component={this.renderField}
                               type="text" validate={[required]}/>
                    </fieldset>

                    <fieldset className="form-group">
                        <Field name="address" label="Address" component={this.renderField}
                               type="text" validate={[required]}/>
                    </fieldset>

                    <fieldset className="form-group">
                        <Field name="id_proof" label="Upload your id" component={this.renderField}
                               type="text" validate={[required]}/>
                    </fieldset>

                    <fieldset className="form-group">
                        <Field name="dob" label="dob" component={this.renderField}
                               type="text" validate={[required]}/>
                    </fieldset>

                    <fieldset className="form-group">
                        <Field name="is_agent" label="Are you an agent?" component={this.renderField}
                               type="text" validate={[required]}/>
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
