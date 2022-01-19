import React from 'react';
import { Link } from 'react-router-dom';

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
          <section>
            <h2 data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </h2>
            <Link to="/cart" data-testid="shopping-cart-button">Carrinho</Link>
          </section>
        ) : (
          ''
        )}
      </>
    );
  }
}

export default ProductsList;
