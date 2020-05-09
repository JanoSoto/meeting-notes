import React from 'react';
import MeetingData from './MeetingData'
import Participants from './Participants'
import NotesContainer from './NotesContainer'

class Meeting extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const meeting_name = 'Reunión de prueba';
    const participants = ['Alejandro Soto', 'Karla Rojas', 'Kyotito'];
    const categories = [
      {name: 'Acuerdo', color: 'blue'}, 
      {name: 'Compromiso', color: 'green'}, 
      {name: 'Duda', color: 'orange'}, 
      {name: 'Desacuerdo', color: 'red'}
    ];
    return (
      <div className="container">
        <div className="row">
          <div className="col-9">
            <div>
              <MeetingData meeting_name={meeting_name} />
            </div>
            
            <div>
              <NotesContainer 
                categories={categories} 
                participants={participants}
              />
            </div>
          </div>
          <div className="col-3">
            <Participants participants={participants} />
          </div>
        </div>
      </div>
    );
  }
}

export default Meeting;