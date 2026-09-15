import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/CartSlice';
import Navbar from './Navbar';
import './ProductList.css';

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      {
        name: 'Snake Plant',
        image: 'https://placehold.co/300x300/1b5e20/ffffff?text=Snake+Plant',
        description: 'Removes toxins and releases oxygen at night.',
        cost: 15,
      },
      {
        name: 'Spider Plant',
        image: 'https://placehold.co/300x300/1b5e20/ffffff?text=Spider+Plant',
        description: 'Easy to grow and great at filtering indoor air.',
        cost: 12,
      },
      {
        name: 'Peace Lily',
        image: 'https://placehold.co/300x300/1b5e20/ffffff?text=Peace+Lily',
        description: 'Elegant white blooms with strong air-cleaning power.',
        cost: 18,
      },
      {
        name: 'Boston Fern',
        image: 'https://placehold.co/300x300/1b5e20/ffffff?text=Boston+Fern',
        description: 'Lush, feathery fronds that humidify the air.',
        cost: 16,
      },
      {
        name: 'Rubber Plant',
        image: 'https://placehold.co/300x300/1b5e20/ffffff?text=Rubber+Plant',
        description: 'Glossy leaves and reliable air purification.',
        cost: 17,
      },
      {
        name: 'Aloe Vera',
        image: 'https://placehold.co/300x300/1b5e20/ffffff?text=Aloe+Vera',
        description: 'Low-maintenance succulent with healing gel.',
        cost: 14,
      },
    ],
  },
  {
    category: 'Aromatic Fragrant Plants',
    plants: [
      {
        name: 'Lavender',
        image: 'https://placehold.co/300x300/6a1b9a/ffffff?text=Lavender',
        description: 'Calming fragrance perfect for relaxation.',
        cost: 20,
      },
      {
        name: 'Jasmine',
        image: 'https://placehold.co/300x300/6a1b9a/ffffff?text=Jasmine',
        description: 'Sweet-smelling blossoms that bloom at night.',
        cost: 18,
      },
      {
        name: 'Rosemary',
        image: 'https://placehold.co/300x300/6a1b9a/ffffff?text=Rosemary',
        description: 'Fragrant herb great for cooking and aroma.',
        cost: 15,
      },
      {
        name: 'Mint',
        image: 'https://placehold.co/300x300/6a1b9a/ffffff?text=Mint',
        description: 'Refreshing scent, fast-growing and versatile.',
        cost: 10,
      },
      {
        name: 'Basil',
        image: 'https://placehold.co/300x300/6a1b9a/ffffff?text=Basil',
        description: 'Aromatic kitchen herb with a peppery scent.',
        cost: 9,
      },
      {
        name: 'Chamomile',
        image: 'https://placehold.co/300x300/6a1b9a/ffffff?text=Chamomile',
        description: 'Soothing floral scent, popular for tea.',
        cost: 14,
      },
    ],
  },
  {
    category: 'Insect Repellent Plants',
    plants: [
      {
        name: 'Citronella',
        image: 'https://placehold.co/300x300/e65100/ffffff?text=Citronella',
        description: 'Naturally keeps mosquitoes away.',
        cost: 16,
      },
      {
        name: 'Lemongrass',
        image: 'https://placehold.co/300x300/e65100/ffffff?text=Lemongrass',
        description: 'Citrusy scent that repels insects.',
        cost: 12,
      },
      {
        name: 'Marigold',
        image: 'https://placehold.co/300x300/e65100/ffffff?text=Marigold',
        description: 'Bright blooms that deter garden pests.',
        cost: 8,
      },
      {
        name: 'Catnip',
        image: 'https://placehold.co/300x300/e65100/ffffff?text=Catnip',
        description: 'Repels mosquitoes and delights cats.',
        cost: 11,
      },
      {
        name: 'Mosquito Plant',
        image: 'https://placehold.co/300x300/e65100/ffffff?text=Mosquito+Plant',
        description: 'Citronella-scented geranium that wards off bugs.',
        cost: 13,
      },
      {
        name: 'Eucalyptus',
        image: 'https://placehold.co/300x300/e65100/ffffff?text=Eucalyptus',
        description: 'Fresh scent that naturally repels insects.',
        cost: 19,
      },
    ],
  },
];

function ProductList({ onHomeClick, onPlantsClick, onCartClick }) {
  const dispatch = useDispatch();
  const [addedToCart, setAddedToCart] = useState({});

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prev) => ({ ...prev, [plant.name]: true }));
  };

  return (
    <div className="product-list-page">
      <Navbar onHomeClick={onHomeClick} onPlantsClick={onPlantsClick} onCartClick={onCartClick} />
      <h1 className="page-title">Our Plants</h1>
      {plantsArray.map((categoryObj) => (
        <div className="category-section" key={categoryObj.category}>
          <h2 className="category-title">{categoryObj.category}</h2>
          <div className="plants-grid">
            {categoryObj.plants.map((plant) => (
              <div className="plant-card" key={plant.name}>
                <img src={plant.image} alt={plant.name} className="plant-thumbnail" />
                <h3 className="plant-name">{plant.name}</h3>
                <p className="plant-description">{plant.description}</p>
                <p className="plant-cost">${plant.cost.toFixed(2)}</p>
                <button
                  className="add-to-cart-btn"
                  disabled={Boolean(addedToCart[plant.name])}
                  onClick={() => handleAddToCart(plant)}
                >
                  {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
