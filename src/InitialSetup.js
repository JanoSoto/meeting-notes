import React from 'react';
import {BrowserRouter, Link, Switch, Route, Redirect} from 'react-router-dom';
import Meeting from './Meeting';
import MeetingDataForm from './MeetingDataForm';
import Participants from './Participants';
import CategorySelector from './CategorySelector';
import CategoryOption from './CategoryOption';

class InitialSetup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start_meeting: false,
      participants: [],
      meeting_name: '',
      meeting_target: '',
      categories: [
        {
          name: 'Acta dialógica',
          options: [
            {name: 'Acuerdo', color: 'blue'}, 
            {name: 'Compromiso', color: 'green'}, 
            {name: 'Duda', color: 'orange'}, 
            {name: 'Desacuerdo', color: 'red'}
          ]
        },
        {
          name: 'Sprint Demo',
          options: [
            {name: 'Bug', color: 'red'},
            {name: 'Observación a HU', color: 'blue'},
            {name: 'Nueva característica', color: 'green'},
            {name: 'Solicitud de información', color: 'orange'}
          ]
        }
      ],
      selected_category: null
    };

    this.startMeeting = this.startMeeting.bind(this);
    this.addParticipant = this.addParticipant.bind(this);
    this.setMeetingData = this.setMeetingData.bind(this);
    this.setCategory = this.setCategory.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
  }

  meeting() {
    let categories = [];
    if (this.state.selected_category != null) {
      categories = this.state.selected_category.options;
    }
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

  setCategory(category) {
    const selected_category = this.state.categories.find(c => c.name === category);
    this.setState({selected_category: selected_category});
  }

  changeCategory() {
    this.setState({selected_category: null}); 
  }

  render() {
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
              {
                this.state.selected_category == null ? 
                <CategorySelector
                  categories={this.state.categories}
                  setCategory={this.setCategory}
                />
                :
                <div>
                  <h2>Tipo de notas</h2>
                  <button
                    className="btn btn-primary"
                    onClick={this.changeCategory}
                  >
                    Cambiar selección
                  </button>
                  <CategoryOption
                    name={this.state.selected_category.name}
                    options={this.state.selected_category.options}
                  />
                </div>
              }
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
                   render={() => this.meeting()} 
            /> 
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default InitialSetup;