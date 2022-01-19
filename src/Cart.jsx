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
    let quantidade = 0;
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
    const quantidade = this.quantity(item.id)
    if (array.length > 0) {
        if (array.some((it) => it === item.id)) {
            return '';
        } else if (array.some((it) => it === item.id) === false) {
            return <section>
            <h2 data-testid="shopping-cart-product-name">{item.title}</h2>
            <h2 data-testid="shopping-cart-product-quantity">{quantidade}</h2>
        </section>
        }
    } else {
        return <section key={ Math.random() }>
        <h2 data-testid="shopping-cart-product-name">{item.title}</h2>
        <h2 data-testid="shopping-cart-product-quantity">{quantidade}</h2>
    </section>
    }
    this.setState((prevState) => ({ array: [prevState.array, item.id]}))
    /*const { array } = this.state;
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
    this.setState((prevState) => ({ array: [...prevState.array, item.id]}));
    console.log(this.state.array);
    const array2 = this.state.array.slice(this.state.array.length / 2);
    console.log(array2); */
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
