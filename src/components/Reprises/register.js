import React, { Component } from 'react';
import { Button, Header, Loader, Table } from 'semantic-ui-react';

import { withFirebase } from '../Firebase';

class RegisterReprisesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      fullReprisesList: [],
      reprises: []
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.reprises().on('value', snapshot => {
      const reprisesObject = snapshot.val();
      let reprisesList = [];

      if (reprisesObject) {
        reprisesList = Object.keys(reprisesObject)
          .map(key => ({
          ...reprisesObject[key],
          uid: key,
        }));
      }

      console.log(reprisesList);

      this.setState({
        reprises: reprisesList,
        fullReprisesList: reprisesList,
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

  render() {
    const { reprises, loading } = this.state;

    return (
      <div>
        {loading ? (
          <Loader active inline />
        ) : (
          <div>
            <Header>Reprises disponibles</Header>
            <Table singleLine>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Nom de la reprise</Table.HeaderCell>
                  <Table.HeaderCell>Horaires</Table.HeaderCell>
                  <Table.HeaderCell>Jours</Table.HeaderCell>
                  <Table.HeaderCell>Chevaux disponibles</Table.HeaderCell>
                  <Table.HeaderCell>Niveaux acceptés</Table.HeaderCell>
                  <Table.HeaderCell>M'inscrire</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {reprises.map((reprise, i) => (
                  <Table.Row key={i}>
                    <Table.Cell>{reprise.name}</Table.Cell>
                    <Table.Cell>{reprise.startTime[i + 1]} - {reprise.endTime[i + 1]}</Table.Cell>
                    <Table.Cell>{reprise.selectedTimeTable[i + 1]}</Table.Cell>
                    <Table.Cell>{reprise.selectedHorsesUid[i]}</Table.Cell>
                    <Table.Cell>{reprise.selectedNiveaux.toString()}</Table.Cell>
                    <Table.Cell><Button>OK</Button></Table.Cell>
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

export default withFirebase(RegisterReprisesPage);
