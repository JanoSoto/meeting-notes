import React from 'react';
import {BrowserRouter, Link, Switch, Route, Redirect} from 'react-router-dom';
import Meeting from './Meeting';
import MeetingDataForm from './MeetingDataForm';
import Participants from './Participants';

class InitialSetup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start_meeting: false,
      participants: [],
      meeting_name: '',
      meeting_target: '',
    };

    this.startMeeting = this.startMeeting.bind(this);
    this.addParticipant = this.addParticipant.bind(this);
    this.setMeetingData = this.setMeetingData.bind(this);
  }

  meeting(categories) {
    return <Meeting 
            name={this.state.meeting_name}
            target={this.state.meeting_target}
            categories={categories} 
            participants={this.state.participants}
            addParticipant={this.addParticipant}
           />
  }

  setMeetingData(name, target) {
    this.setState({meeting_name: name, meeting_target: target});
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

    return (
      <BrowserRouter>
        <div>
          {
            this.state.start_meeting ? 
            <Redirect to='/meeting' />
            :
            <div className="new-meeting-container">
              <h1>Crear una nueva reunión</h1>
              <MeetingDataForm 
                setMeetingData={this.setMeetingData}
              />
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
                   render={() => this.meeting(categories)} 
            /> 
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default InitialSetup;