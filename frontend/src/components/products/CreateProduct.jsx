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

function CreateProduct() {
  const navigate = useNavigate();
  const [manufacturers, setManufacturers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    Name: "",
    Description: "",
    Price: "",
    Stock: "",
    ManufacturerID: "",
  });

  useEffect(() => {
    const fetchManufacturers = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8500/api/";
        const URL = API_URL + "manufacturers";
        const response = await axios.get(URL);
        setManufacturers(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching manufacturers:", error);
        setManufacturers([]);
      }
      setLoading(false);
    };
    fetchManufacturers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = {
      Name: formData.Name,
      Description: formData.Description,
      Price: formData.Price,
      Stock: formData.Stock,
      ManufacturerID: formData.ManufacturerID,
    };

    try {
      const URL = import.meta.env.VITE_API_URL + "products";
      const response = await axios.post(URL, newProduct);
      if (response.status === 201) {
        navigate("/products");
      } else {
        alert("Error creating product");
      }
    } catch (error) {
      alert("Error creating product");
      console.error("Error creating product:", error);
    }
    resetFormFields();
  };

  const resetFormFields = () => {
    setFormData({
      Name: "",
      Description: "",
      Price: "",
      Stock: "",
      ManufacturerID: "",
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
    navigate("/products");
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Add New Product</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-card p-6 rounded-lg border border-border">
        <div className="space-y-2">
          <Label htmlFor="Name">
            Product Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="Name"
            name="Name"
            type="text"
            required
            value={formData.Name}
            onChange={handleInputChange}
            placeholder="Enter product name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="Description">Description</Label>
          <Input
            id="Description"
            name="Description"
            type="text"
            value={formData.Description}
            onChange={handleInputChange}
            placeholder="Enter product description"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="Price">
              Price <span className="text-destructive">*</span>
            </Label>
            <Input
              id="Price"
              name="Price"
              type="number"
              step="0.01"
              required
              value={formData.Price}
              onChange={handleInputChange}
              placeholder="0.00"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="Stock">Stock Quantity</Label>
            <Input
              id="Stock"
              name="Stock"
              type="number"
              value={formData.Stock}
              onChange={handleInputChange}
              placeholder="0"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="ManufacturerID">Manufacturer</Label>
          <Select
            value={formData.ManufacturerID}
            onValueChange={(value) => setFormData({ ...formData, ManufacturerID: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select manufacturer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="null">None</SelectItem>
              {manufacturers.map((manufacturer) => (
                <SelectItem key={manufacturer.ManufacturerID} value={manufacturer.ManufacturerID.toString()}>
                  {manufacturer.Name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit">Add Product</Button>
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateProduct;
