import React from 'react';
import Note from './Note'
import NewNote from './NewNote'

class NotesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: []
    }
  }

  addNote = (data) => {
    this.setState({
      notes: this.state.notes.concat([data])
    });
  }

  render() {
    const notes = this.state.notes.map((note) => {
      return <Note key={note.id}
                   summary={note.summary}
                   category={note.category}
                   responsable={note.responsable}
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
        <div className="notes-container">
          {this.state.notes.length > 0 ? notes : <p>No hay notas</p>}
        </div>
      </div>
    )
  }

}

export default NotesContainer;