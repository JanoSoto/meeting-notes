import React from 'react';
import {BrowserRouter, Link, Switch, Route, Redirect} from 'react-router-dom';
import Meeting from './Meeting';

class InitialSetup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start_meeting: false
    }

    this.startMeeting = this.startMeeting.bind(this);
  }

  meeting(name, categories, participants) {
    return <Meeting 
            name={name}
            categories={categories} 
            participants={participants}
           />
  }

  startMeeting() {
    this.setState({start_meeting: true});
  }

  render() {
    const categories = [
        {name: 'Acuerdo', color: 'blue'}, 
        {name: 'Compromiso', color: 'green'}, 
        {name: 'Duda', color: 'orange'}, 
        {name: 'Desacuerdo', color: 'red'}
      ];
    const meeting_name = 'Reunión de prueba';
    const participants = ['Alejandro Soto', 'Karla Rojas', 'Kyotito'];

    return (
      <BrowserRouter>
        <div>
          {
            this.state.start_meeting ? 
            <Redirect to='/meeting' />
            :
            <button onClick={this.startMeeting}>Empezar reunión</button>
          }
          <Switch>
            <Route exact path='/meeting' render={() => this.meeting(meeting_name, categories, participants)} /> 
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default InitialSetup;