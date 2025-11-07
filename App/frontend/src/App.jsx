import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import CustomersPage from "./pages/CustomersPage";
import ManufacturersPage from "./pages/ManufacturersPage";
import ProductsPage from "./pages/ProductsPage";
import SalesAssociatesPage from "./pages/SalesAssociatesPage";
import SalesPage from "./pages/SalesPage";
import SalesDetailsPage from "./pages/SalesDetailsPage";
import Navbar from "./components/navbar/NavBar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/customers" replace />} />
        <Route path="/customers/*" element={<CustomersPage />} />
        <Route path="/manufacturers/*" element={<ManufacturersPage />} />
        <Route path="/products/*" element={<ProductsPage />} />
        <Route path="/salesAssociates/*" element={<SalesAssociatesPage />} />
        <Route path="/sales/*" element={<SalesPage />} />
        <Route path="/salesDetails/*" element={<SalesDetailsPage />} />
      </Routes>
    </>
  );
}

export default App;
