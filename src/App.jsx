import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import CoffeeCatalog from "./components/CoffeeCatalog";
import CoffeeProductDetails from "./components/CoffeeProductDetails";
import ForumPostsCatalog from "./components/ForumPostsCatalog";
import ForumPostDetails from "./components/ForumPostDetails";
import Footer from "./components/Footer";
import Register from "./components/Register";
import Login from "./components/Login";
import UserDetails from "./components/UserDetails";
import ShoppingCart from "./components/ShoppingCart";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";
import About from "./components/About";

function App() {
  return (
    <div className="app">
      <Header />
      <NavBar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/catalog" element={<CoffeeCatalog />} />
          <Route
            path="/product/:productId"
            element={<CoffeeProductDetails />}
          />
          <Route path="/forum" element={<ForumPostsCatalog />} />
          <Route path="/forum/:postId" element={<ForumPostDetails />} />
          <Route
            path="/register"
            element={
              <GuestRoute>
                <Register />
              </GuestRoute>
            }
          />
          <Route
            path="/login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <ShoppingCart />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
