const express = require("express");
const router = express.Router();
const {
  getSalesDetails,
  getSalesDetailByID,
  createSalesDetail,
  updateSalesDetail,
  deleteSalesDetail,
} = require("../controllers/salesDetailsController");

router.get("/", getSalesDetails);
router.get("/:id", getSalesDetailByID);
router.post("/", createSalesDetail);
router.put("/:id", updateSalesDetail);
router.delete("/:id", deleteSalesDetail);

module.exports = router;

