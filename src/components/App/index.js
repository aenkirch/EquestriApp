import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp/';
import CreateMoniteurAccountPage from '../SignUp/moniteurs';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

import { Container } from 'semantic-ui-react';

const App = () => (
  <Router>
    <div>
      <Navigation />
      <Container>
        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route
          path={ROUTES.PASSWORD_FORGET}
          component={PasswordForgetPage}
        />
        <Route path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.SEARCH_CAVALIER} component={AdminPage} />
        <Route path={ROUTES.CREATE_ACCOUNT_FOR_MONITEURS} component={CreateMoniteurAccountPage} />
      </Container>
    </div>
  </Router>
);

export default withAuthentication(App);
