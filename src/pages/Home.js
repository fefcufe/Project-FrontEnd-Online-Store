import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  render() {
    return (
      <div>
        <h3 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h3>
        <button type="button">
          <Link
            to="/shoppingCart"
            data-testid="shopping-cart-button"
          >
            Carrinho de compras
            {' '}

          </Link>
        </button>
      </div>

    );
  }
}

export default Home;
