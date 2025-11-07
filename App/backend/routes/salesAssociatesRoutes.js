const express = require("express");
const router = express.Router();
const {
  getSalesAssociates,
  getSalesAssociateByID,
  createSalesAssociate,
  updateSalesAssociate,
  deleteSalesAssociate,
} = require("../controllers/salesAssociatesController");

router.get("/", getSalesAssociates);
router.get("/:id", getSalesAssociateByID);
router.post("/", createSalesAssociate);
router.put("/:id", updateSalesAssociate);
router.delete("/:id", deleteSalesAssociate);

module.exports = router;

