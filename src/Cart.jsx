import React from 'react';
import propTypes from 'prop-types';

class Cart extends React.Component {
  constructor() {
    super();

    this.state = {
      array: [],
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

   verifica = (item) => {
     const { array } = this.state;
     const quantidade = this.quantity(item.id);
     if (array.length > 0) {
       if (array.some((it) => it === item.id)) {
         return '';
       } if (array.some((it) => it === item.id) === false) {
         return (
           <section>
             <h2 data-testid="shopping-cart-product-name">{item.title}</h2>
             <h2 data-testid="shopping-cart-product-quantity">{quantidade}</h2>
           </section>);
       }
     } else {
       return (
         <section key={ Math.random() }>
           <h2 data-testid="shopping-cart-product-name">{item.title}</h2>
           <h2 data-testid="shopping-cart-product-quantity">{quantidade}</h2>
         </section>);
     }
     this.setState((prevState) => ({ array: [prevState.array, item.id] }));
   }

   render() {
     const { items } = this.props;
     return (
       <section>
         {items.length === 0
           ? <h2 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h2>
           : items.map((item) => this.verifica(item))}
       </section>
     );
   }
}

Cart.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
};

export default Cart;
