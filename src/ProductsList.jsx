import React from 'react';

class ProductsList extends React.Component {
  constructor() {
    super();

    this.state = {
      products: [],
    };
  }

  render() {
    const { products } = this.state;
    return (
      <>
        <input type="text" />
        {products.length === 0 ? (
          <h2 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h2>
        ) : (
          ''
        )}
      </>
    );
  }
}

export default ProductsList;
