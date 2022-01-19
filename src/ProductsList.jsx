import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { getCategories } from './services/api';

class ProductsList extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      categories: [],
      input: '',
    };
  }

  async componentDidMount() {
    const categorias = await getCategories();
    this.setStateCategories(categorias);
  }

  setStateCategories = (categorias) => {
    this.setState({ categories: [...categorias] });
  };

  fetchProducts = async (event) => {
    const categoriaID = event.target.nextSibling.innerHTML;
    fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoriaID}`)
      .then((response) => response.json())
      .then((data) => this.setState({ products: [...data.results] }));
  };

  fetchProduct = () => {
    const { input } = this.state;
    fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${input}`)
      .then((response) => response.json())
      .then((data) => this.setState({ products: [...data.results] }));
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { products, categories, input } = this.state;
    const { addCartItem } = this.props;
    return (
      <>
        <input
          data-testid="query-input"
          onChange={ this.handleChange }
          type="text"
          name="input"
          value={ input }
        />
        <button
          onClick={ this.fetchProduct }
          type="button"
          data-testid="query-button"
        >
          Pesquisar
        </button>
        {products.length === 0 ? (
          <section>
            <h2 data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </h2>
            {categories.length > 0
              && categories.map((categoria) => (
                <div key={ Math.random() }>
                  <button
                    onClick={ (event) => this.fetchProducts(event) }
                    type="button"
                    key={ categoria.id }
                    data-testid="category"
                  >
                    {categoria.name}
                  </button>
                  <h2 style={ { display: 'none' } }>{categoria.id}</h2>
                </div>
              ))}
          </section>
        ) : (
          ''
        )}
        <Link to="/cart" data-testid="shopping-cart-button">
          Carrinho
        </Link>
        {products.map((produto) => (
          <div data-testid="product" key={ Math.random() }>
            <h2>{produto.title}</h2>
            <img alt="imagem" src={ produto.thumbnail } />
            <h3>{produto.price}</h3>
            <Link
              to={ `/cart/${produto.id}` }
              data-testid="product-detail-link"
            >
              Mais detalhes
            </Link>
            <button
              onClick={ () => addCartItem(produto.id) }
              data-testid="product-add-to-cart"
              type="button"
            >
              Adicionar ao Carrinho
            </button>
          </div>
        ))}
      </>
    );
  }
}

ProductsList.propTypes = {
  addCartItem: propTypes.func.isRequired,
};

export default ProductsList;
