import React from 'react';
import { Link } from 'react-router-dom';

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';

import { Container, Menu } from 'semantic-ui-react';

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? (
        <NavigationAuth authUser={authUser} />
      ) : (
        <NavigationNonAuth />
      )
    }
  </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => (
  <Menu pointing secondary>
    <Container>
      <Menu.Item name="home" as={Link} to={ROUTES.HOME} />
      <Menu.Item name="Account" as={Link} to={ROUTES.ACCOUNT} />
      {!!authUser.isMoniteur && (
          <Menu.Item name="gérer mes cours" as={Link} to={ROUTES.MANAGE_REPRISES} />          
      )}
      {(!authUser.isMoniteur && !authUser.isAdmin) && (
          <Menu.Item name="inscription aux cours" as={Link} to={ROUTES.REGISTER_REPRISES} />          
      )}
      {!!authUser.isAdmin && (
          <Menu.Item name="rechercher un cavalier" as={Link} to={ROUTES.SEARCH_CAVALIER} />          
      )}
      {!!authUser.isAdmin && (
          <Menu.Item name="creer compte pour un moniteur" as={Link} to={ROUTES.CREATE_ACCOUNT_FOR_MONITEURS} />       
      )}
      {!!authUser.isAdmin && (
          <Menu.Item name="gerer les chevaux" as={Link} to={ROUTES.MANAGE_HORSES} />       
      )}
      <SignOutButton />
    </Container>
  </Menu>
);

const NavigationNonAuth = () => (
  <Menu pointing secondary>
    <Container>
      <Menu.Menu position="right">
        <Menu.Item name="signin" as={Link} to={ROUTES.SIGN_IN} />
      </Menu.Menu>
    </Container>
  </Menu>
);

export default Navigation;
