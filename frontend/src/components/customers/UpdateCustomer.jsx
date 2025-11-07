import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const UpdateCustomer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const prevCustomer = location.state.customer;

  const [formData, setFormData] = useState({
    FirstName: prevCustomer.FirstName || "",
    LastName: prevCustomer.LastName || "",
    Email: prevCustomer.Email || "",
    PhoneNumber: prevCustomer.PhoneNumber || "",
    Address: prevCustomer.Address || "",
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
      const URL = import.meta.env.VITE_API_URL + "customers/" + id;
      const response = await axios.put(URL, formData);
      if (response.status !== 200) {
        alert("Error updating customer");
      } else {
        alert(response.data.message);
        navigate("/customers");
      }
    } catch (err) {
      console.log("Error updating customer:", err);
      alert("Error updating customer");
    }
  };

  return (
    <div>
      <h2>Update Customer</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="FirstName"
            onChange={handleInputChange}
            required
            defaultValue={prevCustomer.FirstName}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="LastName"
            onChange={handleInputChange}
            required
            defaultValue={prevCustomer.LastName}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="Email"
            onChange={handleInputChange}
            defaultValue={prevCustomer.Email}
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="PhoneNumber"
            onChange={handleInputChange}
            defaultValue={prevCustomer.PhoneNumber}
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="Address"
            onChange={handleInputChange}
            defaultValue={prevCustomer.Address}
          />
        </div>
        <button type="button" onClick={() => navigate("/customers")}>
          Cancel
        </button>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateCustomer;

