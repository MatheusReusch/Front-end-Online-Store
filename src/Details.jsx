import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Details extends React.Component {
  constructor() {
    super();
    this.state = {
      produto: {},
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    fetch(`https://api.mercadolibre.com/items/${id}`)
      .then((response) => response.json())
      .then((data) => this.setState({ produto: data }));
  }

  render() {
    const { addCartItem } = this.props;
    const { produto } = this.state;
    return (
      <section>
        <h2 data-testid="product-detail-name">{produto.title}</h2>
        <img alt="imagem" src={ produto.thumbnail } />
        <h2>{produto.price}</h2>
        <button
          data-testid="product-detail-add-to-cart"
          onClick={ () => addCartItem(produto.id) }
          type="button"
        >
          Adicionar ao Carrinho
        </button>
        <Link to="/cart" data-testid="shopping-cart-button">
          Carrinho
        </Link>
      </section>
    );
  }
}

Details.propTypes = {
  match: propTypes.arrayOf(propTypes.object).isRequired,
  params: propTypes.arrayOf(propTypes.object).isRequired,
  id: propTypes.number.isRequired,
  addCartItem: propTypes.func.isRequired,
};

export default Details;
