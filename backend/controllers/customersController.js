const db = require("../database/config");
require("dotenv").config();

const getCustomers = async (req, res) => {
  try {
    const query = "SELECT * FROM Customers";
    const [rows] = await db.query(query);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ error: "Error fetching customers" });
  }
};

const getCustomerByID = async (req, res) => {
  try {
    const customerID = req.params.id;
    const query = "SELECT * FROM Customers WHERE CustomerID = ?";
    const [result] = await db.query(query, [customerID]);
    if (result.length === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.json(result[0]);
  } catch (error) {
    console.error("Error fetching customer:", error);
    res.status(500).json({ error: "Error fetching customer" });
  }
};

const createCustomer = async (req, res) => {
  try {
    const { FirstName, LastName, Email, PhoneNumber, Address } = req.body;
    const query =
      "INSERT INTO Customers (FirstName, LastName, Email, PhoneNumber, Address) VALUES (?, ?, ?, ?, ?)";

    const response = await db.query(query, [
      FirstName,
      LastName,
      Email || null,
      PhoneNumber || null,
      Address || null,
    ]);
    res.status(201).json(response);
  } catch (error) {
    console.error("Error creating customer:", error);
    res.status(500).json({ error: "Error creating customer" });
  }
};

const updateCustomer = async (req, res) => {
  const customerID = req.params.id;
  const { FirstName, LastName, Email, PhoneNumber, Address } = req.body;

  try {
    const query =
      "UPDATE Customers SET FirstName=?, LastName=?, Email=?, PhoneNumber=?, Address=? WHERE CustomerID=?";

    await db.query(query, [
      FirstName,
      LastName,
      Email || null,
      PhoneNumber || null,
      Address || null,
      customerID,
    ]);
    res.json({ message: "Customer updated successfully." });
  } catch (error) {
    console.error("Error updating customer:", error);
    res.status(500).json({ error: `Error updating customer with id ${customerID}` });
  }
};

const deleteCustomer = async (req, res) => {
  const customerID = req.params.id;

  try {
    const [isExisting] = await db.query(
      "SELECT 1 FROM Customers WHERE CustomerID = ?",
      [customerID]
    );

    if (isExisting.length === 0) {
      return res.status(404).send("Customer not found");
    }

    await db.query("DELETE FROM Customers WHERE CustomerID = ?", [customerID]);
    res.status(204).json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.error("Error deleting customer:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getCustomers,
  getCustomerByID,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};

