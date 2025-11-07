const express = require("express");
const router = express.Router();
const {
  getManufacturers,
  getManufacturerByID,
  createManufacturer,
  updateManufacturer,
  deleteManufacturer,
} = require("../controllers/manufacturersController");

router.get("/", getManufacturers);
router.get("/:id", getManufacturerByID);
router.post("/", createManufacturer);
router.put("/:id", updateManufacturer);
router.delete("/:id", deleteManufacturer);

module.exports = router;

