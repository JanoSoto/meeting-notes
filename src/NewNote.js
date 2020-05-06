import React from 'react';

class NewNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      summary: '',
      category: '',
      responsable: '',
      emptyInput: false,
      counter: 0
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
        emptyInput: false,
        counter: this.state.counter + 1
      });
      this.cleanForm();
    }
    else {
      this.setState({emptyInput: true});
    }
  }

  render() {
    const categories = this.props.categories.map((category) => {
      return <option 
              key={category} 
              value={category}
             >
               {category}
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
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>
              Resumen
              <input 
                type="text" 
                name="summary" 
                onChange={this.handleInputChange}
                autoFocus={true}  
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Tipo
              <select 
                name="category" 
                onChange={this.handleInputChange}
                defaultValue="blank_option"  
              >
                <option disabled value="blank_option">Elije un tipo de nota</option>
                {categories}
              </select>
            </label>
          </div>
          <div className="form-group">
            <label>
              Resumen
              <select 
                name="responsable" 
                onChange={this.handleInputChange}
                defaultValue="blank_option"
              >
                <option disabled value="blank_option">Elije un responsable</option>
                {participants}
              </select>
            </label>
          </div>
          <div className="form-group">
            {this.state.emptyInput ? <p>Faltan campos por completar</p> : ''}
            <input type="submit" value="Agregar" />
          </div>
        </form>
      </div>
    )
  }
}

export default NewNote;