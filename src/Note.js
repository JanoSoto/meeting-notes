import React from 'react';

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: false,
      fade_out: false
    }
  }

  editHandler = () => {
    this.setState({editable: true})
  }

  deleteHandler = () => {
    this.setState({fade_out: true});
    setInterval(this.props.deleteNote(this.props.id), 1000);
  }

  updateHandler = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    this.props.updateNote({
      id: this.props.id,
      summary: form.get('summary'),
      category: form.get('category'),
      responsable: form.get('responsable')
    });
    this.setState({editable: false});
  } 

  editableNote() {
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
    return  <form onSubmit={this.updateHandler}>
              <div className="component-container form-row note">
                <div className="col-1 id">{this.props.id}</div>
                <div className="col-5">
                  <input 
                    type="text" 
                    name="summary" 
                    autoFocus={true}
                    className="form-control"
                    defaultValue={this.props.summary}
                  />
                </div>
                <div className="col-2">
                  <select 
                    name="category" 
                    onChange={this.handleInputChange}
                    className="form-control"
                    defaultValue={this.props.category}
                  >
                    {categories}
                  </select>
                </div>
                <div className="col-2">
                  <select 
                    name="responsable" 
                    onChange={this.handleInputChange}
                    className="form-control"
                    defaultValue={this.props.responsable}
                  >
                    {participants}
                  </select>
                </div>
                <div className="col-2 actions">
                  <button 
                    className="btn btn-sm btn-primary"
                  >
                    Guardar <i className="far fa-save"></i>
                  </button>
                </div>
              </div>
            </form>
  }

  normalNote() {
    return  <div className={`component-container row note`}>
              <div className="col-1 id">{this.props.id}</div>
              <div className="col-5">
                {this.props.summary}
              </div>
              <div 
                className="col-2"
                style={{color: this.props.categoryColor(this.props.category)}}
              >
                {this.props.category}
              </div>
              <div className="col-2">{this.props.responsable}</div>
              {
                this.props.showActions ? 
                  <div className="col-2 actions">
                    {
                      this.props.deleted ? 
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => this.props.restoreNote(this.props.id)}
                      >
                        <span>
                          <i className="fas fa-undo-alt"></i>
                        </span>
                      </button>
                      :
                      <div>
                        <button 
                          onClick={this.editHandler}
                          className="btn btn-sm btn-info"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button 
                          onClick={this.deleteHandler}
                          className="btn btn-sm btn-danger"
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    }
                  </div>
                :
                  null
              }
            </div>
  }

  componentDidMount() {
    // console.log(`Nota ${this.props.id} agregada al DOM`);
    if (!this.props.deleted) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log(`Nota ${this.props.id} actualizada`);
    // console.log(`Categoría anterior: ${prevProps.category}`);
    // console.log(`Categoría nueva: ${this.props.category}`);
  }

  componentWillUnmount() {
    // console.log(`Nota ${this.props.id} quitada del DOM`);
  }

  render() {
    return (
      <div className="">
        {
          this.state.editable ? 
            this.editableNote()
            :
            this.normalNote()
        }
      </div>
    )
  }
}

export default Note;