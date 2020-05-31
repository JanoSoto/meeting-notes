import React from 'react';
import MeetingData from './MeetingData';
import Note from './Note';

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
        <div>
          {notes}
        </div>
      </div>
    )
  }
}

export default FinishedMeeting;