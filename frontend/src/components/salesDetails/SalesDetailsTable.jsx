import { useState, useEffect } from "react";
import axios from "axios";
import SalesDetailTableRow from "./SalesDetailTableRow";

const SalesDetailsTable = () => {
  // Mock data for Step 3 Draft demonstration
  const mockSalesDetails = [
    { SalesDetailID: 1, SaleID: 1, ProductID: 1, Quantity: 1, ItemPrice: 1299.99 },
    { SalesDetailID: 2, SaleID: 1, ProductID: 2, Quantity: 2, ItemPrice: 29.99 },
    { SalesDetailID: 3, SaleID: 2, ProductID: 3, Quantity: 5, ItemPrice: 19.99 },
    { SalesDetailID: 4, SaleID: 3, ProductID: 4, Quantity: 1, ItemPrice: 89.99 }
  ];

  const [salesDetails, setSalesDetails] = useState(mockSalesDetails);

  const fetchSalesDetails = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8500/api/";
      const URL = API_URL + "salesDetails";
      const response = await axios.get(URL);
      if (response.data && response.data.error) {
        console.error("API Error:", response.data.error);
        setSalesDetails(mockSalesDetails);
        return;
      }
      setSalesDetails(Array.isArray(response.data) && response.data.length > 0 ? response.data : mockSalesDetails);
    } catch (error) {
      console.error("Error fetching sales details:", error);
      setSalesDetails(mockSalesDetails);
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

