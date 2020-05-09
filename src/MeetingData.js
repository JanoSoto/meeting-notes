import React from 'react';

function MeetingData(props) {
	return (
    <div className="meeting-data-container">
      <div>
        <p className="meeting-label">Asunto</p>
        <h1>{props.meeting_name}</h1>
      </div>
      
      <div>
        <p className="meeting-label">Fecha</p>
        <h3>{new Date().toLocaleDateString()}</h3>
      </div>
    </div>
  )
}

export default MeetingData;