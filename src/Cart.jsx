import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Cart extends React.Component {
  constructor() {
    super();

    this.state = {
      array: [],
      total: 0,
      disabled: false,
    };
  }

  componentDidMount() {
    let total = 0;
    const { items } = this.props;
    items.map((item) => {
      total += item.price;
      return '';
    });
    this.setStateTotal(total);
  }

  setStateTotal = (total) => {
    this.setState({ total });
  }

  verifica = (item) => {
    const { array, disabled } = this.state;
    let quantidade = this.quantity(item.id);
    if (array.length > 0) {
      if (array.some((it) => it === item.id)) {
        return '';
      }
      if (array.some((it) => it === item.id) === false) {
        return (
          <section>
            <h2 data-testid="shopping-cart-product-name">{item.title}</h2>
            <h2 data-testid="shopping-cart-product-quantity">{quantidade}</h2>
            <button
              type="button"
              onClick={ () => {
                quantidade += 1;
                return '';
              } }
              data-testid="product-increase-quantity"
            >
              Adiciona
            </button>
            <button type="button" data-testid="product-decrease-quantity">Retira</button>
          </section>
        );
      }
    } else {
      return (
        <section data-testid="teste" key={ Math.random() }>
          <h2 data-testid="shopping-cart-product-name">{item.title}</h2>
          <h2 id={ item.id } data-testid="shopping-cart-product-quantity">
            {quantidade}
          </h2>
          <button
            type="button"
            onClick={ () => this.adiciona(quantidade, item.id, item.available_quantity) }
            data-testid="product-increase-quantity"
            disabled={ disabled }
          >
            Adiciona
          </button>
          <button
            type="button"
            onClick={ () => this.remover(quantidade, item.id) }
            data-testid="product-decrease-quantity"
          >
            Retira
          </button>
        </section>
      );
    }
  };

  adiciona = (quantidade, id, quantidadeDisponivel) => {
    const valor = document.getElementById(id).innerText;
    console.log(valor);
    if (Number(document.getElementById(id).innerText) !== Number(quantidadeDisponivel)) {
      document.getElementById(id).innerText -= -quantidade;
    }
    this.setState({ disabled: true });
  };

  remover = (quantidade, id) => {
    const valor = document.getElementById(id).innerText;
    console.log(valor);
    if (document.getElementById(id).innerText > 0) {
      document.getElementById(id).innerText -= quantidade;
    }
  };

  quantity = (id) => {
    const { items } = this.props;
    let quantidade = 0;
    items.map((item) => {
      if (item.id === id) {
        quantidade += 1;
      }
      return '';
    });
    return quantidade;
  };

  render() {
    const { items } = this.props;
    const { total } = this.state;
    return (
      <section>
        {items.length === 0 ? (
          <h2 data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </h2>
        ) : (
          items.map((item) => this.verifica(item))
        )}
        {total}
        <Link to="/checkout" data-testid="checkout-products">
          Checkout
        </Link>
      </section>
    );
  }
}

Cart.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
};

export default Cart;
