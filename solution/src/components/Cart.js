import axios from 'axios';
import PropTypes from 'prop-types';
import { useMemo, useRef, useState } from 'react';
import ItemType from '../types/item';
import CartRow from './CartRow';
import './Cart.css';
import Alert from './Alert';
import { CartTypes } from '../reducers/cartReducer';

function Cart({ cart, dispatch, items }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [apiError, setApiError] = useState('');
  const zipRef = useRef();

  const subTotal = cart.reduce((acc, item) => {
    const detailItem = items.find((i) => i.itemId === item.itemId);
    const itemPrice = detailItem.salePrice ?? detailItem.price;
    return item.quantity * itemPrice + acc;
  }, 0);

  const taxRate = useMemo(
    () => {
      const taxPercentage = parseInt(zipCode.substring(0, 1) || '0', 10) + 1;
      return taxPercentage / 100;
    },
    [zipCode],
  );
  const tax = subTotal * taxRate;
  const total = subTotal + tax;
  const isFormValid = zipCode.length === 5 && name.trim();

  const submitOrder = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setApiError('');
    try {
      await axios.post('/api/orders', {
        items: cart,
        name,
        phone,
        zipCode,
      });
      dispatch({ type: CartTypes.EMPTY });
      setShowSuccessAlert(true);
    } catch (error) {
      console.error('Error submitting the order', error);
      setApiError(error?.response?.data?.error || 'Unknown Error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const setFormattedPhone = (newNumber) => {
    const digits = newNumber.replace(/\D/g, '');
    let formatted = digits.substring(0, 3);
    if (digits.length === 3 && newNumber[3] === '-') {
      formatted = `${formatted}-`;
    } else if (digits.length > 3) {
      formatted = `${formatted}-${digits.substring(3, 6)}`;
    }
    if (digits.length === 6 && newNumber[7] === '-') {
      formatted = `${formatted}-`;
    } else if (digits.length > 6) {
      formatted = `${formatted}-${digits.substring(6, 10)}`;
    }

    if (digits.length === 10) {
      zipRef.current.focus();
    }
    setPhone(formatted);
  };

  return (
    <div className="cart-component">
      <Alert visible={showSuccessAlert} type="success">
        Thank you for your order.
      </Alert>
      <Alert visible={!!apiError} type="error">
        <p>There was an error submitting your order.</p>
        <p>{apiError}</p>
        <p>Please try again.</p>
      </Alert>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <div>Your cart is empty.</div>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Quantity</th>
                <th>Item</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <CartRow
                  key={item.itemId}
                  cartItem={item}
                  items={items}
                  dispatch={dispatch}
                />
              ))}
            </tbody>
          </table>
          <div>
            Subtotal: $
            {subTotal.toFixed(2)}
          </div>
          { zipCode.length === 5
            ? (
              <>
                <div>
                  Tax: $
                  {tax.toFixed(2)}
                </div>
                <div>
                  Total: $
                  { total.toFixed(2) }
                </div>
              </>
            ) : (
              <div className="warning">Enter ZIP Code to get total</div>
            )}
          <h2>Checkout</h2>
          <form onSubmit={submitOrder}>
            <label htmlFor="name">
              Name
              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </label>
            <label htmlFor="phone">
              Phone Number
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(event) => setFormattedPhone(event.target.value)}
                aria-label="Enter your phone number.
                After a phone number is entered,
                you will automatically be moved to the next field."
              />
            </label>
            <label htmlFor="zipcode">
              ZIP Code
              <input
                id="zipcode"
                type="text"
                maxLength="5"
                inputMode="numeric"
                value={zipCode}
                onChange={(event) => setZipCode(event.target.value)}
                required
                ref={zipRef}
              />
            </label>
            <button type="submit" disabled={!isFormValid || isSubmitting}>
              Order Now
            </button>
          </form>
        </>
      )}
    </div>
  );
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    itemId: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(ItemType).isRequired,
};

export default Cart;
