import React from 'react';

class NewParticipant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show_input: false,
      empty_input: false,
      name: ''
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.cleanForm = this.cleanForm.bind(this);
  }

  handleClick() {
    this.setState({show_input: !this.state.show_input});
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    if (form.get('name')) {
      this.props.addParticipant(form.get('name'));
      this.setState({empty_input: false});
      this.cleanForm();
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

  cleanForm() {
    document.querySelector('input[name="name"]').value = '';
    document.querySelector('input[name="name"]').focus();
  }

  render() {
    return (
      <div className="new-participant-container">
        {
          this.state.show_input ? 
          <form onSubmit={this.handleSubmit}>
            <div className="form-row">
              <div className="col-9">
                <label>
                  Nombre
                </label>
                <input 
                  type="text" 
                  name="name" 
                  onChange={this.handleInputChange}
                  autoFocus={true}
                  className="form-control"
                />
                {
                  this.state.empty_input ? 
                  <p className="text-danger">
                    Debes ingresar un nombre
                  </p>
                  : 
                  ''
                }
              </div>
              <div className="col-2">
                <input 
                  type="submit" 
                  value="Agregar" 
                  className="btn btn-primary"
                />
                <button 
                  className="btn btn-danger"
                  onClick={this.handleClick}
                >
                  Cerrar
                </button>
              </div>
            </div>            
          </form>
          :
          <div>
            <button 
              className="btn btn-primary"
              onClick={this.handleClick}
            >
              Nuevo participante
            </button>
          </div>
        }
      </div>
    )
  }
}

export default NewParticipant;