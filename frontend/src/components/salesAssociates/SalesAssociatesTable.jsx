import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DataTable } from "@/components/DataTable";

const SalesAssociatesTable = () => {
  // Mock data for Step 3 Draft demonstration
  const mockSalesAssociates = [
    { AssociateID: 1, FirstName: 'John', LastName: 'Smith', Email: 'john.smith@techrus.com', PhoneNumber: '555-1001', Type: 'Full-time' },
    { AssociateID: 2, FirstName: 'Sarah', LastName: 'Johnson', Email: 'sarah.johnson@techrus.com', PhoneNumber: '555-1002', Type: 'Part-time' },
    { AssociateID: 3, FirstName: 'Michael', LastName: 'Brown', Email: 'michael.brown@techrus.com', PhoneNumber: '555-1003', Type: 'Full-time' }
  ];

  const navigate = useNavigate();
  const [salesAssociates, setSalesAssociates] = useState(mockSalesAssociates);

  const fetchSalesAssociates = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8500/api/";
      const URL = API_URL + "salesAssociates";
      const response = await axios.get(URL);
      if (response.data && response.data.error) {
        console.error("API Error:", response.data.error);
        setSalesAssociates(mockSalesAssociates);
        return;
      }
      setSalesAssociates(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching sales associates:", error);
      setSalesAssociates(mockSalesAssociates);
    }
  };

  useEffect(() => {
    fetchSalesAssociates();
  }, []);

  const handleEdit = (associate) => {
    navigate("/salesAssociates/edit/" + associate.AssociateID, { state: { associate } });
  };

  const handleDelete = async (associate) => {
    if (!window.confirm(`Are you sure you want to delete ${associate.FirstName} ${associate.LastName}?`)) {
      return;
    }

    try {
      const URL = import.meta.env.VITE_API_URL + "salesAssociates/" + associate.AssociateID;
      const response = await axios.delete(URL);
      if (response.status === 204) {
        alert("Sales associate deleted successfully");
      }
    } catch (err) {
      alert(err.response?.data?.error || "Error deleting sales associate");
      console.log(err);
    }
    fetchSalesAssociates();
  };

  const columns = [
    { key: 'AssociateID', label: 'ID' },
    { key: 'FirstName', label: 'First Name' },
    { key: 'LastName', label: 'Last Name' },
    { key: 'Email', label: 'Email', render: (value) => value || '' },
    { key: 'PhoneNumber', label: 'Phone Number', render: (value) => value || '' },
    { key: 'Type', label: 'Type', render: (value) => value || '' },
  ];

  return <DataTable columns={columns} data={salesAssociates} onEdit={handleEdit} onDelete={handleDelete} />;
};

export default SalesAssociatesTable;

