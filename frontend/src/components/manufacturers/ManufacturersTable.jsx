import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DataTable } from "@/components/DataTable";

const ManufacturersTable = () => {
  // Mock data for Step 3 Draft demonstration
  const mockManufacturers = [
    { ManufacturerID: 1, Name: 'TechCorp Industries', ContactEmail: 'contact@techcorp.com', PhoneNumber: '555-0101', Address: '123 Tech Street, San Francisco, CA' },
    { ManufacturerID: 2, Name: 'Digital Solutions Inc', ContactEmail: 'info@digitalsolutions.com', PhoneNumber: '555-0202', Address: '456 Digital Ave, Seattle, WA' },
    { ManufacturerID: 3, Name: 'ElectroMax Systems', ContactEmail: 'sales@electromax.com', PhoneNumber: '555-0303', Address: '789 Electronics Blvd, Austin, TX' }
  ];

  const navigate = useNavigate();
  const [manufacturers, setManufacturers] = useState(mockManufacturers);

  const fetchManufacturers = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8500/api/";
      const URL = API_URL + "manufacturers";
      const response = await axios.get(URL);
      if (response.data && response.data.error) {
        console.error("API Error:", response.data.error);
        setManufacturers(mockManufacturers);
        return;
      }
      setManufacturers(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching manufacturers:", error);
      setManufacturers(mockManufacturers);
    }
  };

  useEffect(() => {
    fetchManufacturers();
  }, []);

  const handleEdit = (manufacturer) => {
    navigate("/manufacturers/edit/" + manufacturer.ManufacturerID, { state: { manufacturer } });
  };

  const handleDelete = async (manufacturer) => {
    if (!window.confirm(`Are you sure you want to delete ${manufacturer.Name}?`)) {
      return;
    }

    try {
      const URL = import.meta.env.VITE_API_URL + "manufacturers/" + manufacturer.ManufacturerID;
      const response = await axios.delete(URL);
      if (response.status === 204) {
        alert("Manufacturer deleted successfully");
      }
    } catch (err) {
      alert(err.response?.data?.error || "Error deleting manufacturer");
      console.log(err);
    }
    fetchManufacturers();
  };

  const columns = [
    { key: 'ManufacturerID', label: 'ID' },
    { key: 'Name', label: 'Name' },
    { key: 'ContactEmail', label: 'Contact Email', render: (value) => value || '' },
    { key: 'PhoneNumber', label: 'Phone Number', render: (value) => value || '' },
    { key: 'Address', label: 'Address', render: (value) => value || '' },
  ];

  return <DataTable columns={columns} data={manufacturers} onEdit={handleEdit} onDelete={handleDelete} />;
};

export default ManufacturersTable;

