import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';
import { UserList, UserItem } from '../Users';
import * as ROUTES from '../../constants/routes';

import { Header } from 'semantic-ui-react';

const AdminPage = () => (
  <div>
    <Header as="h2">Admin</Header>

    <Switch>
      <Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem} />
      <Route exact path={ROUTES.ADMIN} component={UserList} />
    </Switch>
  </div>
);

const condition = authUser =>
  authUser && !!authUser.isAdmin;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(AdminPage);
