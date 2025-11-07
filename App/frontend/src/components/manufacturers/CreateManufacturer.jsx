import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateManufacturer() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Name: "",
    ContactEmail: "",
    PhoneNumber: "",
    Address: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newManufacturer = {
      Name: formData.Name,
      ContactEmail: formData.ContactEmail,
      PhoneNumber: formData.PhoneNumber,
      Address: formData.Address,
    };

    try {
      const URL = import.meta.env.VITE_API_URL + "manufacturers";
      const response = await axios.post(URL, newManufacturer);
      if (response.status === 201) {
        navigate("/manufacturers");
      } else {
        alert("Error creating manufacturer");
      }
    } catch (error) {
      alert("Error creating manufacturer");
      console.error("Error creating manufacturer:", error);
    }
    resetFormFields();
  };

  const resetFormFields = () => {
    setFormData({
      Name: "",
      ContactEmail: "",
      PhoneNumber: "",
      Address: "",
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
      <h2>Add Manufacturer</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="Name">Name</label>
        <input
          type="text"
          name="Name"
          value={formData.Name}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="ContactEmail">Contact Email</label>
        <input
          type="email"
          name="ContactEmail"
          value={formData.ContactEmail}
          onChange={handleInputChange}
        />
        <label htmlFor="PhoneNumber">Phone Number</label>
        <input
          type="text"
          name="PhoneNumber"
          value={formData.PhoneNumber}
          onChange={handleInputChange}
        />
        <label htmlFor="Address">Address</label>
        <input
          type="text"
          name="Address"
          value={formData.Address}
          onChange={handleInputChange}
        />
        <button type="submit">Add Manufacturer</button>
      </form>
    </>
  );
}

export default CreateManufacturer;

