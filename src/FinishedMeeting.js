import React from 'react';
import MeetingData from './MeetingData';
import MeetingResume from './MeetingResume';
import Note from './Note';
import Chronometer from './Chronometer';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

class FinishedMeeting extends React.Component {
  constructor(props) {
    super(props);

    this.exportToXLSX = this.exportToXLSX.bind(this);
  }
  s2ab = (s) => { 
    var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
    var view = new Uint8Array(buf);  //create uint8array as viewer
    for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
    return buf;    
  }

  exportToXLSX = () => {
    const data = this.props.notes.map((note, i) => {
      return {
        number:i+1, 
        summary:note.summary, 
        category:note.category, 
        responsable:note.responsable
      }
    });
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const headers = [['#', 'Resumen', 'Tipo', 'Responsable']]
    const ws = XLSX.utils.aoa_to_sheet(headers);
    XLSX.utils.sheet_add_json(ws, data, {
      header:['number', 'summary', 'category', 'responsable'],
      skipHeader:true,
      origin:-1
    });
    const wb = { Sheets: { 'Notas': ws }, SheetNames: ['Notas'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const file = new Blob([excelBuffer], {type: fileType});
    FileSaver.saveAs(file, this.props.name + fileExtension);
  }

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
              <h2>
                Reunión terminada
              </h2>
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
        <div className="notes-container container">
          <div className="component-container">
            <h2>
              Notas tomadas
              <button 
                className="btn btn-primary"
                onClick={this.exportToXLSX}
              >
                <i className="fas fa-download"></i> Descargar notas
              </button>
            </h2>
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