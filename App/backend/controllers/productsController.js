const db = require("../database/config");
require("dotenv").config();

const getProducts = async (req, res) => {
  try {
    const query = "SELECT * FROM Products";
    const [rows] = await db.query(query);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Error fetching products" });
  }
};

const getProductByID = async (req, res) => {
  try {
    const productID = req.params.id;
    const query = "SELECT * FROM Products WHERE ProductID = ?";
    const [result] = await db.query(query, [productID]);
    if (result.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(result[0]);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Error fetching product" });
  }
};

const createProduct = async (req, res) => {
  try {
    const { Name, Description, Price, Stock, ManufacturerID } = req.body;
    const query =
      "INSERT INTO Products (Name, Description, Price, Stock, ManufacturerID) VALUES (?, ?, ?, ?, ?)";

    const response = await db.query(query, [
      Name,
      Description || null,
      Price,
      Stock || 0,
      ManufacturerID === "" ? null : parseInt(ManufacturerID),
    ]);
    res.status(201).json(response);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Error creating product" });
  }
};

const updateProduct = async (req, res) => {
  const productID = req.params.id;
  const { Name, Description, Price, Stock, ManufacturerID } = req.body;

  try {
    const query =
      "UPDATE Products SET Name=?, Description=?, Price=?, Stock=?, ManufacturerID=? WHERE ProductID=?";

    await db.query(query, [
      Name,
      Description || null,
      Price,
      Stock || 0,
      ManufacturerID === "" ? null : parseInt(ManufacturerID),
      productID,
    ]);
    res.json({ message: "Product updated successfully." });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: `Error updating product with id ${productID}` });
  }
};

const deleteProduct = async (req, res) => {
  const productID = req.params.id;

  try {
    const [isExisting] = await db.query(
      "SELECT 1 FROM Products WHERE ProductID = ?",
      [productID]
    );

    if (isExisting.length === 0) {
      return res.status(404).send("Product not found");
    }

    await db.query("DELETE FROM Products WHERE ProductID = ?", [productID]);
    res.status(204).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getProducts,
  getProductByID,
  createProduct,
  updateProduct,
  deleteProduct,
};

