import React, { Component } from 'react';
import { Loader } from 'semantic-ui-react';

import { withFirebase } from '../Firebase';

class RegisterReprisesPage extends Component {
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

  render() {
    const { loading } = this.state;

    return (
      <div>
        {loading ? (
          <Loader active inline />
        ) : (
          <div>
          </div>
        )}
      </div>
    );
  }
}

export default withFirebase(RegisterReprisesPage);
