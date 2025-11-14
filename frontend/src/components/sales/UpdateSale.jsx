import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const UpdateSale = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const prevSale = location.state?.sale || {};
  const [customers, setCustomers] = useState([]);
  const [salesAssociates, setSalesAssociates] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    CustomerID: prevSale.CustomerID || "",
    AssociateID: prevSale.AssociateID || "",
    OrderDate: prevSale.OrderDate || "",
    Status: prevSale.Status || "Pending",
  });

  useEffect(() => {
    // Redirect if no sale state was passed
    if (!location.state || !location.state.sale) {
      navigate("/sales");
      return;
    }

    const fetchData = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8500/api/";
        const customersURL = API_URL + "customers";
        const associatesURL = API_URL + "salesAssociates";
        const [customersRes, associatesRes] = await Promise.all([
          axios.get(customersURL),
          axios.get(associatesURL),
        ]);
        setCustomers(customersRes.data);
        setSalesAssociates(associatesRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };
    fetchData();
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

  if (loading) {
    return <div>Loading...</div>;
  }

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
            value={formData.OrderDate}
          />
        </div>
        <div>
          <label>Status:</label>
          <input
            type="text"
            name="Status"
            onChange={handleInputChange}
            value={formData.Status}
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

