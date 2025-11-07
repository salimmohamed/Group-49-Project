import { Routes, Route, Link } from "react-router-dom";
import CreateManufacturer from "../components/manufacturers/CreateManufacturer";
import ManufacturersTable from "../components/manufacturers/ManufacturersTable";
import UpdateManufacturer from "../components/manufacturers/UpdateManufacturer";

function ManufacturersPage() {
  return (
    <div>
      <h1>Manufacturers</h1>
      <nav>
        <ul>
          <li>
            <Link to="/manufacturers">View All</Link>
          </li>
          <li>
            <Link to="/manufacturers/add">Add Manufacturer</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<ManufacturersTable />} />
        <Route path="/add" element={<CreateManufacturer />} />
        <Route path="/edit/:id" element={<UpdateManufacturer />} />
      </Routes>
    </div>
  );
}

export default ManufacturersPage;

