import React from 'react';

class Cart extends React.Component {
   constructor() {
       super();

       this.state = {
           array: []
       }
   }
    
   
    quantity = (id) => {
    const { items } = this.props;
    let quantidade = 1;
    items.map((item) => {
      if (item.id === id) {
        quantidade++
      }
      return '';
    })
    return quantidade;
   }
   
   verifica = (item) => {
    const { array } = this.state;
    const jaExiste = array.length > 0 ? array.some((it) => it === item.id) : '';
    if ( jaExiste ) {
        console.log('Chegou emcima')
        return '';
    } else if ( jaExiste === false ) {
        const quantidade = this.quantity(item.id)
        return <section>
            <h2 data-testid="shopping-cart-product-name">{item.title}</h2>
            <h2 data-testid="shopping-cart-product-quantity">{quantidade}</h2>
        </section>
    }
    const array2 = this.state.array;
    console.log(array2);
    this.setState((prevState) => ({ array: array2.push(item.id) }));
   }

    render() {
    const { items } = this.props;
    return (
      <section>
        {items.length === 0 ? <h2 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h2> : items.map((item) => {
            return this.verifica(item);
        })}
      </section>
    );
  }
}

export default Cart;
