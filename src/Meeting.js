import React from 'react';
import MeetingData from './MeetingData';
import MeetingResume from './MeetingResume';
import Participants from './Participants';
import NotesContainer from './NotesContainer';
import NewNote from './NewNote';

class Meeting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      deleted_notes: [],
      resume: {
        'Acuerdo': 0,
        'Compromiso': 0,
        'Duda': 0,
        'Desacuerdo': 0
      }
    }
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

  render() {
    const meeting_name = 'Reunión de prueba';
    const participants = ['Alejandro Soto', 'Karla Rojas', 'Kyotito'];
    const categories = [
      {name: 'Acuerdo', color: 'blue'}, 
      {name: 'Compromiso', color: 'green'}, 
      {name: 'Duda', color: 'orange'}, 
      {name: 'Desacuerdo', color: 'red'}
    ];
    return (
      <div className="container">
        <div className="row">
          <div className="col-9">
            <div>
              <MeetingData 
                meeting_name={meeting_name} 
              />
            </div>
            
            <div>
              <NewNote 
                categories={categories} 
                participants={participants}
                addNote={this.addNote}
                clean={true}
              />
              <NotesContainer 
                notes={this.state.notes}
                categories={categories} 
                participants={participants}
                addNote={this.addNote}
                updateNote={this.updateNote}
                deleteNote={this.deleteNote}
              />
            </div>
          </div>
          <div className="col-3">
            <Participants participants={participants} />
            <MeetingResume resume={this.state.resume} />
          </div>
        </div>
      </div>
    );
  }
}

export default Meeting;