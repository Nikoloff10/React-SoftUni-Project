import "../styles/CoffeeProduct.css";

const CoffeeProduct = () => {
  return (
    <div className="coffee-product">
      <div className="product-image-placeholder">
        <span>Coffee Image</span>
      </div>
      <div className="product-info">
        <h3>Coffee Name</h3>
        <div className="product-details">
          <p className="origin">Origin:</p>
          <p className="roast">Roast:</p>
        </div>
        <div className="product-footer">
          <span className="price">$price</span>
          <button className="add-to-cart-btn">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeProduct;
