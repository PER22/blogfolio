const express = require('express');
const router = express.Router();
const projectController = require('../../controllers/api/projects');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// POST /api/projects
router.post('/', ensureLoggedIn, projectController.create);

// GET /api/projects/:projectId
router.get('/:projectId', ensureLoggedIn, projectController.detail);

// PUT /api/projects/:projectId
router.put('/:projectId', ensureLoggedIn, projectController.update);

// DELETE /api/projects/:projectId
router.delete('/:projectId', ensureLoggedIn, projectController.delete);

// GET /api/projects/
router.get('/', ensureLoggedIn, projectController.index);

module.exports = router;
