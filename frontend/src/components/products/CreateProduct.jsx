import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateProduct() {
  const navigate = useNavigate();
  const [manufacturers, setManufacturers] = useState([]);

  const [formData, setFormData] = useState({
    Name: "",
    Description: "",
    Price: "",
    Stock: "",
    ManufacturerID: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = {
      Name: formData.Name,
      Description: formData.Description,
      Price: formData.Price,
      Stock: formData.Stock,
      ManufacturerID: formData.ManufacturerID,
    };

    try {
      const URL = import.meta.env.VITE_API_URL + "products";
      const response = await axios.post(URL, newProduct);
      if (response.status === 201) {
        navigate("/products");
      } else {
        alert("Error creating product");
      }
    } catch (error) {
      alert("Error creating product");
      console.error("Error creating product:", error);
    }
    resetFormFields();
  };

  const resetFormFields = () => {
    setFormData({
      Name: "",
      Description: "",
      Price: "",
      Stock: "",
      ManufacturerID: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="Name">Name</label>
        <input
          type="text"
          name="Name"
          value={formData.Name}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="Description">Description</label>
        <textarea
          name="Description"
          value={formData.Description}
          onChange={handleInputChange}
        />
        <label htmlFor="Price">Price</label>
        <input
          type="number"
          step="0.01"
          name="Price"
          value={formData.Price}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="Stock">Stock</label>
        <input
          type="number"
          name="Stock"
          value={formData.Stock}
          onChange={handleInputChange}
        />
        <label htmlFor="ManufacturerID">Manufacturer</label>
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
        <button type="submit">Add Product</button>
      </form>
    </>
  );
}

export default CreateProduct;

