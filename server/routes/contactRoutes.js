const express = require("express");
const {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
  deleteAllContacts,
} = require("../controllers/contactController");
const { protect } = require("../middleware/auth");

const router = express.Router();

// Routes - All protected with authentication
router
  .route("/")
  .get(protect, getContacts)
  .post(protect, createContact)
  .delete(protect, deleteAllContacts);

router
  .route("/:id")
  .get(protect, getContactById)
  .put(protect, updateContact)
  .delete(protect, deleteContact);

module.exports = router;
