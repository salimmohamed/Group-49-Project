import { useState, useEffect } from "react";
import axios from "axios";
import SaleTableRow from "./SaleTableRow";

const SalesTable = () => {
  // Mock data for Step 3 Draft demonstration
  const mockSales = [
    { SaleID: 1, CustomerID: 1, AssociateID: 1, OrderDate: '2024-01-15', Status: 'Completed' },
    { SaleID: 2, CustomerID: 2, AssociateID: 2, OrderDate: '2024-01-16', Status: 'Pending' },
    { SaleID: 3, CustomerID: 1, AssociateID: 1, OrderDate: '2024-01-17', Status: 'Completed' }
  ];

  const [sales, setSales] = useState(mockSales);

  const fetchSales = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8500/api/";
      const URL = API_URL + "sales";
      const response = await axios.get(URL);
      if (response.data && response.data.error) {
        console.error("API Error:", response.data.error);
        setSales(mockSales);
        return;
      }
      setSales(Array.isArray(response.data) && response.data.length > 0 ? response.data : mockSales);
    } catch (error) {
      console.error("Error fetching sales:", error);
      setSales(mockSales);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  return (
    <div>
      <h2>Sales Table</h2>
      {sales.length === 0 ? (
        <div>
          <p>No sales found.</p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer ID</th>
              <th>Associate ID</th>
              <th>Order Date</th>
              <th>Status</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <SaleTableRow key={sale.SaleID} sale={sale} fetchSales={fetchSales} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SalesTable;

