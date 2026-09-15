import React from 'react';
import './AboutUs.css';

function AboutUs({ onClose }) {
  return (
    <div className="about-us-overlay" onClick={onClose}>
      <div className="about-us-modal" onClick={(e) => e.stopPropagation()}>
        <button className="about-us-close" onClick={onClose} aria-label="Close">
          &times;
        </button>
        <h2>About Paradise Nursery</h2>
        <p>
          Paradise Nursery is dedicated to providing you with the highest quality
          plants for your home and garden. With years of experience in plant
          cultivation, we ensure that you get the healthiest, most vibrant plants
          delivered right to your doorstep. Our mission is to introduce beautiful,
          easy-to-maintain plants that enhance your living spaces and support a
          greener, healthier lifestyle.
        </p>
        <p>
          From air-purifying varieties to fragrant blooms and natural insect
          repellents, our curated collection is chosen with care by our team of
          horticulturists. Every plant that leaves our nursery is nurtured with
          love, so you can bring a little bit of nature into your everyday life.
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
