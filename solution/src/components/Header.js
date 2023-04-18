import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CoffeeLogo from '../images/logo.svg';
import CartIcon from '../images/cart.svg';
import UserDetails from './UserDetails';
import './Header.css';

function Header({ cart }) {
  const cartQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <header className="header-component">
      <Link to="/">
        <img src={CoffeeLogo} alt="coffee logo" />
        <h1>Code Café</h1>
      </Link>
      <div className="menu">
        <Link to="/cart">
          <img src={CartIcon} alt="Cart" />
          <div
            className="badge"
            data-testid="cart-quantity"
          >
            {cartQuantity}
          </div>
        </Link>
        <UserDetails />
      </div>
    </header>
  );
}

Header.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    itemId: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  })).isRequired,
};

export default Header;
