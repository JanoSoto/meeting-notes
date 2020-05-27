import React from 'react';
import MeetingData from './MeetingData';

class MeetingDataForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      target: '',
      empty_input: false,
      saved: false
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    if (form.get('name') && form.get('target')) {
      this.props.setMeetingData(form.get('name'), form.get('target'));
      this.setState({empty_input: false, saved: true});
    }
    else {
      this.setState({empty_input: true});
    }
  }

  handleInputChange(e) {
    const target = e.target;

    this.setState({
      [target.name]: target.value
    });
  }

  handleClick() {
    this.setState({
      saved: false
    });
  }

  render () {
    return (
      <div className="meeting-data-form-container">
        <h2>Datos de la reunión</h2>
        {
          this.state.saved ? 
          <div>
            <button 
              className="btn btn-primary" 
              onClick={this.handleClick}
            >
              Editar
            </button>
            <MeetingData 
              name={this.state.name}
              target={this.state.target}
            />
          </div>
          :
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>
                Nombre
              </label>
              <input 
                type="text" 
                name="name" 
                value={this.state.name}
                onChange={this.handleInputChange}
                autoFocus={true}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>
                Objetivo
              </label>
              <input 
                type="text" 
                name="target" 
                value={this.state.target}
                onChange={this.handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              {
                this.state.empty_input ? 
                <p className="text-danger">
                  Hay campos vacíos
                </p>
                : 
                ''
              }
              <input 
                type="submit" 
                value="Agregar" 
                className="btn btn-primary"
              />
            </div>
          </form>
        }
      </div>
    )
  }
}

export default MeetingDataForm;