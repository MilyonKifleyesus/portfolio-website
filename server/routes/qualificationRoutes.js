const express = require("express");
const {
  getQualifications,
  getQualificationById,
  createQualification,
  updateQualification,
  deleteQualification,
  deleteAllQualifications,
} = require("../controllers/qualificationController");

const router = express.Router();

// Routes for /api/qualifications
router
  .route("/")
  .get(getQualifications) // GET /api/qualifications - get all qualifications
  .post(createQualification) // POST /api/qualifications - add new qualification
  .delete(deleteAllQualifications); // DELETE /api/qualifications - remove all qualifications

// Routes for /api/qualifications/:id
router
  .route("/:id")
  .get(getQualificationById) // GET /api/qualifications/:id - get qualification by id
  .put(updateQualification) // PUT /api/qualifications/:id - update qualification by id
  .delete(deleteQualification); // DELETE /api/qualifications/:id - remove qualification by id

export default router;
