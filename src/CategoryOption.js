import React from 'react';

class CategoryOption extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.setCategory(this.props.name);
  }

  render() {
    const options = this.props.options.map((option) => {
      return <li key={option.name}>{option.name}</li>
    });
    return (
      <div>
        <h4>{this.props.name}</h4>
        {
          this.props.to_select ? 
          <button 
            className="btn btn-primary"
            onClick={this.handleClick}
          >
            Seleccionar
          </button>
          :
          ''
        }
        <ol>
          {options}
        </ol>
      </div>
    )
  }
}

export default CategoryOption;