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
    const value = event.target.type === 'radio' ? event.target.previousSibling.textContent : event.target.value;
    console.log(event.target.previousSibling);
    this.setState({ [name]: value })
  }

  save() {
    localStorage.setItem('email', this.state.email)
    localStorage.setItem('area', this.state.area)
    localStorage.setItem('radio', this.state.radio)
  }

  render() {
    const { addCartItem } = this.props;
    const { produto, email, radio, area } = this.state;
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
        <form>
        <input name="email" value={ email } onChange={ this.handleChange } data-testid="product-detail-email" type="email"></input>
        <label>
          1
        <input name="radio" checked={ radio === '1' && true } value={ radio } onClick={ this.handleChange } data-testid="1-rating" type="radio"></input>
        </label>
        <label>
          2
        <input name="radio" checked={ radio === '2' && true } value={ radio } onClick={ this.handleChange } data-testid="2-rating" type="radio"></input>
        </label>
        <label>
          3
        <input name="radio" checked={ radio === '3' && true } value={ radio } onClick={ this.handleChange } data-testid="3-rating" type="radio"></input>
        </label>
        <label>
          4
        <input name="radio" checked={ radio === '4' && true } value={ radio } onClick={ this.handleChange } data-testid="4-rating" type="radio"></input>
        </label>
        <label>
          5
        <input name="radio" checked={ radio === '5' && true } value={ radio } onClick={ this.handleChange } data-testid="5-rating" type="radio"></input>
        </label>
        <textarea name="area" value={ area } onChange={ this.handleChange } data-testid="product-detail-evaluation" type="text"></textarea>
        <button type='submit' onClick={ () => this.save() } data-testid="submit-review-btn">Submeter</button>
        </form>
        <h2>{localStorage.getItem('email')}</h2> <br />
        <h2>{localStorage.getItem('radio')}</h2> <br />
        <h2>{localStorage.getItem('area')}</h2> <br />
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
