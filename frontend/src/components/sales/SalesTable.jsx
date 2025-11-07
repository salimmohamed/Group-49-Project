import { useState, useEffect } from "react";
import axios from "axios";
import SaleTableRow from "./SaleTableRow";

const SalesTable = () => {
  const [sales, setSales] = useState([]);

  const fetchSales = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8500/api/";
      const URL = API_URL + "sales";
      const response = await axios.get(URL);
      if (response.data && response.data.error) {
        console.error("API Error:", response.data.error);
        setSales([]);
        return;
      }
      setSales(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching sales:", error);
      setSales([]);
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

