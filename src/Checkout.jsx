import React from 'react';

class Checkout extends React.Component {
  render() {
    return (
      <section>
        <input data-testid="checkout-fullname" type="text" />
        <input data-testid="checkout-email" type="text" />
        <input data-testid="checkout-cpf" type="text" />
        <input data-testid="checkout-phone" type="text" />
        <input data-testid="checkout-cep" type="text" />
        <input data-testid="checkout-address" type="text" />
      </section>
    );
  }
}

export default Checkout;
