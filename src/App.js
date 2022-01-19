import React from 'react';
import './App.css';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import ProductsList from './ProductsList';
import Cart from './Cart';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={ ProductsList } />
        <Route exact path="/cart" component={ Cart } />
      </BrowserRouter>
    );
  }
}

export default App;
