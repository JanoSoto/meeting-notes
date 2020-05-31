import React from 'react';
import Note from './Note';

class NotesContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const notes = this.props.notes.map((note) => {
      return <Note key={note.id}
                   id={note.id}
                   summary={note.summary}
                   category={note.category}
                   responsable={note.responsable}
                   categories={this.props.categories}
                   participants={this.props.participants}
                   updateNote={this.props.updateNote}
                   deleteNote={this.props.deleteNote}
                   categoryColor={this.props.categoryColor}
                   deleted={false}
                   showActions={true}
              /> 
    });
    return (
      <div>
        {
          this.props.notes.length > 0 ?
            <div className="notes-container container">
              <h2>Notas</h2>
              <div className="row header">
                <div className="col-1">#</div>
                <div className="col-5">Resumen</div>
                <div className="col-2">Tipo</div>
                <div className="col-2">Responsable</div>
                <div className="col-2"></div>
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