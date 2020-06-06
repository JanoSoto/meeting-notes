import React from 'react';
import NewParticipant from './NewParticipant';

class Participants extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    const participants = this.props.participants.map((name, i) => {
      return <li key={i}>{name}</li>
    });
  	return (
      <div className="component-container participants-container">
        <h2>Participantes</h2>
        {
          participants.length > 0 ? 
          <div>
            <ol>
              {participants}
            </ol>
          </div>
          :
          <div>
            <p>Esta reunión aún no tiene participantes</p>
          </div>
        }
        <NewParticipant addParticipant={this.props.addParticipant}/>
      </div>
    )
  }
}

export default Participants;