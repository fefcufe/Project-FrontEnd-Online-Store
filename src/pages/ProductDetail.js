import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductID } from '../services/api';

class ProductDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      img: '',
      price: '',
      details: [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const productInfos = await getProductID(id);
    console.log(productInfos);
    this.setState({
      name: productInfos.title,
      img: productInfos.thumbnail,
      price: productInfos.price,
      details: [...productInfos.attributes],
    });
  }

  render() {
    const { name, img, price, details } = this.state;
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
          <p data-testid="product-detail-name"><strong>{ name }</strong></p>
          <img src={ img } alt="imagem produto" />
          <p>{ price }</p>
          <ul>
            {details.map(({ value_name: valueName, id, name: nome }) => (
              <li key={ id }>
                <p>{`${nome}: ${valueName}`}</p>
              </li>
            ))}
          </ul>
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
