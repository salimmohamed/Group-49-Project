import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateSalesAssociate() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    PhoneNumber: "",
    Type: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newAssociate = {
      FirstName: formData.FirstName,
      LastName: formData.LastName,
      Email: formData.Email,
      PhoneNumber: formData.PhoneNumber,
      Type: formData.Type,
    };

    try {
      const URL = import.meta.env.VITE_API_URL + "salesAssociates";
      const response = await axios.post(URL, newAssociate);
      if (response.status === 201) {
        navigate("/salesAssociates");
      } else {
        alert("Error creating sales associate");
      }
    } catch (error) {
      alert("Error creating sales associate");
      console.error("Error creating sales associate:", error);
    }
    resetFormFields();
  };

  const resetFormFields = () => {
    setFormData({
      FirstName: "",
      LastName: "",
      Email: "",
      PhoneNumber: "",
      Type: "",
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
      <h2>Add Sales Associate</h2>
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
        <label htmlFor="Type">Type</label>
        <input
          type="text"
          name="Type"
          value={formData.Type}
          onChange={handleInputChange}
        />
        <button type="submit">Add Sales Associate</button>
      </form>
    </>
  );
}

export default CreateSalesAssociate;

