import React from 'react';
import Note from './Note';

function DeletedNotes(props) {
  
  const notes = props.notes.map((note) => {
    return <Note key={note.id}
                   id={note.id}
                   summary={note.summary}
                   category={note.category}
                   responsable={note.responsable}
                   categoryColor={props.categoryColor}
                   restoreNote={props.restoreNote}
                   deleted={true}
              /> 
  });
  return (
    <div className="notes-container container">
      <h2>Notas eliminadas</h2>
      <div className="row header">
        <div className="col-1">#</div>
        <div className="col-5">Resumen</div>
        <div className="col-2">Tipo</div>
        <div className="col-2">Responsable</div>
        <div className="col-2"></div>
      </div>
      {notes}
    </div>
  )  
}

export default DeletedNotes;