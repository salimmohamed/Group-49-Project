import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const prevProduct = location.state?.product || {};
  const [manufacturers, setManufacturers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    Name: prevProduct.Name || "",
    Description: prevProduct.Description || "",
    Price: prevProduct.Price || "",
    Stock: prevProduct.Stock || "",
    ManufacturerID: prevProduct.ManufacturerID || "",
  });

  useEffect(() => {
    // Redirect if no product state was passed
    if (!location.state || !location.state.product) {
      navigate("/products");
      return;
    }

    const fetchManufacturers = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8500/api/";
        const URL = API_URL + "manufacturers";
        const response = await axios.get(URL);
        setManufacturers(response.data);
      } catch (error) {
        console.error("Error fetching manufacturers:", error);
      }
      setLoading(false);
    };
    fetchManufacturers();
  }, [location.state, navigate]);

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

  if (loading) {
    return <div>Loading...</div>;
  }

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
            value={formData.Name}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="Description"
            onChange={handleInputChange}
            value={formData.Description}
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
            value={formData.Price}
          />
        </div>
        <div>
          <label>Stock:</label>
          <input
            type="number"
            name="Stock"
            onChange={handleInputChange}
            value={formData.Stock}
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

