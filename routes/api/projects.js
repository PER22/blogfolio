const express = require('express');
const router = express.Router();
const projectController = require('../../controllers/api/projects');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// POST /api/projects
router.post('/', ensureLoggedIn, projectController.create);

// GET /api/projects/:id
router.get('/:id', ensureLoggedIn, projectController.detail);

// GET /api/projects/user
router.get('/', ensureLoggedIn, projectController.index);

module.exports = router;