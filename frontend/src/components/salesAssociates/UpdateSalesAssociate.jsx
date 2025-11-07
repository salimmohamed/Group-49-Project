import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const UpdateSalesAssociate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const prevAssociate = location.state.associate;

  const [formData, setFormData] = useState({
    FirstName: prevAssociate.FirstName || "",
    LastName: prevAssociate.LastName || "",
    Email: prevAssociate.Email || "",
    PhoneNumber: prevAssociate.PhoneNumber || "",
    Type: prevAssociate.Type || "",
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
      const URL = import.meta.env.VITE_API_URL + "salesAssociates/" + id;
      const response = await axios.put(URL, formData);
      if (response.status !== 200) {
        alert("Error updating sales associate");
      } else {
        alert(response.data.message);
        navigate("/salesAssociates");
      }
    } catch (err) {
      console.log("Error updating sales associate:", err);
      alert("Error updating sales associate");
    }
  };

  return (
    <div>
      <h2>Update Sales Associate</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="FirstName"
            onChange={handleInputChange}
            required
            defaultValue={prevAssociate.FirstName}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="LastName"
            onChange={handleInputChange}
            required
            defaultValue={prevAssociate.LastName}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="Email"
            onChange={handleInputChange}
            defaultValue={prevAssociate.Email}
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="PhoneNumber"
            onChange={handleInputChange}
            defaultValue={prevAssociate.PhoneNumber}
          />
        </div>
        <div>
          <label>Type:</label>
          <input
            type="text"
            name="Type"
            onChange={handleInputChange}
            defaultValue={prevAssociate.Type}
          />
        </div>
        <button type="button" onClick={() => navigate("/salesAssociates")}>
          Cancel
        </button>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateSalesAssociate;

