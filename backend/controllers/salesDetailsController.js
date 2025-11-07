const db = require("../database/config");
require("dotenv").config();

const getSalesDetails = async (req, res) => {
  try {
    const query = "SELECT * FROM SalesDetails";
    const [rows] = await db.query(query);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching sales details:", error);
    res.status(500).json({ error: "Error fetching sales details" });
  }
};

const getSalesDetailByID = async (req, res) => {
  try {
    const salesDetailID = req.params.id;
    const query = "SELECT * FROM SalesDetails WHERE SalesDetailID = ?";
    const [result] = await db.query(query, [salesDetailID]);
    if (result.length === 0) {
      return res.status(404).json({ error: "Sales detail not found" });
    }
    res.json(result[0]);
  } catch (error) {
    console.error("Error fetching sales detail:", error);
    res.status(500).json({ error: "Error fetching sales detail" });
  }
};

const createSalesDetail = async (req, res) => {
  try {
    const { SaleID, ProductID, Quantity, ItemPrice } = req.body;
    const query =
      "INSERT INTO SalesDetails (SaleID, ProductID, Quantity, ItemPrice) VALUES (?, ?, ?, ?)";

    const response = await db.query(query, [
      parseInt(SaleID),
      parseInt(ProductID),
      parseInt(Quantity),
      parseFloat(ItemPrice),
    ]);
    res.status(201).json(response);
  } catch (error) {
    console.error("Error creating sales detail:", error);
    res.status(500).json({ error: "Error creating sales detail" });
  }
};

const updateSalesDetail = async (req, res) => {
  const salesDetailID = req.params.id;
  const { SaleID, ProductID, Quantity, ItemPrice } = req.body;

  try {
    const query =
      "UPDATE SalesDetails SET SaleID=?, ProductID=?, Quantity=?, ItemPrice=? WHERE SalesDetailID=?";

    await db.query(query, [
      parseInt(SaleID),
      parseInt(ProductID),
      parseInt(Quantity),
      parseFloat(ItemPrice),
      salesDetailID,
    ]);
    res.json({ message: "Sales detail updated successfully." });
  } catch (error) {
    console.error("Error updating sales detail:", error);
    res.status(500).json({ error: `Error updating sales detail with id ${salesDetailID}` });
  }
};

const deleteSalesDetail = async (req, res) => {
  const salesDetailID = req.params.id;

  try {
    const [isExisting] = await db.query(
      "SELECT 1 FROM SalesDetails WHERE SalesDetailID = ?",
      [salesDetailID]
    );

    if (isExisting.length === 0) {
      return res.status(404).send("Sales detail not found");
    }

    await db.query("DELETE FROM SalesDetails WHERE SalesDetailID = ?", [salesDetailID]);
    res.status(204).json({ message: "Sales detail deleted successfully" });
  } catch (error) {
    console.error("Error deleting sales detail:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getSalesDetails,
  getSalesDetailByID,
  createSalesDetail,
  updateSalesDetail,
  deleteSalesDetail,
};

