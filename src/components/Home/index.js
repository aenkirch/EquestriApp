import React from 'react';
import { compose } from 'recompose';

import { AuthUserContext, withAuthorization, withEmailVerification } from '../Session';

const HomePage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
    <div>
      <h1>Welcome back {authUser.email}</h1>
      <p></p>
    </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(HomePage);
