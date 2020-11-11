import React, { Component } from 'react';
import { Loader, Table, Input } from 'semantic-ui-react';

import { withFirebase } from '../Firebase';

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
      fullUsersList: [],
      users: []
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.cavaliers().on('value', snapshot => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));

      this.setState({
        users: usersList,
        fullUsersList: usersList,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  filterTable (input) {
    let temp = [];
    for (let i = 0 ; i < this.state.fullUsersList.length ; i++) {
      if (this.state.fullUsersList[i].email.startsWith(input.target.value) || this.state.fullUsersList[i].firstName.startsWith(input.target.value) || this.state.fullUsersList[i].lastName.startsWith(input.target.value))
        temp.push(this.state.fullUsersList[i]);
    }
    this.setState({users: temp});
  }

  render() {
    const { users, loading } = this.state;

    return (
      <div>
        {loading ? (
          <Loader active inline />
        ) : (
          <div>
            <Input onChange={(input) => this.filterTable(input)} fluid icon="search" placeholder="Search...">
            </Input>
            <Table singleLine>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Last Name</Table.HeaderCell>
                  <Table.HeaderCell>First Name</Table.HeaderCell>
                  <Table.HeaderCell>Email Address</Table.HeaderCell>
                  <Table.HeaderCell>Phone Number</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {users.map((user, i) => (
                  <Table.Row key={i}>
                    <Table.Cell>{user.lastName}</Table.Cell>
                    <Table.Cell>{user.firstName}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>{user.phoneNumber}</Table.Cell>
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
