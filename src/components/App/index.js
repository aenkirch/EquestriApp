import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import SignUpPage from '../SignUp/';
import CreateMoniteurAccountPage from '../SignUp/moniteurs';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import ManageHorsesPage from '../Horses';
import ManageReprisesPage from '../Reprises/manage';
import RegisterReprisesPage from '../Reprises/register';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

import { Container } from 'semantic-ui-react';

const App = () => (
  <Router>
    <div>
      <Navigation />
      <Container>
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route
          path={ROUTES.PASSWORD_FORGET}
          component={PasswordForgetPage}
        />
        <Route exact path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.SEARCH_CAVALIER} component={AdminPage} />
        <Route path={ROUTES.CREATE_ACCOUNT_FOR_MONITEURS} component={CreateMoniteurAccountPage} />
        <Route path={ROUTES.MANAGE_HORSES} component={ManageHorsesPage} />
        <Route path={ROUTES.MANAGE_REPRISES} component={ManageReprisesPage} />
        <Route path={ROUTES.REGISTER_REPRISES} component={RegisterReprisesPage} />
      </Container>
    </div>
  </Router>
);

export default withAuthentication(App);
