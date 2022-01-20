import React from 'react';
import propTypes from 'prop-types';

class Cart extends React.Component {
  constructor() {
    super();

    this.state = {
      array: [],
      total: 0,
    };
  }

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
    }

    adiciona = (quantidade, id) => {
      let valor = document.getElementById(id).innerText;
      console.log(valor);
      document.getElementById(id).innerText -= (-quantidade);
    }

    remover = (quantidade, id) => {
      let valor = document.getElementById(id).innerText;
      console.log(valor);
      if (document.getElementById(id).innerText > 0) {
        document.getElementById(id).innerText -= (quantidade);
      }
    }

   verifica = (item) => {
     const { array } = this.state;
     let quantidade = this.quantity(item.id);
     if (array.length > 0) {
       if (array.some((it) => it === item.id)) {
         return '';
       } if (array.some((it) => it === item.id) === false) {
         return (
           <section>
             <h2 data-testid="shopping-cart-product-name">{item.title}</h2>
             <h2 data-testid="shopping-cart-product-quantity">{quantidade}</h2>
             <button onClick={ () => quantidade += 1 } data-testid="product-increase-quantity">Adiciona</button>
             <button data-testid="product-decrease-quantity">Retira</button>
           </section>);
       }
     } else {
       return (
         <section data-testid="teste" key={ Math.random() }>
           <h2 data-testid="shopping-cart-product-name">{item.title}</h2>
           <h2 id={ item.id } data-testid="shopping-cart-product-quantity">{quantidade}</h2>
           <button onClick={ () => this.adiciona(quantidade, item.id) } data-testid="product-increase-quantity">Adiciona</button>
           <button onClick={ () => this.remover(quantidade, item.id) } data-testid="product-decrease-quantity">Retira</button>
         </section>);
     }
   }

   componentDidMount() {
    let total = 0;
    const { items } = this.props;
    items.map((item) => total += item.price);
    this.setState({ total: total });
   }

   render() {
     const { items } = this.props;
     const { total } = this.state;
     return (
       <section>
         {items.length === 0
           ? <h2 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h2>
           : items.map((item) => {
            return this.verifica(item)
             })}
           {total}
       </section>
     );
   }
}

Cart.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
};

export default Cart;
