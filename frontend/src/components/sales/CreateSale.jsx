import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateSale() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [salesAssociates, setSalesAssociates] = useState([]);

  const [formData, setFormData] = useState({
    CustomerID: "",
    AssociateID: "",
    OrderDate: "",
    Status: "Pending",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newSale = {
      CustomerID: formData.CustomerID,
      AssociateID: formData.AssociateID,
      OrderDate: formData.OrderDate,
      Status: formData.Status,
    };

    try {
      const URL = import.meta.env.VITE_API_URL + "sales";
      const response = await axios.post(URL, newSale);
      if (response.status === 201) {
        navigate("/sales");
      } else {
        alert("Error creating sale");
      }
    } catch (error) {
      alert("Error creating sale");
      console.error("Error creating sale:", error);
    }
    resetFormFields();
  };

  const resetFormFields = () => {
    setFormData({
      CustomerID: "",
      AssociateID: "",
      OrderDate: "",
      Status: "Pending",
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
      <h2>Add Sale</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="CustomerID">Customer</label>
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
        <label htmlFor="AssociateID">Sales Associate</label>
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
        <label htmlFor="OrderDate">Order Date</label>
        <input
          type="date"
          name="OrderDate"
          value={formData.OrderDate}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="Status">Status</label>
        <input
          type="text"
          name="Status"
          value={formData.Status}
          onChange={handleInputChange}
        />
        <button type="submit">Add Sale</button>
      </form>
    </>
  );
}

export default CreateSale;

