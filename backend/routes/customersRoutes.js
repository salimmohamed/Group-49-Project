const express = require("express");
const router = express.Router();
const {
  getCustomers,
  getCustomerByID,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customersController");

router.get("/", getCustomers);
router.get("/:id", getCustomerByID);
router.post("/", createCustomer);
router.put("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);

module.exports = router;

