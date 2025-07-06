const express = require("express");
const {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
  deleteAllContacts,
} = require("../controllers/contactController");

const router = express.Router();

// Routes
router
  .route("/")
  .get(getContacts)
  .post(createContact)
  .delete(deleteAllContacts);

router
  .route("/:id")
  .get(getContactById)
  .put(updateContact)
  .delete(deleteContact);

export default router;
