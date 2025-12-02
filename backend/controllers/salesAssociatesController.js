const db = require("../database/config");
require("dotenv").config();

const getSalesAssociates = async (req, res) => {
  try {
    const query = "SELECT * FROM SalesAssociates";
    const [rows] = await db.query(query);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching sales associates:", error);
    res.status(500).json({ error: "Error fetching sales associates" });
  }
};

const getSalesAssociateByID = async (req, res) => {
  try {
    const associateID = req.params.id;
    const query = "SELECT * FROM SalesAssociates WHERE AssociateID = ?";
    const [result] = await db.query(query, [associateID]);
    if (result.length === 0) {
      return res.status(404).json({ error: "Sales associate not found" });
    }
    res.json(result[0]);
  } catch (error) {
    console.error("Error fetching sales associate:", error);
    res.status(500).json({ error: "Error fetching sales associate" });
  }
};

const createSalesAssociate = async (req, res) => {
  try {
    const { FirstName, LastName, Email, PhoneNumber, Type } = req.body;
    const query = "CALL sp_create_sales_associate(?, ?, ?, ?, ?)";
    const response = await db.query(query, [
      FirstName,
      LastName,
      Email || null,
      PhoneNumber || null,
      Type || null,
    ]);
    res.status(201).json(response);
  } catch (error) {
    console.error("Error creating sales associate:", error);
    res.status(500).json({ error: "Error creating sales associate" });
  }
};

const updateSalesAssociate = async (req, res) => {
  const associateID = req.params.id;
  const { FirstName, LastName, Email, PhoneNumber, Type } = req.body;
  try {
    const query = "CALL sp_update_sales_associate(?, ?, ?, ?, ?, ?)";
    await db.query(query, [
      associateID,
      FirstName,
      LastName,
      Email || null,
      PhoneNumber || null,
      Type || null,
    ]);
    res.json({ message: "Sales associate updated successfully." });
  } catch (error) {
    console.error("Error updating sales associate:", error);
    res.status(500).json({ error: `Error updating sales associate with id ${associateID}` });
  }
};

const deleteSalesAssociate = async (req, res) => {
  const associateID = req.params.id;
  try {
    const [isExisting] = await db.query(
      "SELECT 1 FROM SalesAssociates WHERE AssociateID = ?",
      [associateID]
    );
    if (isExisting.length === 0) {
      return res.status(404).send("Sales associate not found");
    }
    await db.query("CALL sp_delete_sales_associate(?)", [associateID]);
    res.status(204).json({ message: "Sales associate deleted successfully" });
  } catch (error) {
    console.error("Error deleting sales associate:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getSalesAssociates,
  getSalesAssociateByID,
  createSalesAssociate,
  updateSalesAssociate,
  deleteSalesAssociate,
};

