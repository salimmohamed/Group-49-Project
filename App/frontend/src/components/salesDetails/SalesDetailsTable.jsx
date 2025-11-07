import { useState, useEffect } from "react";
import axios from "axios";
import SalesDetailTableRow from "./SalesDetailTableRow";

const SalesDetailsTable = () => {
  const [salesDetails, setSalesDetails] = useState([]);

  const fetchSalesDetails = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8500/api/";
      const URL = API_URL + "salesDetails";
      const response = await axios.get(URL);
      if (response.data && response.data.error) {
        console.error("API Error:", response.data.error);
        setSalesDetails([]);
        return;
      }
      setSalesDetails(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching sales details:", error);
      setSalesDetails([]);
    }
  };

  useEffect(() => {
    fetchSalesDetails();
  }, []);

  return (
    <div>
      <h2>Sales Details Table</h2>
      {salesDetails.length === 0 ? (
        <div>
          <p>No sales details found.</p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Sale ID</th>
              <th>Product ID</th>
              <th>Quantity</th>
              <th>Item Price</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {salesDetails.map((detail) => (
              <SalesDetailTableRow key={detail.SalesDetailID} detail={detail} fetchSalesDetails={fetchSalesDetails} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SalesDetailsTable;

