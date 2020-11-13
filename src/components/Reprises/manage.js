import React, { Component } from 'react';
import { Header, Loader, Grid, Input, Select, Button, Icon } from 'semantic-ui-react';

import { withFirebase } from '../Firebase';

const joursSemaine = [
  { key: 'lundi', value: 'lundi', text: 'Lundi' },
  { key: 'mardi', value: 'mardi', text: 'Mardi' },
  { key: 'mercredi', value: 'mercredi', text: 'Mercredi' },
  { key: 'jeudi', value: 'jeudi', text: 'Jeudi' },
  { key: 'vendredi', value: 'vendredi', text: 'Vendredi' },
  { key: 'samedi', value: 'samedi', text: 'Samedi' },
  { key: 'dimanche', value: 'dimanche', text: 'Dimanche' },
];

const niveauxCavalier = [
  { key: '1', value: '1', text: '1' },
  { key: '2', value: '2', text: '2' },
  { key: '3', value: '3', text: '3' },
  { key: '4', value: '4', text: '4' },
  { key: '5', value: '5', text: '5' },
  { key: '6', value: '6', text: '6' },
  { key: '7', value: '7', text: '7' },
];

class ManageReprisesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      fullHorsesList: [],
      horses: [],
      selectedHorses: [],
      selectedNiveauxReprise: [],
      selectedTimeTable: [],
      numberOfClasses : 1,
      startTime: [],
      endTime: [],
      repriseName: ''
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.horses().on('value', snapshot => {
      const horsesObject = snapshot.val();
      let horsesList = [];

      if (horsesObject) {
        horsesList = Object.keys(horsesObject)
          .map((key, value) => ({
          ...horsesObject[key],
          uid: key,
          key: key,
          value: key,
          text: horsesObject[key].name
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

  onChange = (e, data, stateValueToChange, index) => {
    index = index + 1;
    if (index) {
      let new_state = Object.assign({}, this.state[stateValueToChange]);
      new_state[index] = data.value;
      console.log(new_state);
      this.setState({ [stateValueToChange]: new_state });
    }
    else
      this.setState({ [stateValueToChange]: data.value });
  }

  onChangeForInput = (e, data, stateValueToChange, index) => {
    index = index + 1;
    if (index) {
      let new_state = Object.assign({}, this.state[stateValueToChange]);
      new_state[index] = data.target.value;
      this.setState({ [stateValueToChange]: new_state });
    }
    else
      this.setState({ [stateValueToChange]: data.target.value });
  }

  increaseNumberOfClasses = () => {
    this.setState({ numberOfClasses: this.state.numberOfClasses + 1 });
  }

  decreaseNumberOfClasses = () => {
    this.setState({ numberOfClasses: this.state.numberOfClasses - 1 });
  }

  createReprise = () => {
    this.props.firebase.reprises().push({
      name: this.state.repriseName,
      selectedNiveaux: this.state.selectedNiveauxReprise,
      selectedHorsesUid: this.state.selectedHorses,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      selectedTimeTable: this.state.selectedTimeTable
    });
    alert("Reprise créée");
  }
  
  render() {
    const { horses, selectedHorses, selectedNiveauxReprise, selectedTimeTable, numberOfClasses, loading } = this.state;

    return (
      <div>
        {loading ? (
          <Loader active inline />
        ) : (
          <div>
            <Header>Créer une reprise</Header>
            <Grid columns={4}>
              <Grid.Row>
                <Grid.Column>
                  <Input type="text" placeholder="Nom de la reprise à créer" onChange={(input) => this.onChangeForInput(null, input, "repriseName")}></Input>
                </Grid.Column>
                <Grid.Column>
                  <Select multiple placeholder='Choisir les chevaux pour cette reprise' options={horses} value={selectedHorses} onChange={(e, data) => this.onChange(e, data, "selectedHorses")}/>
                </Grid.Column>
                <Grid.Column>
                  {[...Array(numberOfClasses)].map((machin, i) => (
                    <div style={{marginBottom: "2%"}}>
                      <Select placeholder='Choisir le jour de la reprise' options={joursSemaine} value={selectedTimeTable[i - 1]} onChange={(e, data) => this.onChange(e, data, "selectedTimeTable", i)}/>
                      <Input type="text" placeholder="Début du cours" onChange={(input) => this.onChangeForInput(null, input, "startTime", i)}></Input>
                      <Input type="text" placeholder="Fin du cours" onChange={(input) => this.onChangeForInput(null, input, "endTime", i)}></Input>
                    </div>
                  ))}
                  <Grid>
                    <Grid.Column textAlign="center">
                      <Button style={{marginBottom: "2%"}} icon onClick={this.increaseNumberOfClasses}><Icon name="add"></Icon></Button>
                    </Grid.Column>
                    <Grid.Column textAlign="center">
                      <Button icon onClick={this.decreaseNumberOfClasses}><Icon name="minus"></Icon></Button>
                    </Grid.Column>
                  </Grid>
                </Grid.Column>
                <Grid.Column>
                  <Select multiple placeholder='Choisir les niveaux pour cette reprise' options={niveauxCavalier} value={selectedNiveauxReprise} onChange={(e, data) => this.onChange(e, data, "selectedNiveauxReprise")}/>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Button onClick={this.createReprise} style={{marginTop: "2%"}}>Créer la reprise</Button>
          </div>
        )}
      </div>
    );
  }
}

export default withFirebase(ManageReprisesPage);
