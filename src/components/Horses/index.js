import React, { Component } from 'react';
import { Loader, Table, Input, Button, Icon } from 'semantic-ui-react';

import { withFirebase } from '../Firebase';

class ManageHorsesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      fullHorsesList: [],
      horses: []
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.horses().on('value', snapshot => {
      const horsesObject = snapshot.val();
      let horsesList = [];

      if (horsesObject) {
        horsesList = Object.keys(horsesObject)
          .map(key => ({
          ...horsesObject[key],
          uid: key,
        }));
      }

      this.setState({
        horses: horsesList,
        fullHorsesList: horsesList,
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
  } // TODO: pouvoir ajouter un cheval

  render() {
    const { horses, loading } = this.state;

    return (
      <div>
        {loading ? (
          <Loader active inline />
        ) : (
          <div>
            <Button icon="add"></Button> <Input onChange={(input) => this.filterTable(input)} icon="search" placeholder="Search...">
            </Input>
            <Table singleLine>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {horses.map((horse, i) => (
                  <Table.Row key={i}>
                    <Table.Cell>{horse.name}</Table.Cell>
                    <Table.Cell>
                      <Button icon color="blue"><Icon name="pencil alternate"/></Button>
                      <Button icon color="red"><Icon name="trash"/></Button>
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

export default withFirebase(ManageHorsesPage);
