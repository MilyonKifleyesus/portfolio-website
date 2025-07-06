const express = require("express");
const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  deleteAllProjects,
} = require("../controllers/projectController");

const router = express.Router();

// Routes
router
  .route("/")
  .get(getProjects)
  .post(createProject)
  .delete(deleteAllProjects);

router
  .route("/:id")
  .get(getProjectById)
  .put(updateProject)
  .delete(deleteProject);

export default router;
