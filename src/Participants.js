import React from 'react';

function Participants(props) {
  const participants = props.participants.map((name, i) => {
    return <li key={i}>{name}</li>
  });
	return (
    <div className="participants-container">
      <h2>Participantes</h2>
      <ol>
        {participants}
      </ol>
    </div>
  )
}

export default Participants;