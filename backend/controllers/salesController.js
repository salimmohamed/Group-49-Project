const db = require("../database/config");
require("dotenv").config();

const getSales = async (req, res) => {
  try {
    const query = "SELECT * FROM Sales";
    const [rows] = await db.query(query);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching sales:", error);
    res.status(500).json({ error: "Error fetching sales" });
  }
};

const getSaleByID = async (req, res) => {
  try {
    const saleID = req.params.id;
    const query = "SELECT * FROM Sales WHERE SaleID = ?";
    const [result] = await db.query(query, [saleID]);
    if (result.length === 0) {
      return res.status(404).json({ error: "Sale not found" });
    }
    res.json(result[0]);
  } catch (error) {
    console.error("Error fetching sale:", error);
    res.status(500).json({ error: "Error fetching sale" });
  }
};

const createSale = async (req, res) => {
  try {
    const { CustomerID, AssociateID, OrderDate, Status } = req.body;
    const query = "CALL sp_create_sale(?, ?, ?, ?)";
    const response = await db.query(query, [
      parseInt(CustomerID),
      parseInt(AssociateID),
      OrderDate,
      Status || 'Pending',
    ]);
    res.status(201).json(response);
  } catch (error) {
    console.error("Error creating sale:", error);
    res.status(500).json({ error: "Error creating sale" });
  }
};

const updateSale = async (req, res) => {
  const saleID = req.params.id;
  const { CustomerID, AssociateID, OrderDate, Status } = req.body;
  try {
    const query = "CALL sp_update_sale(?, ?, ?, ?, ?)";
    await db.query(query, [
      saleID,
      parseInt(CustomerID),
      parseInt(AssociateID),
      OrderDate,
      Status || 'Pending',
    ]);
    res.json({ message: "Sale updated successfully." });
  } catch (error) {
    console.error("Error updating sale:", error);
    res.status(500).json({ error: `Error updating sale with id ${saleID}` });
  }
};

const deleteSale = async (req, res) => {
  const saleID = req.params.id;
  try {
    const [isExisting] = await db.query(
      "SELECT 1 FROM Sales WHERE SaleID = ?",
      [saleID]
    );
    if (isExisting.length === 0) {
      return res.status(404).send("Sale not found");
    }
    await db.query("CALL sp_delete_sale(?)", [saleID]);
    res.status(204).json({ message: "Sale deleted successfully" });
  } catch (error) {
    console.error("Error deleting sale:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getSales,
  getSaleByID,
  createSale,
  updateSale,
  deleteSale,
};

