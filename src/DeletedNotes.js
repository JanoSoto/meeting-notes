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
                   showActions={true}
              /> 
  });
  return (
    <div className="deleted-notes-container">
    {
      props.notes.length > 0 ?
      <div className="notes-container container">
        <div className="component-container">
          <h2>
            Notas eliminadas
            <button 
              className="btn btn-sm btn-primary"
              onClick={props.hideDeletedNotes}
            >
              <i className="fas fa-times"></i>
            </button>
          </h2>
          <div className="row header">
            <div className="col-1">#</div>
            <div className="col-5">Resumen</div>
            <div className="col-2">Tipo</div>
            <div className="col-2">Responsable</div>
            <div className="col-2"></div>
          </div>
        </div>
        {notes}
      </div>
      :
      null
    }
    </div>
  )  
}

export default DeletedNotes;