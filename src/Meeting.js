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
    const categories = ['Acuerdo', 'Compromiso', 'Duda', 'Desacuerdo'];
    return (
      <div>
        <div>
          <MeetingData meeting_name={meeting_name} />
        </div>
        
        <div>
          <Participants participants={participants} />
        </div>

        <div>
          <NotesContainer 
            categories={categories} 
            participants={participants}
          />
        </div>
      </div>
    );
  }
}

export default Meeting;