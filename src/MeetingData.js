import React from 'react';

function MeetingData(props) {
	return (
    <div className="meeting-data-container">
      <div>
        <p className="meeting-label">Asunto</p>
        <h1>{props.name}</h1>
      </div>

      <div>
        <p className="meeting-label">Objetivo</p>
        <h1>{props.target}</h1>
      </div>
    </div>
  )
}

export default MeetingData;