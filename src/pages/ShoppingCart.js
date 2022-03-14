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

  handleQuantitySub = (id) => {
    const { shoppingCart } = this.state;
    const productSearched = shoppingCart.findIndex((object) => object.id === id);
    const productAux = shoppingCart[productSearched];
    shoppingCart[productSearched] = {
      ...productAux,
      quantity: productAux.quantity - 1,
    };
    if (shoppingCart[productSearched].quantity === 0) {
      shoppingCart.splice(productSearched, 1);
    }
    this.setState({
      shoppingCart: [...shoppingCart],
    });
    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
  }

  handleQuantitySum = (id) => {
    const { shoppingCart } = this.state;
    const productSearched = shoppingCart.findIndex((object) => object.id === id);
    const productAux = shoppingCart[productSearched];
    shoppingCart[productSearched] = {
      ...productAux,
      quantity: productAux.quantity + 1,
    };
    this.setState({
      shoppingCart: [...shoppingCart],
    });
    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
  }

  handleBtnRemove = (id) => {
    const { shoppingCart } = this.state;
    const productSearched = shoppingCart.findIndex((object) => object.id === id);
    shoppingCart.splice(productSearched, 1);
    this.setState({
      shoppingCart: [...shoppingCart],
    });
    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
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
              <p data-testid="shopping-cart-product-quantity">
                quantity:
                {' '}
                {quantity}
              </p>
              <button
                data-testid="product-decrease-quantity"
                type="button"
                onClick={ () => this.handleQuantitySub(id) }
                value={ quantity }
              >
                -
              </button>
              <button
                data-testid="product-increase-quantity"
                type="button"
                onClick={ () => this.handleQuantitySum(id) }
                value={ quantity }
              >
                +
              </button>
              <button
                type="button"
                onClick={ () => this.handleBtnRemove(id) }
              >
                X
              </button>
              <p>{ price * quantity }</p>
            </li>
          ))}
        </ul>
        <button type="button">Finalizar Compra</button>
      </div>
    );
  }
}

export default ShoppingCart;
