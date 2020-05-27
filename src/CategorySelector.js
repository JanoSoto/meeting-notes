import React from 'react';
import CategoryOption from './CategoryOption';

class CategorySelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };

  }

  render () {
    const categories = this.props.categories.map((category) => {
      return <CategoryOption 
              key={category.name}
              name={category.name}
              options={category.options}
              to_select={true}
              setCategory={this.props.setCategory}
             />
    });
    return (
      <div>
        <h2>Seleccione los tipos de notas para la reunión</h2>
        {categories}
      </div>
    )
  }
}

export default CategorySelector;