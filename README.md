# Paradise Nursery

Paradise Nursery is a React + Redux shopping cart application for an online
plant shop. Users can browse houseplants organized by category, view details
such as thumbnail, name, description, and price, add plants to a shopping
cart, and manage the quantity or removal of items in the cart.

## Features

- Landing page with the company name, a tagline, an "About Us" section, and a
  "Get Started" button.
- Product listing page with plants grouped into three categories (Air
  Purifying, Aromatic Fragrant, and Insect Repellent Plants), each showing at
  least six unique plants with a thumbnail, name, and price.
- "Add to Cart" buttons that add the product to the cart, disable themselves
  once clicked, and increment the cart icon count.
- A navigation bar on the product listing and cart pages with links to Home,
  Plants, and Cart, plus a live cart item count.
- A shopping cart page showing each item's thumbnail, name, unit price, and
  line total, with quantity increase/decrease and delete controls, an overall
  cart total, a "Continue Shopping" button, and a "Checkout" button.

## Tech Stack

- [React](https://react.dev/) (via [Vite](https://vite.dev/))
- [Redux Toolkit](https://redux-toolkit.js.org/) and
  [React Redux](https://react-redux.js.org/) for cart state management

## Project Structure

```
src/
  App.jsx                  Landing page and top-level page navigation
  App.css
  redux/
    CartSlice.jsx           Redux slice: addItem, removeItem, updateQuantity
    store.js
  components/
    AboutUs.jsx              About Us modal
    Navbar.jsx                Shared navigation bar with live cart count
    ProductList.jsx           Product listing page
    CartItem.jsx               Shopping cart page
```

## Getting Started

```bash
npm install
npm run dev
```

Then open the printed local URL in your browser.

## Available Scripts

- `npm run dev` — start the development server
- `npm run build` — build for production
- `npm run preview` — preview the production build locally
