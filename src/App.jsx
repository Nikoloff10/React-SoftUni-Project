import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import CoffeeCatalog from "./components/CoffeeCatalog";
import ForumPostsCatalog from "./components/ForumPostsCatalog";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="app">
      <Header />
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<CoffeeCatalog />} />
        <Route path="/forum" element={<ForumPostsCatalog />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
