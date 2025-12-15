import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import "../styles/ShoppingCart.css";

const ShoppingCart = () => {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalPrice,
  } = useContext(CartContext);
  const navigate = useNavigate();

  const handleQuantityChange = (productTitle, change) => {
    const item = cartItems.find((item) => item.title === productTitle);
    if (item) {
      updateQuantity(productTitle, item.quantity + change);
    }
  };

  const handleFinishOrder = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    alert("Your order will be processed shortly! Thank you for your purchase.");
    clearCart();
    navigate("/catalog");
  };

  return (
    <section className="shopping-cart">
      <div className="cart-container">
        <h2>Shopping Cart</h2>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <button
              className="continue-shopping"
              onClick={() => navigate("/catalog")}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.title} className="cart-item">
                  <div className="item-info">
                    <h3>{item.title}</h3>
                    <p className="item-details">
                      {item.origin} - {item.roast}
                    </p>
                  </div>

                  <div className="item-quantity">
                    <button
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(item.title, -1)}
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(item.title, 1)}
                    >
                      +
                    </button>
                  </div>

                  <div className="item-price">
                    <p className="unit-price">${item.price.toFixed(2)} each</p>
                    <p className="total-price">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.title)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="summary-row">
                <span>Total Items:</span>
                <span>
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>
              <div className="summary-row total">
                <span>Total Price:</span>
                <span className="total-amount">
                  ${getTotalPrice().toFixed(2)}
                </span>
              </div>
              <button className="finish-order-btn" onClick={handleFinishOrder}>
                Finish Order
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ShoppingCart;
