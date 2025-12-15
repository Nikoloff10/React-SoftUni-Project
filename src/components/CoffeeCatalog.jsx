import CoffeeProduct from "./CoffeeProduct";
import "../styles/CoffeeCatalog.css";

const CoffeeCatalog = () => {
  const coffeeProducts = [
    {
      id: 1,
      title: "Starlight Elixir",
      price: 16.99,
      origin: "Ethiopia",
      roast: "Light Roast",
      description:
        "Floral and fruity with notes of blueberry and jasmine. A bright, clean cup perfect for pour-over.",
      image: "photos/CoffeePhotos/StarLightElixir.png",
    },
    {
      id: 2,
      title: "Opal Estate Select",
      price: 14.99,
      origin: "Colombia",
      roast: "Medium Roast",
      description:
        "Smooth and balanced with caramel sweetness and nutty undertones. A classic everyday coffee.",
      image: "photos/CoffeePhotos/OpalEstateSelect.png",
    },
    {
      id: 3,
      title: "Grand Cru Nocturne",
      price: 15.99,
      origin: "Indonesia",
      roast: "Dark Roast",
      description:
        "Full-bodied with earthy, herbal notes and low acidity. Rich and bold with a syrupy mouthfeel.",
      image: "photos/CoffeePhotos/GrandCruNocturne.png",
    },
    {
      id: 4,
      title: "Velvet Crown Blend",
      price: 17.99,
      origin: "Costa Rica",
      roast: "Medium Roast",
      description:
        "Crisp and clean with citrus notes and chocolate finish. Well-balanced acidity and sweetness.",
      image: "photos/CoffeePhotos/VelvetCrownBlend.png",
    },
    {
      id: 5,
      title: "Caramel Zenith",
      price: 13.99,
      origin: "Brazil",
      roast: "Medium-Dark Roast",
      description:
        "Low acidity with sweet, nutty flavors and hints of chocolate. Perfect for espresso blends.",
      image: "photos/CoffeePhotos/CaramelZenith.png",
    },
    {
      id: 6,
      title: "Sahara Dusk",
      price: 18.99,
      origin: "Kenya",
      roast: "Light-Medium Roast",
      description:
        "Bright and wine-like with berry notes and complex acidity. A sophisticated and vibrant cup.",
      image: "photos/CoffeePhotos/SaharaDusk.png",
    },
  ];

  return (
    <section className="coffee-catalog">
      <div className="catalog-content">
        <h2>Our Coffee Collection</h2>
        <div className="products-grid">
          {coffeeProducts.map((coffee) => (
            <CoffeeProduct
              key={coffee.id}
              id={coffee.id}
              title={coffee.title}
              price={coffee.price}
              origin={coffee.origin}
              roast={coffee.roast}
              description={coffee.description}
              image={coffee.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoffeeCatalog;
