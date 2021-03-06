import React from 'react';
import {BrowserRouter, Link, Switch, Route, Redirect} from 'react-router-dom';
import MeetingData from './MeetingData';
import MeetingResume from './MeetingResume';
import Participants from './Participants';
import NotesContainer from './NotesContainer';
import NewNote from './NewNote';
import DeletedNotes from './DeletedNotes';
import FinishedMeeting from './FinishedMeeting';
import Chronometer from './Chronometer';

class Meeting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      deleted_notes: [],
      resume: this.props.categories.reduce((hash, option) => {
        hash[option.name] = 0;
        return hash;
      }, {}),
      show_deleted_notes: false,
      finished: false,
      started_at: Date.now(),
      finished_at: null,
      interval_timer: null
    }

    this.finishMeeting = this.finishMeeting.bind(this);
    this.renderFinishedMeeting = this.renderFinishedMeeting.bind(this);
    this.setChronometerTimer = this.setChronometerTimer.bind(this);
  }

  incrementCategory = (category) => {
    const resume = this.state.resume;
    resume[category] += 1;
    return resume;
  }

  decrementCategory = (category) => {
    const resume = this.state.resume;
    resume[category] -= 1;
    return resume; 
  }

  addNote = (data) => {
    this.setState({
      notes: this.state.notes.concat([data]),
      resume: this.incrementCategory(data.category)
    });

  }

  compareNotes = (a, b) => {
    if (a.id < b.id) {
      return -1;
    }
    if (a.id > b.id) {
      return 1;
    }
    return 0;
  }

  updateNote = (note) => {
    const updated_note = this.state.notes.find(n => n.id == note.id);
    const filtered_notes = this.state.notes.filter(note => note.id != updated_note.id);
    if (updated_note.category != note.category) {
      let resume = this.state.resume;
      resume[updated_note.category] -= 1;
      resume[note.category] += 1
      this.setState({
        notes: filtered_notes.concat(note).sort(this.compareNotes),
        resume: resume
      });
    }
    else {
      this.setState({
        notes: filtered_notes.concat(note).sort(this.compareNotes)
      });
    }
  }

  deleteNote = (id) => {
    const note_to_delete = this.state.notes.find(n => n.id == id);
    const filtered_notes = this.state.notes.filter(note => note.id != note_to_delete.id);
    this.setState({
      notes: filtered_notes,
      deleted_notes: this.state.deleted_notes.concat(note_to_delete),
      resume: this.decrementCategory(note_to_delete.category)
    });
  }

  toggleDeletedNotes = () => {
    this.setState({
      show_deleted_notes: !this.state.show_deleted_notes
    });
  }

  deleteNotesButton = () => {
    if (!this.state.show_deleted_notes) {
      return  <button 
                className="btn btn-warning"
                onClick={this.toggleDeletedNotes}
              >
                Mostrar notas eliminadas  <span className="badge badge-dark">
                                    {this.state.deleted_notes.length}
                                  </span>
              </button>
    }
  }

  restoreNote = (id) => {
    const note = this.state.deleted_notes.find(n => n.id == id);
    const filtered_notes = this.state.deleted_notes.filter(n => n.id != note.id);
    this.setState({
      notes: this.state.notes.concat(note),
      deleted_notes: filtered_notes,
      resume: this.incrementCategory(note.category)
    });
  }

  categoryColor = (category) => {
    return this.props.categories.find(c => c.name === category).color
  }

  finishMeeting = () => {
    this.setState({finished: true});
  }

  renderFinishedMeeting() {
    return <FinishedMeeting 
             notes={this.state.notes} 
             name={this.props.name}
             target={this.props.target}
             categoryColor={this.categoryColor}
             startedAt={this.state.started_at}
             resume={this.state.resume}
           />;
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillUnmount() {
    clearInterval(this.state.interval_timer);
  }

  setChronometerTimer(timer) {
    this.setState({interval_timer: timer});
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <div className="fixed-header hidden">
            <p>
              Reunión
            </p>
            <h1>
              {this.props.name}
            </h1>
          </div>
          <div className="container">
            {
              !this.state.finished ? 
                <div className="row">
                  <div className="col-9">
                    <div className="component-container">
                      <h2>Datos de la reunión</h2>
                      <MeetingData 
                        name={this.props.name} 
                        target={this.props.target} 
                      />
                    </div>
                    
                    <div>
                      {
                        this.state.deleted_notes.length > 0 ? 
                          this.deleteNotesButton()
                          :
                          null
                      }
                      {
                        this.state.show_deleted_notes ?
                          <DeletedNotes
                            notes={this.state.deleted_notes}
                            restoreNote={this.restoreNote}
                            categoryColor={this.categoryColor}
                            hideDeletedNotes={this.toggleDeletedNotes}
                          />
                          :
                          <span></span>
                      }
                      <NotesContainer 
                        notes={this.state.notes}
                        categories={this.props.categories} 
                        participants={this.props.participants}
                        addNote={this.addNote}
                        updateNote={this.updateNote}
                        deleteNote={this.deleteNote}
                        categoryColor={this.categoryColor}
                      />
                      <NewNote 
                        categories={this.props.categories} 
                        participants={this.props.participants}
                        addNote={this.addNote}
                        clean={true}
                      />
                    </div>
                  </div>
                  <div className="col-3">
                    <Participants 
                      participants={this.props.participants} 
                      addParticipant={this.props.addParticipant}
                      showInput={false}
                    />
                    <div className="component-container resume-container">
                      <MeetingResume resume={this.state.resume} />
                      <Chronometer 
                        startedAt={this.state.started_at} 
                        run={true}
                        setChronometerTimer={this.setChronometerTimer}
                      />
                      <button
                        onClick={this.finishMeeting}
                        className="btn btn-primary"
                      >
                        Terminar reunión
                      </button>
                    </div>
                  </div>
                </div>
              :
                <Redirect to='/meeting/finished'/>
            }
            <Switch>
              <Route exact path='/meeting/finished' 
                     render={() => this.renderFinishedMeeting()} 
              /> 
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default Meeting;