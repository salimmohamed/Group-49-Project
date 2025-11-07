import { useState, useEffect } from "react";
import axios from "axios";
import ManufacturerTableRow from "./ManufacturerTableRow";

const ManufacturersTable = () => {
  // Mock data for Step 3 Draft demonstration
  const mockManufacturers = [
    { ManufacturerID: 1, Name: 'TechCorp Industries', ContactEmail: 'contact@techcorp.com', PhoneNumber: '555-0101', Address: '123 Tech Street, San Francisco, CA' },
    { ManufacturerID: 2, Name: 'Digital Solutions Inc', ContactEmail: 'info@digitalsolutions.com', PhoneNumber: '555-0202', Address: '456 Digital Ave, Seattle, WA' },
    { ManufacturerID: 3, Name: 'ElectroMax Systems', ContactEmail: 'sales@electromax.com', PhoneNumber: '555-0303', Address: '789 Electronics Blvd, Austin, TX' }
  ];

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
      setManufacturers(Array.isArray(response.data) && response.data.length > 0 ? response.data : mockManufacturers);
    } catch (error) {
      console.error("Error fetching manufacturers:", error);
      setManufacturers(mockManufacturers);
    }
  };

  useEffect(() => {
    fetchManufacturers();
  }, []);

  return (
    <div>
      <h2>Manufacturers Table</h2>
      {manufacturers.length === 0 ? (
        <div>
          <p>No manufacturers found.</p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Contact Email</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {manufacturers.map((manufacturer) => (
              <ManufacturerTableRow key={manufacturer.ManufacturerID} manufacturer={manufacturer} fetchManufacturers={fetchManufacturers} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManufacturersTable;

