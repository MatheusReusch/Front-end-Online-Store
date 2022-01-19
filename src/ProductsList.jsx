import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from './services/api';

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
    console.log(categorias);
    this.setStateCategories(categorias);
  }

  setStateCategories = (categorias) => {
    this.setState({ categories: [...categorias] });
  };

  fetchProducts = async (event, input) => {
    const categoria = event.target.innerHTML;
    const produtos = await getProductsFromCategoryAndQuery(categoria, input);
    this.setState({ products: [...produtos.results] });
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
    console.log(products.map((produto) => console.log(produto.title)));
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
            <Link to="/cart" data-testid="shopping-cart-button">
              Carrinho
            </Link>
            {categories.length > 0
              && categories.map((categoria) => (
                <button
                  onClick={ (event) => this.fetchProducts(event, input) }
                  type="button"
                  key={ categoria.id }
                  data-testid="category"
                >
                  {categoria.name}
                </button>
              ))}
          </section>
        ) : (
          ''
        )}
        {products.map((produto) => (
          <div data-testid="product" key={ Math.random() }>
            <h2>{produto.title}</h2>
            <img alt="imagem" src={ produto.thumbnail } />
            <h3>{produto.price}</h3>
          </div>
        ))}
      </>
    );
  }
}

export default ProductsList;
