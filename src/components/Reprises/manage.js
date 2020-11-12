import React, { Component } from 'react';
import { Header, Loader, Grid, Input, Select, Button } from 'semantic-ui-react';

import { withFirebase } from '../Firebase';

class ManageReprisesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      fullHorsesList: [],
      horses: [],
      selectedHorses: []
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

  onChange = (e, data) => this.setState({ selectedHorses: data.value }); //TODO: mettre tout sous forme de ligne et ajouter le choix du créneau dans un select
  // TODO: ajout les créneaux en BDD à la main ?
  render() {
    const { horses, selectedHorses, loading } = this.state;

    return (
      <div>
        {loading ? (
          <Loader active inline />
        ) : (
          <div>
            <Header>Créer une reprise</Header>
            <Grid columns={3}>
              <Grid.Row>
                <Grid.Column>
                  <Input type="text" placeholder="Nom de la reprise à créer"></Input>
                </Grid.Column>
                <Grid.Column>
                  <Select multiple placeholder='Choisir les chevaux pour cette reprise' options={horses} value={selectedHorses} onChange={this.onChange}/>
                </Grid.Column>
                <Grid.Column>
                  <Select multiple placeholder='Choisir les chevaux pour cette reprise' options={horses} value={selectedHorses} onChange={this.onChange}/>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Button style={{marginTop: "2%"}}>Créer la reprise</Button>
          </div>
        )}
      </div>
    );
  }
}

export default withFirebase(ManageReprisesPage);
