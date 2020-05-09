import React from 'react';

function Note(props) {
  return (
    <tr className="note">
      <th scope="row">{props.id}</th>
      <td className="summary">{props.summary}</td>
      <td className="category">{props.category}</td>
      <td className="responsable">{props.responsable}</td>
    </tr>
  )
}

export default Note;