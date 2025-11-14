import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CustomersPage from "./pages/CustomersPage";
import ManufacturersPage from "./pages/ManufacturersPage";
import ProductsPage from "./pages/ProductsPage";
import SalesAssociatesPage from "./pages/SalesAssociatesPage";
import SalesPage from "./pages/SalesPage";
import SalesDetailsPage from "./pages/SalesDetailsPage";
import { Navigation } from "./components/Navigation";

function App() {
  return (
    <>
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/customers/*" element={<CustomersPage />} />
          <Route path="/manufacturers/*" element={<ManufacturersPage />} />
          <Route path="/products/*" element={<ProductsPage />} />
          <Route path="/salesAssociates/*" element={<SalesAssociatesPage />} />
          <Route path="/sales/*" element={<SalesPage />} />
          <Route path="/salesDetails/*" element={<SalesDetailsPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
