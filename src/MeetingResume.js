import React from 'react';

function MeetingResume(props) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Tipo de nota</th>
          <th>Cantidad</th>
        </tr>
      </thead>
      <tbody>
        {
          Object.keys(props.resume).map((category) => {
            return <tr key={category}>
                    <td>{category}</td>
                    <td>{props.resume[category]}</td>
                   </tr>
          })
        }
      </tbody>
    </table>
  )
}


export default MeetingResume;