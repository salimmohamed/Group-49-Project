import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DataTable } from "@/components/DataTable";

const SalesTable = () => {
  // Mock data for Step 3 Draft demonstration
  const mockSales = [
    { SaleID: 1, CustomerID: 1, AssociateID: 1, OrderDate: '2024-01-15', Status: 'Completed' },
    { SaleID: 2, CustomerID: 2, AssociateID: 2, OrderDate: '2024-01-16', Status: 'Pending' },
    { SaleID: 3, CustomerID: 1, AssociateID: 1, OrderDate: '2024-01-17', Status: 'Completed' }
  ];

  const navigate = useNavigate();
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
      setSales(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching sales:", error);
      setSales(mockSales);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  const handleEdit = (sale) => {
    navigate("/sales/edit/" + sale.SaleID, { state: { sale } });
  };

  const handleDelete = async (sale) => {
    if (!window.confirm(`Are you sure you want to delete Sale #${sale.SaleID}?`)) {
      return;
    }

    try {
      const URL = import.meta.env.VITE_API_URL + "sales/" + sale.SaleID;
      const response = await axios.delete(URL);
      if (response.status === 204) {
        alert("Sale deleted successfully");
      }
    } catch (err) {
      alert(err.response?.data?.error || "Error deleting sale");
      console.log(err);
    }
    fetchSales();
  };

  const columns = [
    { key: 'SaleID', label: 'ID' },
    { key: 'CustomerID', label: 'Customer ID' },
    { key: 'AssociateID', label: 'Associate ID' },
    {
      key: 'OrderDate',
      label: 'Order Date',
      render: (value) => value ? new Date(value).toLocaleDateString() : ''
    },
    { key: 'Status', label: 'Status' },
  ];

  return <DataTable columns={columns} data={sales} onEdit={handleEdit} onDelete={handleDelete} />;
};

export default SalesTable;
