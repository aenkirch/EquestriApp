import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';
import { UserList, UserItem } from '../Users';
import * as ROUTES from '../../constants/routes';

const AdminPage = () => (
  <div>
    <Switch>
      <Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem} />
      <Route exact path={ROUTES.SEARCH_CAVALIER} component={UserList} />
    </Switch>
  </div>
);

const condition = authUser =>
  authUser && !!authUser.isAdmin;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(AdminPage);
