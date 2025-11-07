import { useState, useEffect } from "react";
import axios from "axios";
import ProductTableRow from "./ProductTableRow";

const ProductsTable = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8500/api/";
      const URL = API_URL + "products";
      const response = await axios.get(URL);
      if (response.data && response.data.error) {
        console.error("API Error:", response.data.error);
        setProducts([]);
        return;
      }
      setProducts(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Products Table</h2>
      {products.length === 0 ? (
        <div>
          <p>No products found.</p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Manufacturer ID</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <ProductTableRow key={product.ProductID} product={product} fetchProducts={fetchProducts} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductsTable;

