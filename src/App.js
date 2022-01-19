import React from 'react';
import './App.css';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import ProductsList from './ProductsList';
import Cart from './Cart';
import Details from './Details';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={ ProductsList } />
        <Route exact path="/cart" component={ Cart } />
        <Route exact path="/cart/:id" component={ Details } />
      </BrowserRouter>
    );
  }
}

export default App;
