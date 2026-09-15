import React from 'react';
import { useSelector } from 'react-redux';
import './Navbar.css';

function Navbar({ onHomeClick, onPlantsClick, onCartClick }) {
  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={onHomeClick}>
        Paradise Nursery
      </div>
      <div className="navbar-links">
        <span className="nav-link" onClick={onHomeClick}>
          Home
        </span>
        <span className="nav-link" onClick={onPlantsClick}>
          Plants
        </span>
        <span className="nav-link cart-link" onClick={onCartClick}>
          Cart
          <span className="cart-count">{totalItems}</span>
        </span>
      </div>
    </nav>
  );
}

export default Navbar;
