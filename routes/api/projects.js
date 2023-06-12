const express = require('express');
const router = express.Router();
const projectController = require('../../controllers/api/projects');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// POST /api/projects
router.post('/', ensureLoggedIn, projectController.create);

// GET /api/projects/:id
router.get('/:id', ensureLoggedIn, projectController.detail);

// PUT /api/projects/:id
router.put('/:id', ensureLoggedIn, projectController.update);

// DELETE /api/projects/:id
router.delete('/:id', ensureLoggedIn, projectController.delete);

// GET /api/projects/user
router.get('/', ensureLoggedIn, projectController.index);

module.exports = router;
