import React from 'react';
import MeetingData from './MeetingData';
import MeetingResume from './MeetingResume';
import Participants from './Participants';
import NotesContainer from './NotesContainer';
import NewNote from './NewNote';
import DeletedNotes from './DeletedNotes';

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
      },
      show_deleted_notes: false
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

  toggleDeletedNotes = () => {
    this.setState({
      show_deleted_notes: !this.state.show_deleted_notes
    });
  }

  deleteNotesButton = () => {
    if (this.state.show_deleted_notes) {
      return  <button 
                className="btn btn-warning"
                onClick={this.toggleDeletedNotes}
              >
                Ocultar notas eliminadas  <span className="badge badge-dark">
                                    {this.state.deleted_notes.length}
                                  </span>
              </button>
    }
    else {
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

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-9">
            <div>
              <MeetingData 
                name={this.props.name} 
                target={this.props.target} 
              />
            </div>
            
            <div>
              <NewNote 
                categories={this.props.categories} 
                participants={this.props.participants}
                addNote={this.addNote}
                clean={true}
              />
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
            </div>
          </div>
          <div className="col-3">
            <Participants 
              participants={this.props.participants} 
              addParticipant={this.props.addParticipant}
            />
            <MeetingResume resume={this.state.resume} />
          </div>
        </div>
      </div>
    );
  }
}

export default Meeting;