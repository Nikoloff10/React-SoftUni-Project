import CoffeeProduct from "./CoffeeProduct";
import "../styles/CoffeeCatalog.css";

const CoffeeCatalog = () => {
  return (
    <section className="coffee-catalog">
      <div className="catalog-content">
        <h2>Our Coffee Collection</h2>
        <div className="products-grid">
          <CoffeeProduct />
          <CoffeeProduct />
          <CoffeeProduct />
          <CoffeeProduct />
          <CoffeeProduct />
          <CoffeeProduct />
        </div>
      </div>
    </section>
  );
};

export default CoffeeCatalog;
