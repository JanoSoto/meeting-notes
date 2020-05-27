import React from 'react';
import {BrowserRouter, Link, Switch, Route, Redirect} from 'react-router-dom';
import Meeting from './Meeting';
import Participants from './Participants';

class InitialSetup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start_meeting: false,
      participants: []
    };

    this.startMeeting = this.startMeeting.bind(this);
    this.addParticipant = this.addParticipant.bind(this);
  }

  meeting(name, categories) {
    return <Meeting 
            name={name}
            categories={categories} 
            participants={this.state.participants}
            addParticipant={this.addParticipant}
           />
  }

  startMeeting() {
    this.setState({start_meeting: true});
  }

  addParticipant(participant) {
    this.setState({participants: this.state.participants.concat([participant])});
  }

  render() {
    const categories = [
        {name: 'Acuerdo', color: 'blue'}, 
        {name: 'Compromiso', color: 'green'}, 
        {name: 'Duda', color: 'orange'}, 
        {name: 'Desacuerdo', color: 'red'}
      ];
    const meeting_name = 'Reunión de prueba';
    //const participants =['Alejandro Soto', 'Karla Rojas', 'Kyotito'];

    return (
      <BrowserRouter>
        <div>
          {
            this.state.start_meeting ? 
            <Redirect to='/meeting' />
            :
            <div className="new-meeting-container">
              <h1>Crear una nueva reunión</h1>
              <Participants 
                participants={this.state.participants}
                addParticipant={this.addParticipant}
              />
              <button 
                onClick={this.startMeeting}
                className="btn btn-primary"
              >
                Empezar reunión
              </button>
            </div>
          }
          <Switch>
            <Route exact path='/meeting' 
                   render={() => this.meeting(meeting_name, categories)} 
            /> 
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default InitialSetup;