import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DataTable } from "@/components/DataTable";

const SalesDetailsTable = () => {
  // Mock data for Step 3 Draft demonstration
  const mockSalesDetails = [
    { SalesDetailID: 1, SaleID: 1, ProductID: 1, Quantity: 1, ItemPrice: 1299.99 },
    { SalesDetailID: 2, SaleID: 1, ProductID: 2, Quantity: 2, ItemPrice: 29.99 },
    { SalesDetailID: 3, SaleID: 2, ProductID: 3, Quantity: 5, ItemPrice: 19.99 },
    { SalesDetailID: 4, SaleID: 3, ProductID: 4, Quantity: 1, ItemPrice: 89.99 }
  ];

  const navigate = useNavigate();
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
      setSalesDetails(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching sales details:", error);
      setSalesDetails(mockSalesDetails);
    }
  };

  useEffect(() => {
    fetchSalesDetails();
  }, []);

  const handleEdit = (detail) => {
    navigate("/salesDetails/edit/" + detail.SalesDetailID, { state: { detail } });
  };

  const handleDelete = async (detail) => {
    if (!window.confirm(`Are you sure you want to delete Sales Detail #${detail.SalesDetailID}?`)) {
      return;
    }

    try {
      const URL = import.meta.env.VITE_API_URL + "salesDetails/" + detail.SalesDetailID;
      const response = await axios.delete(URL);
      if (response.status === 204) {
        alert("Sales detail deleted successfully");
      }
    } catch (err) {
      alert(err.response?.data?.error || "Error deleting sales detail");
      console.log(err);
    }
    fetchSalesDetails();
  };

  const columns = [
    { key: 'SalesDetailID', label: 'ID' },
    { key: 'SaleID', label: 'Sale ID' },
    { key: 'ProductID', label: 'Product ID' },
    { key: 'Quantity', label: 'Quantity' },
    {
      key: 'ItemPrice',
      label: 'Item Price',
      render: (value) => `$${parseFloat(value).toFixed(2)}`
    },
  ];

  return <DataTable columns={columns} data={salesDetails} onEdit={handleEdit} onDelete={handleDelete} />;
};

export default SalesDetailsTable;

