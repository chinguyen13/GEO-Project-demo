
const projects = require("../controllers/project.controller.js");

const router = require("express").Router();

// Create new
router.post("/api/add", projects.create);

// Get All
router.get("/api", projects.findAll);

// Get by type and name
router.get("/api/search/name=:name/type=:type", projects.findByNameAndType)

// Get by name
router.get("/api/search/name=:name", projects.findByName)

// Get by type
router.get("/api/search/type=:type", projects.findByType)

// Update
router.put("/api/project/:code", projects.update);

// Delete
router.delete("/api/:code", projects.delete)

module.exports = router;
