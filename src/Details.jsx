import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Details extends React.Component {
  constructor() {
    super();
    this.state = {
      produto: {},
      email: '',
      radio: '',
      area: '',
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

  handleChange = (event) => {
    const { name } = event.target;
    const value = event.target.type === 'radio'
      ? event.target.previousSibling.textContent
      : event.target.value;
    console.log(event.target.previousSibling);
    this.setState({ [name]: value });
  };

  save() {
    const { email, area, radio } = this.state;
    localStorage.setItem('email', email);
    localStorage.setItem('area', area);
    localStorage.setItem('radio', radio);
  }

  render() {
    let frete = '';
    const { addCartItem, items } = this.props;
    const { produto, email, radio, area } = this.state;
    const FOUR = 4;
    if (typeof produto.shipping === 'object') {
      frete = produto.shipping.free_shipping;
    }
    console.log(frete);
    return (
      <section>
        <h2 data-testid="product-detail-name">{produto.title}</h2>
        <img alt="imagem" src={ produto.thumbnail } />
        <h2>{produto.price}</h2>
        {typeof produto.shipping === 'object' && <h2>{frete.toString()}</h2>}
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
        <h2 data-testid="shopping-cart-size">{items !== undefined && FOUR}</h2>
        <form>
          <input
            name="email"
            value={ email }
            onChange={ this.handleChange }
            data-testid="product-detail-email"
            type="email"
          />
          <label htmlFor="1">
            1
            <input
              id="1"
              name="radio"
              checked={ radio === '1' }
              value={ radio }
              onClick={ this.handleChange }
              data-testid="1-rating"
              type="radio"
            />
          </label>
          <label htmlFor="2">
            2
            <input
              id="2"
              name="radio"
              checked={ radio === '2' }
              value={ radio }
              onClick={ this.handleChange }
              data-testid="2-rating"
              type="radio"
            />
          </label>
          <label htmlFor="3">
            3
            <input
              id="3"
              name="radio"
              checked={ radio === '3' }
              value={ radio }
              onClick={ this.handleChange }
              data-testid="3-rating"
              type="radio"
            />
          </label>
          <label htmlFor="4">
            4
            <input
              id="4"
              name="radio"
              checked={ radio === '4' }
              value={ radio }
              onClick={ this.handleChange }
              data-testid="4-rating"
              type="radio"
            />
          </label>
          <label htmlFor="5">
            5
            <input
              id="5"
              name="radio"
              checked={ radio === '5' }
              value={ radio }
              onClick={ this.handleChange }
              data-testid="5-rating"
              type="radio"
            />
          </label>
          <textarea
            name="area"
            value={ area }
            onChange={ this.handleChange }
            data-testid="product-detail-evaluation"
            type="text"
          />
          <button
            type="submit"
            onClick={ () => this.save() }
            data-testid="submit-review-btn"
          >
            Submeter
          </button>
        </form>
        <h2>{localStorage.getItem('email')}</h2>
        {' '}
        <br />
        <h2>{localStorage.getItem('radio')}</h2>
        {' '}
        <br />
        <h2>{localStorage.getItem('area')}</h2>
        {' '}
        <br />
      </section>
    );
  }
}

Details.propTypes = {
  match: propTypes.arrayOf(propTypes.object).isRequired,
  params: propTypes.arrayOf(propTypes.object).isRequired,
  id: propTypes.number.isRequired,
  addCartItem: propTypes.func.isRequired,
  items: propTypes.arrayOf(propTypes.object).isRequired,
};

export default Details;
