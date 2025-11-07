import { useState, useEffect } from "react";
import axios from "axios";
import CustomerTableRow from "./CustomerTableRow";

const CustomersTable = () => {
  // Mock data for Step 3 Draft demonstration
  const mockCustomers = [
    { CustomerID: 1, FirstName: 'Alice', LastName: 'Williams', Email: 'alice.williams@email.com', PhoneNumber: '555-2001', Address: '100 Main St, Portland, OR' },
    { CustomerID: 2, FirstName: 'Bob', LastName: 'Davis', Email: 'bob.davis@email.com', PhoneNumber: '555-2002', Address: '200 Oak Ave, Portland, OR' },
    { CustomerID: 3, FirstName: 'Carol', LastName: 'Miller', Email: 'carol.miller@email.com', PhoneNumber: '555-2003', Address: '300 Pine Rd, Portland, OR' },
    { CustomerID: 4, FirstName: 'David', LastName: 'Wilson', Email: 'david.wilson@email.com', PhoneNumber: '555-2004', Address: '400 Elm St, Portland, OR' },
    { CustomerID: 5, FirstName: 'Emma', LastName: 'Garcia', Email: 'emma.garcia@email.com', PhoneNumber: '555-2005', Address: '500 Maple Ave, Portland, OR' }
  ];

  const [customers, setCustomers] = useState(mockCustomers);

  const fetchCustomers = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8500/api/";
      const URL = API_URL + "customers";
      const response = await axios.get(URL);
      if (response.data && response.data.error) {
        console.error("API Error:", response.data.error);
        setCustomers(mockCustomers); // Use mock data on error
        return;
      }
      setCustomers(Array.isArray(response.data) && response.data.length > 0 ? response.data : mockCustomers);
    } catch (error) {
      console.error("Error fetching customers:", error);
      setCustomers(mockCustomers); // Use mock data on error
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

