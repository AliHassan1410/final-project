import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '../redux/CartSlice';
import Navbar from './Navbar';
import './CartItem.css';

function CartItem({ onHomeClick, onPlantsClick, onContinueShopping }) {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const calculateItemTotal = (item) => (item.cost * item.quantity).toFixed(2);

  const calculateTotalAmount = () =>
    cartItems.reduce((total, item) => total + item.cost * item.quantity, 0).toFixed(2);

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleDelete = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckoutClick = () => {
    alert('Checkout functionality is coming soon!');
  };

  return (
    <div className="cart-page">
      <Navbar onHomeClick={onHomeClick} onPlantsClick={onPlantsClick} onCartClick={() => {}} />
      <h1 className="page-title">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p className="empty-cart-message">Your cart is empty.</p>
      ) : (
        <div className="cart-items-list">
          {cartItems.map((item) => (
            <div className="cart-item" key={item.name}>
              <img src={item.image} alt={item.name} className="cart-item-thumbnail" />
              <div className="cart-item-details">
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-unit-price">Unit Price: ${item.cost.toFixed(2)}</p>
                <div className="quantity-controls">
                  <button className="quantity-btn" onClick={() => handleDecrement(item)}>
                    -
                  </button>
                  <span className="quantity-value">{item.quantity}</span>
                  <button className="quantity-btn" onClick={() => handleIncrement(item)}>
                    +
                  </button>
                </div>
                <p className="cart-item-total">Total: ${calculateItemTotal(item)}</p>
                <button className="delete-btn" onClick={() => handleDelete(item)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="cart-summary">
        <h2 className="cart-total">Total Amount: ${calculateTotalAmount()}</h2>
        <div className="cart-actions">
          <button className="continue-shopping-btn" onClick={onContinueShopping}>
            Continue Shopping
          </button>
          <button className="checkout-btn" onClick={handleCheckoutClick}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
