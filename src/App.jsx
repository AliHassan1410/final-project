import React, { useState } from 'react';
import ProductList from './components/ProductList';
import CartItem from './components/CartItem';
import AboutUs from './components/AboutUs';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [showAboutUs, setShowAboutUs] = useState(false);

  const handleGetStartedClick = () => setCurrentPage('products');
  const handleHomeClick = () => setCurrentPage('landing');
  const handlePlantsClick = () => setCurrentPage('products');
  const handleCartClick = () => setCurrentPage('cart');
  const handleContinueShopping = () => setCurrentPage('products');

  if (currentPage === 'products') {
    return (
      <ProductList
        onHomeClick={handleHomeClick}
        onPlantsClick={handlePlantsClick}
        onCartClick={handleCartClick}
      />
    );
  }

  if (currentPage === 'cart') {
    return (
      <CartItem
        onHomeClick={handleHomeClick}
        onPlantsClick={handlePlantsClick}
        onContinueShopping={handleContinueShopping}
      />
    );
  }

  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1 className="company-name" onClick={() => setShowAboutUs(true)}>
          Paradise Nursery
        </h1>
        <p className="tagline">Where Green Meets Serenity</p>
        <div className="landing-actions">
          <button className="get-started-btn" onClick={handleGetStartedClick}>
            Get Started
          </button>
          <button className="about-us-link" onClick={() => setShowAboutUs(true)}>
            About Us
          </button>
        </div>
      </div>
      {showAboutUs && <AboutUs onClose={() => setShowAboutUs(false)} />}
    </div>
  );
}

export default App;
