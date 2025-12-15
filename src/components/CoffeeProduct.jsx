import { useState } from "react";
import "../styles/CoffeeProduct.css";

const CoffeeProduct = ({ title, price, origin, roast, description, image }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    // This will be connected to cart functionality later
    console.log(`Added ${quantity} x ${title} to cart`);
  };

  return (
    <div className="coffee-product">
      <div className="product-image-container">
        {image ? (
          <img src={image} alt={title} className="product-image" />
        ) : (
          <div className="product-image-placeholder">
            <span>Image Placeholder</span>
          </div>
        )}
      </div>
      <div className="product-info">
        <h3>{title}</h3>
        <p className="description">{description}</p>
        <div className="product-details">
          <p className="origin">Origin: {origin}</p>
          <p className="roast">Roast: {roast}</p>
        </div>
        <div className="quantity-selector">
          <button className="quantity-btn" onClick={handleDecrement}>
            -
          </button>
          <span className="quantity-display">{quantity}</span>
          <button className="quantity-btn" onClick={handleIncrement}>
            +
          </button>
        </div>
        <div className="product-footer">
          <span className="price">${(price * quantity).toFixed(2)}</span>
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeProduct;
