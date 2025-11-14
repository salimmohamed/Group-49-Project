import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const UpdateSalesAssociate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const prevAssociate = location.state?.associate || {};

  const [formData, setFormData] = useState({
    FirstName: prevAssociate.FirstName || "",
    LastName: prevAssociate.LastName || "",
    Email: prevAssociate.Email || "",
    PhoneNumber: prevAssociate.PhoneNumber || "",
    Type: prevAssociate.Type || "",
  });

  useEffect(() => {
    // Redirect if no associate state was passed
    if (!location.state || !location.state.associate) {
      navigate("/salesAssociates");
      return;
    }
  }, [location.state, navigate]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const URL = import.meta.env.VITE_API_URL + "salesAssociates/" + id;
      const response = await axios.put(URL, formData);
      if (response.status !== 200) {
        alert("Error updating sales associate");
      } else {
        alert(response.data.message);
        navigate("/salesAssociates");
      }
    } catch (err) {
      console.log("Error updating sales associate:", err);
      alert("Error updating sales associate");
    }
  };

  const handleCancel = () => {
    navigate("/salesAssociates");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Update Sales Associate</h1>

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
          <Button type="submit">Update</Button>
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateSalesAssociate;

