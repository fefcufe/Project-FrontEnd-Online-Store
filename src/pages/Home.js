import React from 'react';
import { Link } from 'react-router-dom';
import {
  getCategories,
  getProductsFromQuery,
  getProductsFromCategoryAndQuery,
} from '../services/api';

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      allCategories: [],
      searchWord: '',
      searchResult: [],
      resultsQueryAndCat: [],
      buttonCategoryClick: false,
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
      buttonCategoryClick: false,
    });
  }

  handleButtonCategorySearch = async (event) => {
    const buttonValue = event.target.value;
    const { searchResult } = this.state;
    const callSearchButton = await getProductsFromCategoryAndQuery(
      buttonValue,
      searchResult,
    );
    this.setState({
      resultsQueryAndCat: [...callSearchButton.results],
      buttonCategoryClick: true,
    });
  }

  render() {
    const {
      allCategories,
      searchResult,
      resultsQueryAndCat,
      buttonCategoryClick } = this.state;

    const comparClickEvent = (buttonCategoryClick) ? resultsQueryAndCat : searchResult;

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
              onClick={ this.handleButtonCategorySearch }
              value={ categorieObject.id }
            >
              { categorieObject.name }
            </button>
          ))}
        </section>
        <ul id="products">
          { comparClickEvent.map(({ id, price, thumbnail, title }) => (
            <li data-testid="product" key={ id }>
              <p>
                <strong>
                  <Link data-testid="product-detail-link" to={ `/productDetail/${id}` }>
                    { title }
                  </Link>
                </strong>
              </p>
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
