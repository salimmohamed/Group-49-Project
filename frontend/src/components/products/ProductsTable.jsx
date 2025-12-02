import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DataTable } from "@/components/DataTable";

const ProductsTable = () => {
  // Mock data for Step 3 Draft demonstration
  const mockProducts = [
    { ProductID: 1, Name: 'Laptop Pro 15', Description: 'High-performance laptop with 16GB RAM', Price: 1299.99, Stock: 25, ManufacturerID: 1 },
    { ProductID: 2, Name: 'Wireless Mouse', Description: 'Ergonomic wireless mouse', Price: 29.99, Stock: 150, ManufacturerID: 2 },
    { ProductID: 3, Name: 'USB-C Cable', Description: 'Fast charging USB-C cable', Price: 19.99, Stock: 200, ManufacturerID: 3 },
    { ProductID: 4, Name: 'Keyboard Elite', Description: 'Mechanical keyboard with RGB lighting', Price: 89.99, Stock: 50, ManufacturerID: 1 }
  ];

  const navigate = useNavigate();
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
      setProducts(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts(mockProducts);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    navigate("/products/edit/" + product.ProductID, { state: { product } });
  };

  const handleDelete = async (product) => {
    if (!window.confirm(`Are you sure you want to delete ${product.Name}?`)) {
      return;
    }

    try {
      const URL = import.meta.env.VITE_API_URL + "products/" + product.ProductID;
      const response = await axios.delete(URL);
      if (response.status === 204) {
        alert("Product deleted successfully");
      }
    } catch (err) {
      alert(err.response?.data?.error || "Error deleting product");
      console.log(err);
    }
    fetchProducts();
  };

  const columns = [
    { key: 'ProductID', label: 'ID' },
    { key: 'Name', label: 'Name' },
    { key: 'Description', label: 'Description', render: (value) => value || '' },
    { key: 'Price', label: 'Price', render: (value) => `$${parseFloat(value).toFixed(2)}` },
    { key: 'Stock', label: 'Stock' },
    { key: 'ManufacturerID', label: 'Manufacturer ID', render: (value) => value || '' },
  ];

  return <DataTable columns={columns} data={products} onEdit={handleEdit} onDelete={handleDelete} />;
};

export default ProductsTable;
