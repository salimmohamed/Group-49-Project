import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductTableRow = ({ product, fetchProducts }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/products/edit/" + product.ProductID, { state: { product } });
  };

  const deleteRow = async () => {
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

  return (
    <tr key={product.ProductID}>
      <td>{product.ProductID}</td>
      <td>{product.Name}</td>
      <td>{product.Description || ""}</td>
      <td>${product.Price}</td>
      <td>{product.Stock}</td>
      <td>{product.ManufacturerID || ""}</td>
      <td>
        <button onClick={handleEdit}>Edit</button>
      </td>
      <td>
        <button onClick={deleteRow}>Delete</button>
      </td>
    </tr>
  );
};

export default ProductTableRow;

