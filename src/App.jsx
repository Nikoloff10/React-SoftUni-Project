import Header from "./components/Header";
import NavBar from "./components/NavBar";
import HistoryOfCompany from "./components/HistoryOfCompany";
import Contacts from "./components/Contacts";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="app">
      <Header />
      <NavBar />

      <div className="main-content">
        <HistoryOfCompany />

        <Contacts />
      </div>

      <Footer />
    </div>
  );
}

export default App;
