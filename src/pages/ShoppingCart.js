import React from 'react';

class ShoppingCart extends React.Component {
  constructor() {
    super();
    this.state = {
      shoppingCart: [],
    };
  }

  async componentDidMount() {
    if (!localStorage.getItem('shoppingCart')) {
      localStorage.setItem('shoppingCart', JSON.stringify([]));
    }
    const shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
    this.setState({
      shoppingCart,
    });
  }

  render() {
    const { shoppingCart } = this.state;
    return shoppingCart.length === 0 ? (
      <p data-testid="shopping-cart-empty-message">
        Seu carrinho está vazio
      </p>
    ) : (
      <div>
        <h1>
          Seu carrinho contém:
        </h1>
        <ul>
          {shoppingCart.map(({ id, price, thumbnail, title, quantity }) => (
            <li key={ id }>
              <p data-testid="shopping-cart-product-name">
                <strong>

                  { title }

                </strong>
              </p>
              <img src={ thumbnail } alt="imagem produto" />
              <p>{ price * quantity }</p>
              <p data-testid="shopping-cart-product-quantity">
                quantity:
                {' '}
                {quantity}
              </p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ShoppingCart;
