import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import "../styles/CoffeeProductDetails.css";

const CoffeeProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);

  const coffeeProducts = [
    {
      id: 1,
      title: "Starlight Elixir",
      price: 16.99,
      origin: "Ethiopia",
      roast: "Light Roast",
      description:
        "Floral and fruity with notes of blueberry and jasmine. A bright, clean cup perfect for pour-over.",
      image: "/photos/CoffeePhotos/StarLightElixir.png",
      fullDescription:
        "Starlight Elixir is a meticulously crafted light roast coffee sourced from the highlands of Ethiopia. This exceptional coffee showcases the natural beauty of Ethiopian coffee with its distinctive floral aromatics and vibrant fruit notes. The processing method enhances the natural sugars, creating a cup that's both complex and approachable. Perfect for those who appreciate the nuanced flavors that lighter roasts can offer.",
      tastingNotes: ["Blueberry", "Jasmine", "Citrus", "Honey"],
      brewMethods: ["Pour Over", "Chemex", "Aeropress", "Cold Brew"],
    },
    {
      id: 2,
      title: "Opal Estate Select",
      price: 14.99,
      origin: "Colombia",
      roast: "Medium Roast",
      description:
        "Smooth and balanced with caramel sweetness and nutty undertones. A classic everyday coffee.",
      image: "/photos/CoffeePhotos/OpalEstateSelect.png",
      fullDescription:
        "From the renowned coffee-growing regions of Colombia, Opal Estate Select represents the perfect balance in a coffee. This medium roast brings out the inherent sweetness of the beans while maintaining a smooth, approachable profile. It's an ideal choice for daily brewing, offering consistency and quality in every cup.",
      tastingNotes: ["Caramel", "Hazelnut", "Brown Sugar", "Cocoa"],
      brewMethods: ["Drip", "French Press", "Pour Over", "Espresso"],
    },
    {
      id: 3,
      title: "Grand Cru Nocturne",
      price: 15.99,
      origin: "Indonesia",
      roast: "Dark Roast",
      description:
        "Full-bodied with earthy, herbal notes and low acidity. Rich and bold with a syrupy mouthfeel.",
      image: "/photos/CoffeePhotos/GrandCruNocturne.png",
      fullDescription:
        "Grand Cru Nocturne hails from the Indonesian archipelago, where volcanic soil and unique processing methods create a coffee with unmatched body and depth. This dark roast is perfect for those who prefer a bold, intense coffee experience. The low acidity makes it gentle on the stomach while delivering robust flavors.",
      tastingNotes: ["Dark Chocolate", "Earth", "Spice", "Tobacco"],
      brewMethods: ["French Press", "Espresso", "Moka Pot", "Turkish"],
    },
    {
      id: 4,
      title: "Velvet Crown Blend",
      price: 17.99,
      origin: "Costa Rica",
      roast: "Medium Roast",
      description:
        "Crisp and clean with citrus notes and chocolate finish. Well-balanced acidity and sweetness.",
      image: "/photos/CoffeePhotos/VelvetCrownBlend.png",
      fullDescription:
        "Velvet Crown Blend showcases the exceptional quality of Costa Rican coffee. Grown in high-altitude regions with ideal conditions, this medium roast offers a perfect harmony of bright acidity and sweet chocolate notes. The clean finish makes it a favorite among coffee enthusiasts who appreciate clarity and complexity.",
      tastingNotes: ["Orange", "Milk Chocolate", "Almond", "Vanilla"],
      brewMethods: ["Pour Over", "Drip", "Espresso", "Aeropress"],
    },
    {
      id: 5,
      title: "Caramel Zenith",
      price: 13.99,
      origin: "Brazil",
      roast: "Medium-Dark Roast",
      description:
        "Low acidity with sweet, nutty flavors and hints of chocolate. Perfect for espresso blends.",
      image: "/photos/CoffeePhotos/CaramelZenith.png",
      fullDescription:
        "Caramel Zenith from Brazil offers exceptional value without compromising on quality. This medium-dark roast is characterized by its natural sweetness and low acidity, making it perfect for espresso-based drinks. The Brazilian terroir imparts a unique nutty character that pairs beautifully with milk.",
      tastingNotes: ["Caramel", "Peanut", "Chocolate", "Toffee"],
      brewMethods: ["Espresso", "Moka Pot", "French Press", "Drip"],
    },
    {
      id: 6,
      title: "Sahara Dusk",
      price: 18.99,
      origin: "Kenya",
      roast: "Light-Medium Roast",
      description:
        "Bright and wine-like with berry notes and complex acidity. A sophisticated and vibrant cup.",
      image: "/photos/CoffeePhotos/SaharaDusk.png",
      fullDescription:
        "Sahara Dusk is a premium offering from Kenya's renowned coffee regions. This light-medium roast preserves the distinctive character of Kenyan coffee: bright, complex acidity reminiscent of fine wine, and fruit-forward flavors. It's a coffee for the adventurous palate, offering a truly unique tasting experience.",
      tastingNotes: ["Blackcurrant", "Tomato", "Grapefruit", "Red Wine"],
      brewMethods: ["Pour Over", "Chemex", "Aeropress", "Siphon"],
    },
  ];

  useEffect(() => {
    const foundProduct = coffeeProducts.find(
      (p) => p.id === parseInt(productId)
    );
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [productId]);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        title: product.title,
        price: product.price,
        origin: product.origin,
        roast: product.roast,
        description: product.description,
        image: product.image,
        quantity,
      });

      alert(`Added ${quantity} x ${product.title} to cart!`);
      setQuantity(1);
    }
  };

  const handleBackToCatalog = () => {
    navigate("/catalog");
  };

  if (!product) {
    return (
      <section className="product-details">
        <div className="details-container">
          <p>Product not found</p>
          <button onClick={handleBackToCatalog} className="back-btn">
            Back to Catalog
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="product-details">
      <div className="details-container">
        <button onClick={handleBackToCatalog} className="back-btn">
          ← Back to Catalog
        </button>

        <div className="details-content">
          <div className="details-image-section">
            <div className="details-image-container">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.title}
                  className="details-image"
                />
              ) : (
                <div className="details-image-placeholder">
                  <span>Image Placeholder</span>
                </div>
              )}
            </div>
          </div>

          <div className="details-info-section">
            <h1>{product.title}</h1>
            <p className="details-price">${product.price.toFixed(2)}</p>

            <div className="details-meta">
              <div className="meta-item">
                <span className="meta-label">Origin:</span>
                <span className="meta-value">{product.origin}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Roast:</span>
                <span className="meta-value">{product.roast}</span>
              </div>
            </div>

            <div className="details-description">
              <h3>Description</h3>
              <p>{product.fullDescription || product.description}</p>
            </div>

            {product.tastingNotes && (
              <div className="tasting-notes">
                <h3>Tasting Notes</h3>
                <div className="notes-list">
                  {product.tastingNotes.map((note, index) => (
                    <span key={index} className="note-badge">
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {product.brewMethods && (
              <div className="brew-methods">
                <h3>Recommended Brew Methods</h3>
                <div className="methods-list">
                  {product.brewMethods.map((method, index) => (
                    <span key={index} className="method-badge">
                      {method}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="details-purchase">
              <div className="quantity-selector">
                <button className="quantity-btn" onClick={handleDecrement}>
                  -
                </button>
                <span className="quantity-display">{quantity}</span>
                <button className="quantity-btn" onClick={handleIncrement}>
                  +
                </button>
              </div>

              <div className="purchase-info">
                <p className="total-price">
                  Total: ${(product.price * quantity).toFixed(2)}
                </p>
                <button className="add-to-cart-btn" onClick={handleAddToCart}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoffeeProductDetails;
