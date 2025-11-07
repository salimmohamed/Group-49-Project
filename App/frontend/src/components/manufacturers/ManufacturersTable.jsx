import { useState, useEffect } from "react";
import axios from "axios";
import ManufacturerTableRow from "./ManufacturerTableRow";

const ManufacturersTable = () => {
  const [manufacturers, setManufacturers] = useState([]);

  const fetchManufacturers = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8500/api/";
      const URL = API_URL + "manufacturers";
      const response = await axios.get(URL);
      if (response.data && response.data.error) {
        console.error("API Error:", response.data.error);
        setManufacturers([]);
        return;
      }
      setManufacturers(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching manufacturers:", error);
      setManufacturers([]);
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

