import React from 'react';
import MeetingData from './MeetingData';
import MeetingResume from './MeetingResume';
import Note from './Note';
import Chronometer from './Chronometer';

class FinishedMeeting extends React.Component {

  render() {
    const notes = this.props.notes.map((note) => {
      return <Note key={note.id}
                   id={note.id}
                   summary={note.summary}
                   category={note.category}
                   responsable={note.responsable}
                   categories={[]}
                   participants={[]}
                   updateNote={null}
                   deleteNote={null}
                   categoryColor={this.props.categoryColor}
                   deleted={false}
                   showActions={false}
              /> 
    });
    return (
      <div>
        <h1>Reunión terminada</h1>
        <MeetingData 
          name={this.props.name} 
          target={this.props.target} 
        />
        <div className="row">
          <div className="col">
            <h3>Duración</h3>
            <Chronometer 
              startedAt={this.props.startedAt}  
            />
          </div>
          <div className="col">
            <h3>Cuadro resumen</h3>
            <MeetingResume resume={this.props.resume} />
          </div>
        </div>
        <div>
          <h2>Notas tomadas</h2>
          {notes}
        </div>
      </div>
    )
  }
}

export default FinishedMeeting;