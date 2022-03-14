import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductID } from '../services/api';

class ProductDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedProduct: {},
      shoppingCart: [],
    };
  }

  async componentDidMount() {
    if (!localStorage.getItem('shoppingCart')) {
      localStorage.setItem('shoppingCart', JSON.stringify([]));
    }
    const shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));

    const { match: { params: { id } } } = this.props;
    const selectedProduct = await getProductID(id);
    this.setState({
      selectedProduct,
      shoppingCart,
    });
  }

  handleButtonCartClick = (product) => {
    const { shoppingCart } = this.state;

    const productSearched = shoppingCart.findIndex((object) => object.id === product.id);
    if (productSearched >= 0) {
      const productAux = shoppingCart[productSearched];
      shoppingCart[productSearched] = {
        ...productAux,
        quantity: productAux.quantity + 1,
      };
    } else {
      shoppingCart.push({ ...product, quantity: 1 });
    }
    this.setState({
      shoppingCart: [...shoppingCart],
    });
    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
  }

  render() {
    const { selectedProduct } = this.state;

    return (
      <div>
        <button type="button">
          <Link
            to="/shoppingCart"
            data-testid="shopping-cart-button"
          >
            Carrinho de compras
          </Link>
        </button>

        <div>
          <p data-testid="product-detail-name"><strong>{ selectedProduct.title }</strong></p>
          <img src={ selectedProduct.thumbnail } alt="imagem produto" />
          <p>{ selectedProduct.price }</p>
          <ul>
            {selectedProduct.attributes?.map(({ value_name: valueName, id, name: nome }) => (
              <li key={ id }>
                <p>{`${nome}: ${valueName}`}</p>
              </li>
            ))}
          </ul>
          <button
            type="button"
            data-testid="product-detail-add-to-cart"
            onClick={ () => this.handleButtonCartClick(selectedProduct) }
          >
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    );
  }
}

ProductDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default ProductDetail;
