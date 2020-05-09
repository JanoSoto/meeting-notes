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
    console.log(data);
    this.setState({
      notes: this.state.notes.concat([data])
    });
  }

  render() {
    const notes = this.state.notes.map((note) => {
      return <Note key={note.id}
                   id={note.id}
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
          <h2>Notas</h2>
          {
            this.state.notes.length > 0 ? 
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Resumen</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Responsable</th>
                  </tr>
                </thead>
                <tbody>
                  {notes.reverse()}
                </tbody>
              </table>
              : 
              <p className="alert alert-info">No hay notas</p>
          }
        </div>
      </div>
    )
  }

}

export default NotesContainer;