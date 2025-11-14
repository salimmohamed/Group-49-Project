import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function CreateManufacturer() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Name: "",
    ContactEmail: "",
    PhoneNumber: "",
    Address: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newManufacturer = {
      Name: formData.Name,
      ContactEmail: formData.ContactEmail,
      PhoneNumber: formData.PhoneNumber,
      Address: formData.Address,
    };

    try {
      const URL = import.meta.env.VITE_API_URL + "manufacturers";
      const response = await axios.post(URL, newManufacturer);
      if (response.status === 201) {
        navigate("/manufacturers");
      } else {
        alert("Error creating manufacturer");
      }
    } catch (error) {
      alert("Error creating manufacturer");
      console.error("Error creating manufacturer:", error);
    }
    resetFormFields();
  };

  const resetFormFields = () => {
    setFormData({
      Name: "",
      ContactEmail: "",
      PhoneNumber: "",
      Address: "",
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
    navigate("/manufacturers");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Add Manufacturer</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-card p-6 rounded-lg border border-border">
        <div className="space-y-2">
          <Label htmlFor="Name">
            Manufacturer Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="Name"
            name="Name"
            type="text"
            required
            value={formData.Name}
            onChange={handleInputChange}
            placeholder="Enter manufacturer name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ContactEmail">Contact Email</Label>
          <Input
            id="ContactEmail"
            name="ContactEmail"
            type="email"
            value={formData.ContactEmail}
            onChange={handleInputChange}
            placeholder="contact@example.com"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="PhoneNumber">Phone Number</Label>
            <Input
              id="PhoneNumber"
              name="PhoneNumber"
              type="text"
              value={formData.PhoneNumber}
              onChange={handleInputChange}
              placeholder="555-0000"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="Address">Address</Label>
            <Input
              id="Address"
              name="Address"
              type="text"
              value={formData.Address}
              onChange={handleInputChange}
              placeholder="123 Main St, City, State"
            />
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit">Add Manufacturer</Button>
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateManufacturer;

