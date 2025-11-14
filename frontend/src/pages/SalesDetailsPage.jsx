import { Routes, Route, Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateSalesDetail from "../components/salesDetails/CreateSalesDetail";
import SalesDetailsTable from "../components/salesDetails/SalesDetailsTable";
import UpdateSalesDetail from "../components/salesDetails/UpdateSalesDetail";

function SalesDetailsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sales Details</h1>
          <p className="text-muted-foreground mt-1">
            Manage individual items within sales orders
          </p>
        </div>
        <Link to="/salesDetails/add">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Sales Detail
          </Button>
        </Link>
      </div>
      <Routes>
        <Route path="/" element={<SalesDetailsTable />} />
        <Route path="/add" element={<CreateSalesDetail />} />
        <Route path="/edit/:id" element={<UpdateSalesDetail />} />
      </Routes>
    </div>
  );
}

export default SalesDetailsPage;

