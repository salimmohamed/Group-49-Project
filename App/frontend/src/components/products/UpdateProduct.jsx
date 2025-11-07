import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const prevProduct = location.state.product;
  const [manufacturers, setManufacturers] = useState([]);

  const [formData, setFormData] = useState({
    Name: prevProduct.Name || "",
    Description: prevProduct.Description || "",
    Price: prevProduct.Price || "",
    Stock: prevProduct.Stock || "",
    ManufacturerID: prevProduct.ManufacturerID || "",
  });

  useEffect(() => {
    const fetchManufacturers = async () => {
      try {
        const URL = import.meta.env.VITE_API_URL + "manufacturers";
        const response = await axios.get(URL);
        setManufacturers(response.data);
      } catch (error) {
        console.error("Error fetching manufacturers:", error);
      }
    };
    fetchManufacturers();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const URL = import.meta.env.VITE_API_URL + "products/" + id;
      const response = await axios.put(URL, formData);
      if (response.status !== 200) {
        alert("Error updating product");
      } else {
        alert(response.data.message);
        navigate("/products");
      }
    } catch (err) {
      console.log("Error updating product:", err);
      alert("Error updating product");
    }
  };

  return (
    <div>
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="Name"
            onChange={handleInputChange}
            required
            defaultValue={prevProduct.Name}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="Description"
            onChange={handleInputChange}
            defaultValue={prevProduct.Description}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            step="0.01"
            name="Price"
            onChange={handleInputChange}
            required
            defaultValue={prevProduct.Price}
          />
        </div>
        <div>
          <label>Stock:</label>
          <input
            type="number"
            name="Stock"
            onChange={handleInputChange}
            defaultValue={prevProduct.Stock}
          />
        </div>
        <div>
          <label>Manufacturer:</label>
          <select
            name="ManufacturerID"
            value={formData.ManufacturerID}
            onChange={handleInputChange}
          >
            <option value="">None</option>
            {manufacturers.map((manufacturer) => (
              <option key={manufacturer.ManufacturerID} value={manufacturer.ManufacturerID}>
                {manufacturer.Name}
              </option>
            ))}
          </select>
        </div>
        <button type="button" onClick={() => navigate("/products")}>
          Cancel
        </button>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateProduct;

