import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function CreateSalesAssociate() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    PhoneNumber: "",
    Type: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newAssociate = {
      FirstName: formData.FirstName,
      LastName: formData.LastName,
      Email: formData.Email,
      PhoneNumber: formData.PhoneNumber,
      Type: formData.Type,
    };

    try {
      const URL = import.meta.env.VITE_API_URL + "salesAssociates";
      const response = await axios.post(URL, newAssociate);
      if (response.status === 201) {
        navigate("/salesAssociates");
      } else {
        alert("Error creating sales associate");
      }
    } catch (error) {
      alert("Error creating sales associate");
      console.error("Error creating sales associate:", error);
    }
    resetFormFields();
  };

  const resetFormFields = () => {
    setFormData({
      FirstName: "",
      LastName: "",
      Email: "",
      PhoneNumber: "",
      Type: "",
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
    navigate("/salesAssociates");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Add Sales Associate</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-card p-6 rounded-lg border border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="FirstName">
              First Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="FirstName"
              name="FirstName"
              type="text"
              required
              value={formData.FirstName}
              onChange={handleInputChange}
              placeholder="Enter first name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="LastName">
              Last Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="LastName"
              name="LastName"
              type="text"
              required
              value={formData.LastName}
              onChange={handleInputChange}
              placeholder="Enter last name"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="Email">Email</Label>
          <Input
            id="Email"
            name="Email"
            type="email"
            value={formData.Email}
            onChange={handleInputChange}
            placeholder="email@example.com"
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
            <Label htmlFor="Type">Type</Label>
            <Input
              id="Type"
              name="Type"
              type="text"
              value={formData.Type}
              onChange={handleInputChange}
              placeholder="Full-time, Part-time, etc."
            />
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit">Add Sales Associate</Button>
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateSalesAssociate;

