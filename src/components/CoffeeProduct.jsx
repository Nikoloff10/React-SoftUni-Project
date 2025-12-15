import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import "../styles/CoffeeProduct.css";

const CoffeeProduct = ({
  id,
  title,
  price,
  origin,
  roast,
  description,
  image,
}) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    addToCart({
      title,
      price,
      origin,
      roast,
      description,
      image,
      quantity,
    });

    alert(`Added ${quantity} x ${title} to cart!`);
    setQuantity(1);
  };

  const handleViewDetails = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="coffee-product">
      <div
        className="product-image-container"
        onClick={handleViewDetails}
        style={{ cursor: "pointer" }}
      >
        {image ? (
          <img src={image} alt={title} className="product-image" />
        ) : (
          <div className="product-image-placeholder">
            <span>Image Placeholder</span>
          </div>
        )}
      </div>
      <div className="product-info">
        <h3 onClick={handleViewDetails} style={{ cursor: "pointer" }}>
          {title}
        </h3>
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
