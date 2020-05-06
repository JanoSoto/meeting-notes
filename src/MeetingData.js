import React from 'react';

function MeetingData(props) {
	return (
    <div className="meeting-data-container">
      <p className="meeting-label">Asunto</p>
      <h1>{props.meeting_name}</h1>
      
      <p className="meeting-label">Fecha</p>
      <h3>{new Date().toLocaleDateString()}</h3>
    </div>
  )
}

export default MeetingData;