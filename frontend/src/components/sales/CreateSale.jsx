import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function CreateSale() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [salesAssociates, setSalesAssociates] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    CustomerID: "",
    AssociateID: "",
    OrderDate: "",
    Status: "Pending",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8500/api/";
        const customersURL = API_URL + "customers";
        const associatesURL = API_URL + "salesAssociates";
        const [customersRes, associatesRes] = await Promise.all([
          axios.get(customersURL),
          axios.get(associatesURL),
        ]);
        setCustomers(Array.isArray(customersRes.data) ? customersRes.data : []);
        setSalesAssociates(Array.isArray(associatesRes.data) ? associatesRes.data : []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setCustomers([]);
        setSalesAssociates([]);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newSale = {
      CustomerID: formData.CustomerID,
      AssociateID: formData.AssociateID,
      OrderDate: formData.OrderDate,
      Status: formData.Status,
    };

    try {
      const URL = import.meta.env.VITE_API_URL + "sales";
      const response = await axios.post(URL, newSale);
      if (response.status === 201) {
        navigate("/sales");
      } else {
        alert("Error creating sale");
      }
    } catch (error) {
      alert("Error creating sale");
      console.error("Error creating sale:", error);
    }
    resetFormFields();
  };

  const resetFormFields = () => {
    setFormData({
      CustomerID: "",
      AssociateID: "",
      OrderDate: "",
      Status: "Pending",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    navigate("/sales");
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Add New Sale</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-card p-6 rounded-lg border border-border">
        <div className="space-y-2">
          <Label htmlFor="CustomerID">
            Customer <span className="text-destructive">*</span>
          </Label>
          <Select
            required
            value={formData.CustomerID}
            onValueChange={(value) => setFormData({ ...formData, CustomerID: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select customer" />
            </SelectTrigger>
            <SelectContent>
              {customers.map((customer) => (
                <SelectItem key={customer.CustomerID} value={customer.CustomerID.toString()}>
                  {customer.FirstName} {customer.LastName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="AssociateID">
            Sales Associate <span className="text-destructive">*</span>
          </Label>
          <Select
            required
            value={formData.AssociateID}
            onValueChange={(value) => setFormData({ ...formData, AssociateID: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select sales associate" />
            </SelectTrigger>
            <SelectContent>
              {salesAssociates.map((associate) => (
                <SelectItem key={associate.AssociateID} value={associate.AssociateID.toString()}>
                  {associate.FirstName} {associate.LastName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="OrderDate">
            Order Date <span className="text-destructive">*</span>
          </Label>
          <Input
            id="OrderDate"
            name="OrderDate"
            type="date"
            required
            value={formData.OrderDate}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="Status">Status</Label>
          <Input
            id="Status"
            name="Status"
            type="text"
            value={formData.Status}
            onChange={handleInputChange}
            placeholder="Pending"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit">Add Sale</Button>
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateSale;
