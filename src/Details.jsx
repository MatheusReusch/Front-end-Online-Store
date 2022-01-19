import React from 'react';
import propTypes from 'prop-types';

class Details extends React.Component {
  constructor() {
    super();
    this.state = {
      produto: {},
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

  render() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    console.log(id);
    const { produto } = this.state;
    return (
      <section>
        <h2 data-testid="product-detail-name">{produto.title}</h2>
        <img alt="imagem" src={ produto.thumbnail } />
        <h2>{produto.price}</h2>
      </section>
    );
  }
}

Details.propTypes = {
  match: propTypes.arrayOf(propTypes.object).isRequired,
  params: propTypes.arrayOf(propTypes.object).isRequired,
  id: propTypes.number.isRequired,
};

export default Details;
