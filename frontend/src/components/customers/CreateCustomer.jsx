import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateCustomer() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    PhoneNumber: "",
    Address: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCustomer = {
      FirstName: formData.FirstName,
      LastName: formData.LastName,
      Email: formData.Email,
      PhoneNumber: formData.PhoneNumber,
      Address: formData.Address,
    };

    try {
      const URL = import.meta.env.VITE_API_URL + "customers";
      const response = await axios.post(URL, newCustomer);
      if (response.status === 201) {
        navigate("/customers");
      } else {
        alert("Error creating customer");
      }
    } catch (error) {
      alert("Error creating customer");
      console.error("Error creating customer:", error);
    }
    resetFormFields();
  };

  const resetFormFields = () => {
    setFormData({
      FirstName: "",
      LastName: "",
      Email: "",
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
      <h2>Add Customer</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="FirstName">First Name</label>
        <input
          type="text"
          name="FirstName"
          value={formData.FirstName}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="LastName">Last Name</label>
        <input
          type="text"
          name="LastName"
          value={formData.LastName}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="Email">Email</label>
        <input
          type="email"
          name="Email"
          value={formData.Email}
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
        <button type="submit">Add Customer</button>
      </form>
    </>
  );
}

export default CreateCustomer;

