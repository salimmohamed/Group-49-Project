const express = require("express");
const router = express.Router();
const {
  getSales,
  getSaleByID,
  createSale,
  updateSale,
  deleteSale,
} = require("../controllers/salesController");

router.get("/", getSales);
router.get("/:id", getSaleByID);
router.post("/", createSale);
router.put("/:id", updateSale);
router.delete("/:id", deleteSale);

module.exports = router;

