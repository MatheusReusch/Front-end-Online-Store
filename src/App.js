import React from 'react';
import './App.css';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import ProductsList from './ProductsList';
import Cart from './Cart';
import Details from './Details';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      cartItems: [],
    }
  }

  addCartItem = (productId) => {
    fetch(`https://api.mercadolibre.com/items/${productId}`)
      .then((response) => response.json())
      .then((data) => this.setState((prevState) => ({ cartItems: [...prevState.cartItems, data] })));
  }
  
  render() {
    const { cartItems } = this.state;
    return (
      <BrowserRouter>
        <Route exact path="/" render={() => <ProductsList addCartItem={ this.addCartItem } />} />
        <Route exact path="/cart" render={() => <Cart items={ cartItems } /> } />
        <Route exact path='/cart/:id' component={ Details }></Route>
      </BrowserRouter>
    );
  }
}

export default App;
