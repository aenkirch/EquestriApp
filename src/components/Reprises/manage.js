import React, { Component } from 'react';
import { Loader, Table, Input, Button, Icon, Segment, Grid, Divider } from 'semantic-ui-react';

import { withFirebase } from '../Firebase';

class ManageReprisesPage extends Component {
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
    for (let i = 0 ; i < this.state.fullHorsesList.length ; i++) {
      if (this.state.fullHorsesList[i].name.startsWith(input.target.value))
        temp.push(this.state.fullUsersList[i]);
    }
    this.setState({horses: temp});
  }

  createHorse (input) {
    this.props.firebase.horses().push({
      name: input.target.value,
    });
  }

  renameHorse (input, horse) {
    this.props.firebase.horse(horse.uid).set({
      name: input.target.value
    });
  }

  deleteHorse (horse) {
    this.props.firebase.horse(horse.uid).remove();
  }

  render() {
    const { horses, loading } = this.state;

    return (
      <div>
        {loading ? (
          <Loader active inline />
        ) : (
          <div>
            <Segment>
              <Grid columns={2} relaxed='very'>
                <Grid.Column>
                  <Input fluid 
                    onKeyPress={event => {
                      if (event.key === 'Enter') {
                        this.createHorse(event)
                      }
                    }}
                    icon="add" 
                    placeholder="Créer cheval"
                  >
                  </Input>
                </Grid.Column>
                <Grid.Column>
                  <Input fluid onChange={(input) => this.filterTable(input)} icon="search" placeholder="Search...">
                  </Input>
                </Grid.Column>
              </Grid>
              <Divider vertical fitted />
            </Segment>
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
                      <Input onKeyPress={event => {
                        if (event.key === 'Enter') {
                          this.renameHorse(event, horse)
                        }
                      }} icon="pencil" placeholder="Rename..." style={{marginRight: "2%"}}>
                      </Input>
                      <Button icon color="red" onClick={() => this.deleteHorse(horse)}><Icon name="trash"/></Button>
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

export default withFirebase(ManageReprisesPage);
