import React from 'react';

class NewNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      summary: '',
      category: '',
      responsable: '',
      empty_input: false,
      counter: 1
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    const target = e.target;

    this.setState({
      [target.name]: target.value
    });
  }

  cleanForm() {
    document.querySelector('input[name="summary"]').value = '';
    document.querySelector('select[name="category"]').value = 'blank_option';
    document.querySelector('select[name="responsable"]').value = 'blank_option';
    document.querySelector('input[name="summary"]').focus();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    if (form.get('summary') && 
        form.get('category') && 
        form.get('responsable')) {
      this.props.addNote ({
            id: this.state.counter,
            summary: form.get('summary'),
            category: form.get('category'),
            responsable: form.get('responsable'),
          });
      this.setState({
        empty_input: false,
        counter: this.state.counter + 1
      });
      this.cleanForm();
    }
    else {
      this.setState({empty_input: true});
    }
  }

  render() {
    const categories = this.props.categories.map((category) => {
      return <option 
              key={category.name} 
              value={category.name}
              style={{color: category.color}}
             >
               {category.name}
             </option>
    });
    const participants = this.props.participants.map((participant) => {
      return <option 
              key={participant} 
              value={participant}
             >
              {participant}
             </option>
    });
    return (
      <div className="new-note-container">
        <h2>Nueva nota</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-row">
            <div className="col-12">
              <label>
                Resumen
              </label>
              <input 
                type="text" 
                name="summary" 
                onChange={this.handleInputChange}
                autoFocus={true}
                className="form-control"
              />
            </div>
            <div className="col-5">
              <label>
                Tipo
              </label>
              <select 
                name="category" 
                onChange={this.handleInputChange}
                defaultValue="blank_option"
                className="form-control"
              >
                <option disabled value="blank_option">Elije un tipo de nota</option>
                {categories}
              </select>
            </div>
            <div className="col-5">
              <label>
                Responsable
              </label>
              <select 
                name="responsable" 
                onChange={this.handleInputChange}
                defaultValue="blank_option"
                className="form-control"
              >
                <option disabled value="blank_option">Elije un responsable</option>
                {participants}
              </select>
            </div>
            <div className="col-2">
              {this.state.empty_input ? <p>Faltan campos por completar</p> : ''}
              <input 
                type="submit" 
                value="Agregar" 
                className="btn btn-primary"
              />
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default NewNote;