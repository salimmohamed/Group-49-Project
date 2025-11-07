import { useState, useEffect } from "react";
import axios from "axios";
import ProductTableRow from "./ProductTableRow";

const ProductsTable = () => {
  // Mock data for Step 3 Draft demonstration
  const mockProducts = [
    { ProductID: 1, Name: 'Laptop Pro 15', Description: 'High-performance laptop with 16GB RAM', Price: 1299.99, Stock: 25, ManufacturerID: 1 },
    { ProductID: 2, Name: 'Wireless Mouse', Description: 'Ergonomic wireless mouse', Price: 29.99, Stock: 150, ManufacturerID: 2 },
    { ProductID: 3, Name: 'USB-C Cable', Description: 'Fast charging USB-C cable', Price: 19.99, Stock: 200, ManufacturerID: 3 },
    { ProductID: 4, Name: 'Keyboard Elite', Description: 'Mechanical keyboard with RGB lighting', Price: 89.99, Stock: 50, ManufacturerID: 1 }
  ];

  const [products, setProducts] = useState(mockProducts);

  const fetchProducts = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8500/api/";
      const URL = API_URL + "products";
      const response = await axios.get(URL);
      if (response.data && response.data.error) {
        console.error("API Error:", response.data.error);
        setProducts(mockProducts);
        return;
      }
      setProducts(Array.isArray(response.data) && response.data.length > 0 ? response.data : mockProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts(mockProducts);
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

