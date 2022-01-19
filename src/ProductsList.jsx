import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from './services/api';

class ProductsList extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      categories: [],
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

  render() {
    const { products, categories } = this.state;
    return (
      <>
        <input type="text" />
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
              <button type="button" key={ categoria.id } data-testid="category">
                {categoria.name}
              </button>
            ))}
          </section>
        ) : (
          ''
        )}
      </>
    );
  }
}

export default ProductsList;
