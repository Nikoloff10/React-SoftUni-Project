import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import CoffeeCatalog from "./components/CoffeeCatalog";
import ForumPostsCatalog from "./components/ForumPostsCatalog";
import ForumPostDetails from "./components/ForumPostDetails";
import Footer from "./components/Footer";
import Register from "./components/Register";
import Login from "./components/Login";
import UserDetails from "./components/UserDetails";

function App() {
  return (
    <div className="app">
      <Header />
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<CoffeeCatalog />} />
        <Route path="/forum" element={<ForumPostsCatalog />} />
        <Route path="/forum/:postId" element={<ForumPostDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<UserDetails />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
