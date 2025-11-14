import { Routes, Route, Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateSalesAssociate from "../components/salesAssociates/CreateSalesAssociate";
import SalesAssociatesTable from "../components/salesAssociates/SalesAssociatesTable";
import UpdateSalesAssociate from "../components/salesAssociates/UpdateSalesAssociate";

function SalesAssociatesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sales Associates</h1>
          <p className="text-muted-foreground mt-1">
            Manage sales team members and associates
          </p>
        </div>
        <Link to="/salesAssociates/add">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Sales Associate
          </Button>
        </Link>
      </div>
      <Routes>
        <Route path="/" element={<SalesAssociatesTable />} />
        <Route path="/add" element={<CreateSalesAssociate />} />
        <Route path="/edit/:id" element={<UpdateSalesAssociate />} />
      </Routes>
    </div>
  );
}

export default SalesAssociatesPage;

