import React from 'react';
import Note from './Note'
import NewNote from './NewNote'

class NotesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      deleted_notes: []
    }
  }

  addNote = (data) => {
    this.setState({
      notes: this.state.notes.concat([data])
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
    this.setState({
      notes: filtered_notes.concat(note).sort(this.compareNotes).reverse()
    });
  }

  deleteNote = (id) => {
    const note_to_delete = this.state.notes.find(n => n.id == id);
    const filtered_notes = this.state.notes.filter(note => note.id != note_to_delete.id);
    this.setState({
      notes: filtered_notes,
      deleted_notes: this.state.deleted_notes.concat(note_to_delete)
    });
  }

  render() {
    const notes = this.state.notes.map((note) => {
      return <Note key={note.id}
                   id={note.id}
                   summary={note.summary}
                   category={note.category}
                   responsable={note.responsable}
                   categories={this.props.categories}
                   participants={this.props.participants}
                   updateNote={this.updateNote}
                   deleteNote={this.deleteNote}
              /> 
    });
    return (
      <div>
        <NewNote 
          categories={this.props.categories} 
          participants={this.props.participants}
          addNote={this.addNote}
          clean={true}
        />
        {
          this.state.notes.length > 0 ?
            <div className="notes-container container">
              <h2>Notas</h2>
              <div className="row header">
                <div className="col-1">#</div>
                <div className="col-5">Resumen</div>
                <div className="col-2">Tipo</div>
                <div className="col-2">Responsable</div>
                <div className="col-2">--</div>
              </div>
              {notes.reverse()}
            </div>
            : 
            <p className="alert alert-info">No hay notas</p>
        }
      </div>
    )
  }

}

export default NotesContainer;