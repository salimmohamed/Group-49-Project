import { Routes, Route, Link } from "react-router-dom";
import CreateProduct from "../components/products/CreateProduct";
import ProductsTable from "../components/products/ProductsTable";
import UpdateProduct from "../components/products/UpdateProduct";

function ProductsPage() {
  return (
    <div>
      <h1>Products</h1>
      <nav>
        <ul>
          <li>
            <Link to="/products">View All</Link>
          </li>
          <li>
            <Link to="/products/add">Add Product</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<ProductsTable />} />
        <Route path="/add" element={<CreateProduct />} />
        <Route path="/edit/:id" element={<UpdateProduct />} />
      </Routes>
    </div>
  );
}

export default ProductsPage;

