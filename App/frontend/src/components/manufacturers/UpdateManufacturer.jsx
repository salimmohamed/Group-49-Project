import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const UpdateManufacturer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const prevManufacturer = location.state.manufacturer;

  const [formData, setFormData] = useState({
    Name: prevManufacturer.Name || "",
    ContactEmail: prevManufacturer.ContactEmail || "",
    PhoneNumber: prevManufacturer.PhoneNumber || "",
    Address: prevManufacturer.Address || "",
  });

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
      const URL = import.meta.env.VITE_API_URL + "manufacturers/" + id;
      const response = await axios.put(URL, formData);
      if (response.status !== 200) {
        alert("Error updating manufacturer");
      } else {
        alert(response.data.message);
        navigate("/manufacturers");
      }
    } catch (err) {
      console.log("Error updating manufacturer:", err);
      alert("Error updating manufacturer");
    }
  };

  return (
    <div>
      <h2>Update Manufacturer</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="Name"
            onChange={handleInputChange}
            required
            defaultValue={prevManufacturer.Name}
          />
        </div>
        <div>
          <label>Contact Email:</label>
          <input
            type="email"
            name="ContactEmail"
            onChange={handleInputChange}
            defaultValue={prevManufacturer.ContactEmail}
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="PhoneNumber"
            onChange={handleInputChange}
            defaultValue={prevManufacturer.PhoneNumber}
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="Address"
            onChange={handleInputChange}
            defaultValue={prevManufacturer.Address}
          />
        </div>
        <button type="button" onClick={() => navigate("/manufacturers")}>
          Cancel
        </button>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateManufacturer;

