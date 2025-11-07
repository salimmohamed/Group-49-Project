const db = require("../database/config");
require("dotenv").config();

const getManufacturers = async (req, res) => {
  try {
    const query = "SELECT * FROM Manufacturers";
    const [rows] = await db.query(query);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching manufacturers:", error);
    res.status(500).json({ error: "Error fetching manufacturers" });
  }
};

const getManufacturerByID = async (req, res) => {
  try {
    const manufacturerID = req.params.id;
    const query = "SELECT * FROM Manufacturers WHERE ManufacturerID = ?";
    const [result] = await db.query(query, [manufacturerID]);
    if (result.length === 0) {
      return res.status(404).json({ error: "Manufacturer not found" });
    }
    res.json(result[0]);
  } catch (error) {
    console.error("Error fetching manufacturer:", error);
    res.status(500).json({ error: "Error fetching manufacturer" });
  }
};

const createManufacturer = async (req, res) => {
  try {
    const { Name, ContactEmail, PhoneNumber, Address } = req.body;
    const query =
      "INSERT INTO Manufacturers (Name, ContactEmail, PhoneNumber, Address) VALUES (?, ?, ?, ?)";

    const response = await db.query(query, [
      Name,
      ContactEmail || null,
      PhoneNumber || null,
      Address || null,
    ]);
    res.status(201).json(response);
  } catch (error) {
    console.error("Error creating manufacturer:", error);
    res.status(500).json({ error: "Error creating manufacturer" });
  }
};

const updateManufacturer = async (req, res) => {
  const manufacturerID = req.params.id;
  const { Name, ContactEmail, PhoneNumber, Address } = req.body;

  try {
    const query =
      "UPDATE Manufacturers SET Name=?, ContactEmail=?, PhoneNumber=?, Address=? WHERE ManufacturerID=?";

    await db.query(query, [
      Name,
      ContactEmail || null,
      PhoneNumber || null,
      Address || null,
      manufacturerID,
    ]);
    res.json({ message: "Manufacturer updated successfully." });
  } catch (error) {
    console.error("Error updating manufacturer:", error);
    res.status(500).json({ error: `Error updating manufacturer with id ${manufacturerID}` });
  }
};

const deleteManufacturer = async (req, res) => {
  const manufacturerID = req.params.id;

  try {
    const [isExisting] = await db.query(
      "SELECT 1 FROM Manufacturers WHERE ManufacturerID = ?",
      [manufacturerID]
    );

    if (isExisting.length === 0) {
      return res.status(404).send("Manufacturer not found");
    }

    await db.query("DELETE FROM Manufacturers WHERE ManufacturerID = ?", [manufacturerID]);
    res.status(204).json({ message: "Manufacturer deleted successfully" });
  } catch (error) {
    console.error("Error deleting manufacturer:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getManufacturers,
  getManufacturerByID,
  createManufacturer,
  updateManufacturer,
  deleteManufacturer,
};

