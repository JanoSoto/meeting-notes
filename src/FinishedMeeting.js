import React from 'react';
import MeetingData from './MeetingData';
import MeetingResume from './MeetingResume';
import Note from './Note';
import Chronometer from './Chronometer';

class FinishedMeeting extends React.Component {

  componentDidMount() {
    document.querySelector('.fixed-header').classList.add('hidden');
    window.scrollTo(0, 0);
  }

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
        <div className="row">
          <div className="col-9">
            <div className="component-container">
              <h2>Reunión terminada</h2>
              <MeetingData 
                name={this.props.name} 
                target={this.props.target} 
              />
            </div>
          </div>
          <div className="col-3">
            <div className="component-container">
              <h2>Duración</h2>
              <Chronometer 
                startedAt={this.props.startedAt}
                run={false}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="component-container">
              <h2>Resumen</h2>
              <MeetingResume resume={this.props.resume} />
            </div>
          </div>
        </div>
        <div>
          <div className="component-container">
            <h2>Notas tomadas</h2>
            <div className="row header">
              <div className="col-1">#</div>
              <div className="col-5">Resumen</div>
              <div className="col-2">Tipo</div>
              <div className="col-2">Responsable</div>
              <div className="col-2"></div>
            </div>
          </div>
          {notes}
        </div>
      </div>
    )
  }
}

export default FinishedMeeting;