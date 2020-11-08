import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import { Header, Loader, Table, Button, Input } from 'semantic-ui-react';

/*
  *
  * Cette classe est utilisée pour l'affichage et la recherche des cavaliers
  * 
*/

class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.cavaliers().on('value', snapshot => {
      const usersObject = snapshot.val();

      console.log(usersObject);

      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));

      this.setState({
        users: usersList,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  // TODO: finir le Input qui va trier parmi les cavaliers 

  render() {
    const { users, loading } = this.state;

    return (
      <div>
        <Header as="h2">Users</Header>
        {loading ? (
          <Loader active inline />
        ) : (
          <div>
            <Input fluid icon="search" placeholder="Search...">
            </Input>
            <Table singleLine>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Last Name</Table.HeaderCell>
                  <Table.HeaderCell>First Name</Table.HeaderCell>
                  <Table.HeaderCell>Email Address</Table.HeaderCell>
                  <Table.HeaderCell>Phone Number</Table.HeaderCell>
                  <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {users.map((user, i) => (
                  <Table.Row key={i}>
                    <Table.Cell>{user.lastName}</Table.Cell>
                    <Table.Cell>{user.firstName}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>{user.phoneNumber}</Table.Cell>
                    <Table.Cell>
                      <Button
                        primary
                        as={Link}
                        to={{
                          pathname: `${ROUTES.ADMIN}/${user.uid}`,
                          state: { user },
                        }}
                      >
                        Details
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        )}
      </div>
    );
  }
}

export default withFirebase(UserList);
