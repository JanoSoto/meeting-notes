import React from 'react';

function Note(props) {
  return (
    <div className="note">
      <p className="summary">{props.summary}</p>
      <p className="responsable">{props.responsable}</p>
      <p className="category">{props.category}</p>
    </div>
  )
}

export default Note;