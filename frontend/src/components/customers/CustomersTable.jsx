import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DataTable } from "@/components/DataTable";

const CustomersTable = () => {
  // Mock data for Step 3 Draft demonstration
  const mockCustomers = [
    { CustomerID: 1, FirstName: 'Alice', LastName: 'Williams', Email: 'alice.williams@email.com', PhoneNumber: '555-2001', Address: '100 Main St, Portland, OR' },
    { CustomerID: 2, FirstName: 'Bob', LastName: 'Davis', Email: 'bob.davis@email.com', PhoneNumber: '555-2002', Address: '200 Oak Ave, Portland, OR' },
    { CustomerID: 3, FirstName: 'Carol', LastName: 'Miller', Email: 'carol.miller@email.com', PhoneNumber: '555-2003', Address: '300 Pine Rd, Portland, OR' },
    { CustomerID: 4, FirstName: 'David', LastName: 'Wilson', Email: 'david.wilson@email.com', PhoneNumber: '555-2004', Address: '400 Elm St, Portland, OR' },
    { CustomerID: 5, FirstName: 'Emma', LastName: 'Garcia', Email: 'emma.garcia@email.com', PhoneNumber: '555-2005', Address: '500 Maple Ave, Portland, OR' }
  ];

  const navigate = useNavigate();
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

  const handleEdit = (customer) => {
    navigate("/customers/edit/" + customer.CustomerID, { state: { customer } });
  };

  const handleDelete = async (customer) => {
    if (!window.confirm(`Are you sure you want to delete ${customer.FirstName} ${customer.LastName}?`)) {
      return;
    }

    try {
      const URL = import.meta.env.VITE_API_URL + "customers/" + customer.CustomerID;
      const response = await axios.delete(URL);
      if (response.status === 204) {
        alert("Customer deleted successfully");
      }
    } catch (err) {
      alert(err.response?.data?.error || "Error deleting customer");
      console.log(err);
    }
    fetchCustomers();
  };

  const columns = [
    { key: 'CustomerID', label: 'ID' },
    { key: 'FirstName', label: 'First Name' },
    { key: 'LastName', label: 'Last Name' },
    { key: 'Email', label: 'Email', render: (value) => value || '' },
    { key: 'PhoneNumber', label: 'Phone Number', render: (value) => value || '' },
    { key: 'Address', label: 'Address', render: (value) => value || '' },
  ];

  return <DataTable columns={columns} data={customers} onEdit={handleEdit} onDelete={handleDelete} />;
};

export default CustomersTable;

