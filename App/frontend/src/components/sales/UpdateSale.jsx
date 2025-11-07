import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const UpdateSale = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const prevSale = location.state.sale;
  const [customers, setCustomers] = useState([]);
  const [salesAssociates, setSalesAssociates] = useState([]);

  const [formData, setFormData] = useState({
    CustomerID: prevSale.CustomerID || "",
    AssociateID: prevSale.AssociateID || "",
    OrderDate: prevSale.OrderDate || "",
    Status: prevSale.Status || "Pending",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customersURL = import.meta.env.VITE_API_URL + "customers";
        const associatesURL = import.meta.env.VITE_API_URL + "salesAssociates";
        const [customersRes, associatesRes] = await Promise.all([
          axios.get(customersURL),
          axios.get(associatesURL),
        ]);
        setCustomers(customersRes.data);
        setSalesAssociates(associatesRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
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
      const URL = import.meta.env.VITE_API_URL + "sales/" + id;
      const response = await axios.put(URL, formData);
      if (response.status !== 200) {
        alert("Error updating sale");
      } else {
        alert(response.data.message);
        navigate("/sales");
      }
    } catch (err) {
      console.log("Error updating sale:", err);
      alert("Error updating sale");
    }
  };

  return (
    <div>
      <h2>Update Sale</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Customer:</label>
          <select
            name="CustomerID"
            value={formData.CustomerID}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Customer</option>
            {customers.map((customer) => (
              <option key={customer.CustomerID} value={customer.CustomerID}>
                {customer.FirstName} {customer.LastName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Sales Associate:</label>
          <select
            name="AssociateID"
            value={formData.AssociateID}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Associate</option>
            {salesAssociates.map((associate) => (
              <option key={associate.AssociateID} value={associate.AssociateID}>
                {associate.FirstName} {associate.LastName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Order Date:</label>
          <input
            type="date"
            name="OrderDate"
            onChange={handleInputChange}
            required
            defaultValue={prevSale.OrderDate}
          />
        </div>
        <div>
          <label>Status:</label>
          <input
            type="text"
            name="Status"
            onChange={handleInputChange}
            defaultValue={prevSale.Status}
          />
        </div>
        <button type="button" onClick={() => navigate("/sales")}>
          Cancel
        </button>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateSale;

