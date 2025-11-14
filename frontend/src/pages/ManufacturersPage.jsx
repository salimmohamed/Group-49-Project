import { Routes, Route, Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateManufacturer from "../components/manufacturers/CreateManufacturer";
import ManufacturersTable from "../components/manufacturers/ManufacturersTable";
import UpdateManufacturer from "../components/manufacturers/UpdateManufacturer";

function ManufacturersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manufacturers</h1>
          <p className="text-muted-foreground mt-1">
            Manage product manufacturers and suppliers
          </p>
        </div>
        <Link to="/manufacturers/add">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Manufacturer
          </Button>
        </Link>
      </div>
      <Routes>
        <Route path="/" element={<ManufacturersTable />} />
        <Route path="/add" element={<CreateManufacturer />} />
        <Route path="/edit/:id" element={<UpdateManufacturer />} />
      </Routes>
    </div>
  );
}

export default ManufacturersPage;

