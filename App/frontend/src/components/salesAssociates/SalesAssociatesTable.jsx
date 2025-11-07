import { useState, useEffect } from "react";
import axios from "axios";
import SalesAssociateTableRow from "./SalesAssociateTableRow";

const SalesAssociatesTable = () => {
  const [salesAssociates, setSalesAssociates] = useState([]);

  const fetchSalesAssociates = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8500/api/";
      const URL = API_URL + "salesAssociates";
      const response = await axios.get(URL);
      if (response.data && response.data.error) {
        console.error("API Error:", response.data.error);
        setSalesAssociates([]);
        return;
      }
      setSalesAssociates(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching sales associates:", error);
      setSalesAssociates([]);
    }
  };

  useEffect(() => {
    fetchSalesAssociates();
  }, []);

  return (
    <div>
      <h2>Sales Associates Table</h2>
      {salesAssociates.length === 0 ? (
        <div>
          <p>No sales associates found.</p>
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
              <th>Type</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {salesAssociates.map((associate) => (
              <SalesAssociateTableRow key={associate.AssociateID} associate={associate} fetchSalesAssociates={fetchSalesAssociates} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SalesAssociatesTable;

