import { Routes, Route, Link } from "react-router-dom";
import CreateSalesAssociate from "../components/salesAssociates/CreateSalesAssociate";
import SalesAssociatesTable from "../components/salesAssociates/SalesAssociatesTable";
import UpdateSalesAssociate from "../components/salesAssociates/UpdateSalesAssociate";

function SalesAssociatesPage() {
  return (
    <div>
      <h1>Sales Associates</h1>
      <nav>
        <ul>
          <li>
            <Link to="/salesAssociates">View All</Link>
          </li>
          <li>
            <Link to="/salesAssociates/add">Add Sales Associate</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<SalesAssociatesTable />} />
        <Route path="/add" element={<CreateSalesAssociate />} />
        <Route path="/edit/:id" element={<UpdateSalesAssociate />} />
      </Routes>
    </div>
  );
}

export default SalesAssociatesPage;

