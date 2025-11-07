import { useState, useEffect } from "react";
import axios from "axios";
import CustomerTableRow from "./CustomerTableRow";

const CustomersTable = () => {
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8500/api/";
      const URL = API_URL + "customers";
      const response = await axios.get(URL);
      if (response.data && response.data.error) {
        console.error("API Error:", response.data.error);
        setCustomers([]);
        return;
      }
      setCustomers(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching customers:", error);
      setCustomers([]);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div>
      <h2>Customers Table</h2>
      {customers.length === 0 ? (
        <div>
          <p>No customers found.</p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <CustomerTableRow key={customer.CustomerID} customer={customer} fetchCustomers={fetchCustomers} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CustomersTable;

