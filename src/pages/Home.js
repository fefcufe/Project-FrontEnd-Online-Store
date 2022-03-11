import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromQuery } from '../services/api';

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      allCategories: [],
      searchWord: '',
      searchResult: [],
    };
  }

  async componentDidMount() {
    const result = await getCategories();

    this.setState({
      allCategories: [...result],
    });
    /* const { allCategories } = this.state;
    console.log(allCategories); */
  }

  handleChange = ({ target: { value } }) => {
    this.setState({
      searchWord: value,
    });
  }

  handleClick = async () => {
    const { searchWord } = this.state;
    const result = await getProductsFromQuery(searchWord);
    console.log(result);

    this.setState({
      searchResult: [...result.results],
    });
  }

  render() {
    const { allCategories, searchResult } = this.state;
    return (
      <div id="HomePage">
        <h3 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h3>
        {/* requisito 5 */}
        <input
          placeholder="exemplo: automóvel"
          data-testid="query-input"
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="query-button"
          onClick={ this.handleClick }
        >
          Buscar
        </button>
        <button type="button">
          <Link
            to="/shoppingCart"
            data-testid="shopping-cart-button"
          >
            Carrinho de compras

          </Link>
        </button>
        <section id="categories">
          { allCategories.map((categorieObject) => (
            <button
              type="button"
              key={ categorieObject.id }
              data-testid="category"
            >
              { categorieObject.name }
            </button>
          ))}
        </section>
        <ul id="products">
          { searchResult.map(({ id, price, thumbnail, title }) => (
            <li data-testid="product" key={ id }>
              <p><strong>{ title }</strong></p>
              <img src={ thumbnail } alt="imagem produto" />
              <p>{ price }</p>
            </li>
          ))}

        </ul>
      </div>
    );
  }
}

export default Home;
