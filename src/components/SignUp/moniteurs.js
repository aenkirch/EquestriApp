import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import {
  Form,
  Button,
  Grid,
  Message
} from 'semantic-ui-react';

const CreateMoniteurAccountPage = () => (
  <Grid centered columns={2}>
    <Grid.Column>
      <SignUpForm />
    </Grid.Column>
  </Grid>
);

const INITIAL_STATE = {
  lastName: '',
  firstName: '',
  phoneNumber: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`;

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { lastName, firstName, email, passwordOne, phoneNumber } = this.state;
    const isMoniteur = true;
    const isAdmin = false;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase.user(authUser.user.uid).set({
          lastName,
          firstName,
          email,
          phoneNumber,
          isAdmin,
          isMoniteur
        });
      })
      .then(() => {
        return this.props.firebase.doSendEmailVerification();
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      lastName,
      firstName,
      email,
      passwordOne,
      passwordTwo,
      phoneNumber,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '';

    return (
      <div>
        {error && (
          <Message negative>
            <p>{error.message}</p>
          </Message>
        )}
        <Form onSubmit={this.onSubmit}>
          <Form.Field>
            <label>Last Name</label>
            <input
              name="lastName"
              value={lastName}
              onChange={this.onChange}
              type="text"
              placeholder="Last Name"
            />
          </Form.Field>
          <Form.Field>
            <label>First Name</label>
            <input
              name="firstName"
              value={firstName}
              onChange={this.onChange}
              type="text"
              placeholder="First Name"
            />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input
              name="email"
              value={email}
              onChange={this.onChange}
              type="text"
              placeholder="Email Address"
            />
          </Form.Field>
          <Form.Group widths="equal">
            <Form.Field>
              <label>Password</label>
              <input
                name="passwordOne"
                value={passwordOne}
                onChange={this.onChange}
                type="password"
                placeholder="Password"
              />
            </Form.Field>
            <Form.Field>
              <label>Confirm Password</label>
              <input
                name="passwordTwo"
                value={passwordTwo}
                onChange={this.onChange}
                type="password"
                placeholder="Confirm Password"
              />
            </Form.Field>
            <Form.Field>
              <label>Phone</label>
              <input
                name="phoneNumber"
                value={phoneNumber}
                onChange={this.onChange}
                type="number"
                placeholder="telephone"
              />
            </Form.Field>
          </Form.Group>
          <Button primary disabled={isInvalid} type="submit">
            Sign Up
          </Button>
        </Form>
      </div>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default CreateMoniteurAccountPage;

export { SignUpForm, SignUpLink };
